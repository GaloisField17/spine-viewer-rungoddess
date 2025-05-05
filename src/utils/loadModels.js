export const loadModels = async () => {
  try {
    const response = await fetch("/modelsList.json");

    if (!response.ok) {
      throw new Error("Failed to load file.");
    }

    const data = JSON.parse(response);

    return data; 
  } catch (error) {
    console.error(error);
    return ["err"]; 
  }
};