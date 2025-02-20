import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ColorPicker() {
  const [color, updateColor] = React.useState('#737AB0');
 
  function onChange(e) {
    updateColor(e.target.value);
  }
 
  return (
    <div>
      <h1>Pick a color</h1>
      <Result selectedColor={color} />
 
      <p>
        <span>Pick a color: </span>
        <input type='color' onChange={onChange} value={color} />
      </p>
    </div>
  );
 }
 
 function Result({ selectedColor }) {
  return (
    <div>
      <p>
        Your color: <span style={{ color: selectedColor }}>{selectedColor}</span>
      </p>
    </div>
  );
 }
 

function App() {
  const [count, setCount] = useState(0)

  return (
    <ColorPicker />
  )
}

export default App
