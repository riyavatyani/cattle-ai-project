from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
import numpy as np
import json

app = FastAPI()

# Allow mobile requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading TFLite models...")

# Load models
breed_model = tf.lite.Interpreter(model_path="cattle_breed_mobile_model.tflite")
breed_model.allocate_tensors()

disease_model = tf.lite.Interpreter(model_path="cattle_disease_mobile_model.tflite")
disease_model.allocate_tensors()

print("Models loaded successfully")

# Load labels
with open("breed_labels.json") as f:
    breed_labels = json.load(f)

with open("disease_labels.json") as f:
    disease_labels = json.load(f)

print("Breed labels:", len(breed_labels))
print("Disease labels:", len(disease_labels))


# Image preprocessing
def preprocess(image, interpreter):

    image = image.resize((224, 224))
    image = np.array(image)

    input_details = interpreter.get_input_details()

    if input_details[0]['dtype'] == np.float32:
        image = image.astype(np.float32) / 255.0
    else:
        image = image.astype(np.uint8)

    image = np.expand_dims(image, axis=0)

    return image


# Prediction helper
def predict(interpreter, image, labels):

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], image)

    interpreter.invoke()

    output = interpreter.get_tensor(output_details[0]['index'])[0]

    index = int(np.argmax(output))
    confidence = float(output[index])

    print("Prediction:", labels[index], confidence)

    return index, confidence


@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):

    try:

        print("\nImage received for prediction")

        image = Image.open(file.file).convert("RGB")

        # Breed prediction
        breed_input = preprocess(image, breed_model)
        breed_idx, breed_conf = predict(breed_model, breed_input, breed_labels)

        # Disease prediction
        disease_input = preprocess(image, disease_model)
        disease_idx, disease_conf = predict(disease_model, disease_input, disease_labels)

        response = {
            "breed": breed_labels[breed_idx],
            "breed_confidence": round(breed_conf * 100, 2),
            "disease": disease_labels[disease_idx],
            "disease_confidence": round(disease_conf * 100, 2)
        }

        print("Returning:", response)

        return response

    except Exception as e:

        print("Prediction error:", str(e))

        return {
            "breed": "Unknown",
            "breed_confidence": 0,
            "disease": "Unknown",
            "disease_confidence": 0
        }