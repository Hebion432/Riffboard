import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Toolbar from "../Components/Toolbar/index.js";
import Board from "../Components/Boards/index.js";
import Toolbox from "../Components/Toolbox/index.js";
import BoardProvider from "../store/BoardProvider";
import ToolBoxProvider from "../store/ToolboxProvider";

function CanvasPage() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanvas = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");

      try {
        const res = await axios.get(`http://localhost:3339/canvas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCanvas(res.data);
      } catch (err) {
        console.error("Failed to load canvas", err);
        navigate("/");
      }
    };

    fetchCanvas();
  }, [id, navigate]);

  if (!canvas) return <div className="p-8">Loading canvas...</div>;

  return (
    <div className="App">
      <BoardProvider>
        <ToolBoxProvider>
          <Toolbar />
          <Board />
          <Toolbox />
        </ToolBoxProvider>
      </BoardProvider>
    </div>
  );
}

export default CanvasPage;
