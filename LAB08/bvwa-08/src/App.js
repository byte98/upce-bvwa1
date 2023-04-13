import ColorPicker from "./components/ColorPicker";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";


function App() {
  return (
    <main>
      <h1>React App</h1>
      <hr></hr>
      <div id="content">
    
    <section>
      <h2>Counter</h2>
      <Counter></Counter>
    </section>
    <section>
      <h2>Color Picker</h2>
      <ColorPicker></ColorPicker>
    </section>
    <section>
      <h2>ToDoList</h2>
      <TodoList></TodoList>
    </section>
    </div>
    </main>
  );
}

export default App;
