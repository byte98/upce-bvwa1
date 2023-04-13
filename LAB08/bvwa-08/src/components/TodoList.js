import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');
    
    const handleAddItem = () => {
      if (text !== '') {
        setItems([...items, text]);
        setText('');
      }
    }
    
    const handleRemoveItem = (index) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
    
    return (
      <div className='todolist'>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button className='btn btn-primary' onClick={handleAddItem}>Add Item</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button className='btn btn-danger' onClick={() => handleRemoveItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default TodoList;
