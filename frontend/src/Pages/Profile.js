import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [newCanvasName, setNewCanvasName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileAndCanvases = async () => {
      try {
        if (!token) return navigate("/");

        // Fetch user profile
        const profileRes = await axios.get(
          "http://localhost:3339/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(profileRes.data);

        // Fetch canvases
        await fetchCanvases();
      } catch (err) {
        navigate("/");
      }
    };

    fetchProfileAndCanvases();
  }, [navigate]);

  const fetchCanvases = async () => {
    try {
      const res = await axios.get("http://localhost:3339/canvas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCanvases(res.data);
    } catch (err) {
      console.error("Error fetching canvases", err);
    }
  };

  const handleCreateCanvas = async (e) => {
    e.preventDefault();
    if (!newCanvasName.trim()) return;

    try {
      await axios.post(
        "http://localhost:3339/canvas",
        { name: newCanvasName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewCanvasName("");
      fetchCanvases(); // Refresh list
    } catch (err) {
      console.error("Error creating canvas", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {user ? (
        <div>
          <h1 className="text-2xl font-semibold mb-4">Hello, {user.name}!</h1>

          {/* Create Canvas Form */}
          <form
            onSubmit={handleCreateCanvas}
            className="mb-6 flex gap-4 items-center"
          >
            <input
              type="text"
              placeholder="Enter canvas name"
              value={newCanvasName}
              onChange={(e) => setNewCanvasName(e.target.value)}
              className="p-2 rounded border border-gray-300 w-full max-w-xs"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create Canvas
            </button>
          </form>

          {/* Canvas List */}
          <h2 className="text-xl font-medium mb-2">Your Canvases</h2>
          {canvases.length === 0 ? (
            <p className="text-gray-600">No canvases found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {canvases.map((canvas) => (
                <div
                  key={canvas._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold">{canvas.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(canvas.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => navigate(`/canvas/${canvas._id}`)}
                    className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Open Canvas
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
