import * as ImageManipulator from "expo-image-manipulator";

export async function resizeImage(uri) {

  const resized = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 224, height: 224 } }],
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  );

  return resized.uri;
}