import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
      <div>
        <p>Count: {count}</p>
        <div className='btn-group' role='group'>
        <button type='button' className='btn btn-primary' onClick={() => setCount(count - 1)}>-</button>
        <button type='button' className='btn btn-primary' onClick={() => setCount(count + 1)}>+</button>
        </div>
      </div>
    );
  }

  export default Counter;
