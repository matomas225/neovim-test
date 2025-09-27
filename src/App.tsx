import { Calculator } from "./components/Calculator"
import { MovingCubeGame } from "./components/MovingCubeGame"
import { ToDoList } from "./components/ToDoList"

function App() {

  return (
    <div className="mt-18">
      <h1 className="text-4xl font-bold text-blue-50 text-center">Project made using neovim first time :)</h1>
      <p className="text-center text-xl">Made by Matas. M (no AI just brain XD)</p>
      <div className="flex flex-col justify-center items-center mt-18">
        <h2 className="text-2xl font-bold">This is Calculator</h2>
        <p>Made for fun</p>
        <Calculator />
        <ToDoList />
        <div className="mb-10">
          <h2 className="font-bold text-2xl">This is simple game</h2>
          <p className="text-center">NOTE: had to use some AI :/</p>
        </div>
        <MovingCubeGame />
      </div>
    </div>
  )
}

export default App
