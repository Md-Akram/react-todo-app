import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  function todoClickHandler() {
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input
          type='checkbox'
          checked={todo.complete}
          onChange={todoClickHandler}
        />
        {todo.name}
      </label>
    </div>
  )
}
