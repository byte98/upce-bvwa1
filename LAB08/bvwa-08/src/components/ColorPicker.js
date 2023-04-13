import React, { useState } from 'react';

const colors = ['red', 'green', 'blue', 'yellow'];

function ColorPicker() {
    const [color, setColor] = useState('red');
    
    return (
      <div>
        {colors.map((c) => (
          <div
            key={c}
            style={{
              backgroundColor: c,
              width: '50px',
              height: '50px',
              display: 'inline-block',
              marginRight: '10px',
              cursor: 'pointer'
            }}
            onClick={() => setColor(c)}
          />
        ))}
        <p>Selected color: {color}</p>
        <div style={{
            backgroundColor: color,
            width: "100%",
            height: "100%"
        }}>
            &nbsp;
        </div>
      </div>
    );
  }

  export default ColorPicker;
