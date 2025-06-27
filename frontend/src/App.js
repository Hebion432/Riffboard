import Toolbar from "./Components/Toolbar";
import Toolbox from "./Components/Toolbox";
import Board from "./Components/Boards";
import BoardProvider from "./store/BoardProvider";
import ToolBoxProvider from "./store/ToolboxProvider";

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

export default App;
