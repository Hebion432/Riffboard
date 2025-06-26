import Toolbar from "./Components/Toolbar";
import Toolbox from "./Components/Toolbox";
import Board from "./Components/Boards";
import BoardProvider from "./store/BoardProvider";
import ToolBoxProvider from "./store/ToolboxProvider";
import { useEffect, useState } from "react";

function App() {
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

// function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3339")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data", error));
//   }, [data]);

//   return <div>{data ? <h1>WhiteBoard</h1> : <h1>Loading...</h1>}</div>;
// }

export default App;
