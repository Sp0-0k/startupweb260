import react from 'react'
import reactDOM from 'react-dom'
import './index.css'

function ColorPicker() {
  const [text, updateText] = React.useState('red');

  function onChange(e) {
    updateText(e.target.value);
  }
  return (
    <div>
      <h1>Survey</h1>
      <Result selectedColor={text} />

      <p>
        <span>Type some text: </span>
        <input type='text' onChange={onChange} defaultValue='red' />
      </p>
    </div>
  );
}

function Result({ selectedColor }) {
  return (
    <div>
      <p>
        Your color:
        <span style={{ color: selectedColor }}>{selectedColor}</span>
      </p>
    </div>
  );
}
 


createRoot(document.getElementById('root')).render(
  <body>
    <ColorPicker />
  </body>
)
