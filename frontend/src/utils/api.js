import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3339";

const updateCanvas = async (canvasId, elements) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized canvas update");

    const response = await axios.put(
      `${API_BASE_URL}/canvas/${canvasId}`,
      { elements },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Canvas updated successfully!");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update canvas: ${error.message}`);
  }
};

export default updateCanvas;
