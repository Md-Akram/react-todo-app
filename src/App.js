import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import TodoList from './TodoList.js'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const nameRef = useRef()
  const uniqueId = Date.now()

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setTodos(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAdd() {
    const name = nameRef.current.value
    if (name === '') return
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uniqueId, name: name, complete: false }]
    })
    nameRef.current.value = ''
  }

  function handleClear() {
    const newTodos = todos.filter((todo) => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='flex'>
      <div>
        <input ref={nameRef} type='text' />
        <button onClick={handleAdd}>Add Todo</button>
      </div>
      <div className='todolist'>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>

      <div>
        <button onClick={handleClear}>Clear Completed</button>
        <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
      </div>
    </div>
  )
}

export default App
