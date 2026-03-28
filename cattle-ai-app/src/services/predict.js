import breedLabels from "../assets/model/breed_labels.json";
import diseaseLabels from "../assets/model/disease_labels.json";

export function getPrediction(output, labels) {

  const max = Math.max(...output);
  const index = output.indexOf(max);

  return {
    label: labels[index],
    confidence: max
  };

}