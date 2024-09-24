import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(prevShowFinished => !prevShowFinished);
  };
  

  const handleEdit = (e, id) => {
    const item = todos.find((i) => i.id === id);
    setTodo(item.todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>QuikTasks : Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length < 2} className="bg-violet-700 disabled:bg-violet-500 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md">Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-4">No Todos to display</div>}

          {todos.map(item => {
            return (!item.isCompleted || showFinished) && (
            <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
            <div className="flex gap-5">
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>

           <div className="buttons flex h-full">
           <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-700 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"> <FaEdit/> </button>
           <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-700 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"> <MdDelete/> </button>
        </div>
    </div>
  );
})}

        </div>
      </div>
    </>
  );
}

export default App;
