import {Routes , Route } from "react-router-dom" 
import Home from "./components/Home/Home" 
import CreateCase  from "./components/CreateCase/CreateCase"
import './App.css'

function App(){ 
   return ( 
      <div className="App"> 
        <Routes> 
            <Route path="/" element={<Home/> } /> 
            <Route path="/createCase" element={<CreateCase/> } /> 
       </Routes> 
    </div> 
)} 
export default App 