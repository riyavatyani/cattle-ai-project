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


# 🔥 SAFE PREPROCESS (ResNet compatible + stable)
def preprocess(image, interpreter):

    input_details = interpreter.get_input_details()
    input_shape = input_details[0]['shape']

    height = input_shape[1]
    width = input_shape[2]

    image = image.resize((width, height))
    image = np.array(image).astype(np.float32)

    # ✅ FLOAT MODEL (most cases)
    if input_details[0]['dtype'] == np.float32:

        # 🔥 Manual ResNet preprocessing (NO keras import)
        image = image[..., ::-1]  # RGB → BGR
        image[..., 0] -= 103.939
        image[..., 1] -= 116.779
        image[..., 2] -= 123.68

        print("Using ResNet-style preprocessing")

    # ✅ QUANTIZED MODEL
    else:
        scale, zero_point = input_details[0]['quantization']

        if scale > 0:
            image = image / scale + zero_point

        image = image.astype(np.uint8)
        print("Using quantized preprocessing")

    image = np.expand_dims(image, axis=0)

    print("Shape:", image.shape)
    print("Range:", image.min(), image.max())

    return image


# 🔥 Prediction helper
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
        print("\n📸 Image received for prediction")

        image = Image.open(file.file).convert("RGB")

        # 🐄 Breed prediction
        breed_input = preprocess(image, breed_model)
        breed_idx, breed_conf = predict(breed_model, breed_input, breed_labels)

        # 🦠 Disease prediction
        disease_input = preprocess(image, disease_model)
        disease_idx, disease_conf = predict(disease_model, disease_input, disease_labels)

        response = {
            "breed": breed_labels[breed_idx],
            "breed_confidence": round(breed_conf * 100, 2),
            "disease": disease_labels[disease_idx],
            "disease_confidence": round(disease_conf * 100, 2)
        }

        print("✅ Returning:", response)

        return response

    except Exception as e:

        print("❌ Prediction error:", str(e))

        return {
            "breed": "Unknown",
            "breed_confidence": 0,
            "disease": "Unknown",
            "disease_confidence": 0
        }