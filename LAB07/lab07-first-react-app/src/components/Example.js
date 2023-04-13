import './Example.css';
import { useState } from 'react';

const Example = () => {
    //let title = "Prvni title";

    const [title, setTitle] = useState("Prvni title");
    
    const buttonHandler = () => {
        setTitle("Jiny title");
    }

    return(
        <div>
            <h2>{title}</h2>
            <button onClick={buttonHandler}>Zmenit title</button>
        </div>
    );
} 
export default Example;
