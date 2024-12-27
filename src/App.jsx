import './App.css'
import MainArea from './Component/MainArea'
import { initializeWebSocket } from './Component/WebServer';



initializeWebSocket()

function App() {

  return (
    <>
    <MainArea></MainArea>
    </>
  )
}

export default App
