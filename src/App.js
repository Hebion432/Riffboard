import Toolbar from "./Components/Toolbar";
import Board from "./Components/Boards";
import BoardProvider from "./store/BoardProvider";

function App() {
  return (
    <div className="App">
      <BoardProvider>
        <Toolbar />
        <Board />
      </BoardProvider>
    </div>
  );
}

export default App;
