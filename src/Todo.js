import './App.css';
import { useEffect, useState } from 'react';
import Item from './Item';

function Todo() {
  const api_path = 'http://localhost:8080/todo'
  const headers = {
    headers: { 'Content-Type': 'application/json', authorization: 'JdFdlP2RizncrvHfE7GpMvz+GJ5h5ppzW1JR4WzXwGs=' }
  };
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => loadTodoItems(), []);

  function loadTodoItems() {
    const requestOptions = { ...headers }
    fetch(api_path, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const todo = data.filter(todo => !todo.done)
        const done = data.filter(todo => todo.done)
        setTodoList(todo);
        setDoneList(done);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  function deleteTask(task) {
    const requestOptions = { method: 'DELETE', ...headers }
    const delete_path = api_path + "/" + task.id;

    fetch(delete_path, requestOptions)
      .then(() => loadTodoItems())
      .catch((err) => {
        handleError(err);
      });
  };

  function updateTask(task) {
    const requestOptions = { method: 'PATCH', ...headers }
    const update_path = api_path + "/" + task.id;
    task.done = !task.done;
    requestOptions.body = JSON.stringify(task)

    fetch(update_path, requestOptions)
      .then(() => loadTodoItems())
      .catch((err) => {
        handleError(err);
      });
  };

  function addTask(title) {
    const requestOptions = { method: 'PUT', ...headers }
    requestOptions.body = JSON.stringify({ title: title })

    fetch(api_path, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        todoList.push(data);
        setTodoList(todoList);
        setTitle('');
      })
      .catch((err) => {
        handleError(err);
      });
  }

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask(title);
    }
  };

  function handleError(err) {
    console.log('err: ', err);
    console.log(err.message);
  }

  return (
    <div className='App'>
      <div className="cardList">
        Todo:
        <ul className='taskList'>
          {todoList.map((task) =>
            <Item updateAction={updateTask} deleteAction={deleteTask} task={task}></Item>
          )}
          <li id='new_item'>
            <input value={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder='New task'
              className='newItem' type="text" />
          </li>

        </ul>
      </div>
      <div className="cardList">
        Done:
        <ul className='taskList'>
          {doneList.map((task) =>
            <Item updateAction={updateTask} deleteAction={deleteTask} task={task}></Item>
          )}
        </ul>
      </div>
      <div className="cardList">
        {doneList.length} of {doneList.length + todoList.length} done
      </div>
    </div>
  );
}

export default Todo;
