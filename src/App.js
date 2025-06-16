import Toolbar from "./Components/Toolbar";
import Board from "./Components/Boards/Boards";
import BoardProvider from "./store/BoardProvider";

function App() {
  return (
    <div className="App">
      <BoardProvider>
        <Toolbar />
        <Board />
      </BoardProvider>
      <h1>Hello Amit</h1>
    </div>
  );
}

export default App;
