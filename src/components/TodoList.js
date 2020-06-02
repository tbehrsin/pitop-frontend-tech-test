import React, { useEffect } from 'react';

import { useAPI } from '../api';

import TodoRow from './TodoRow';

import styles from '../css/todo-list.module.css';

const TodoList = () => {
  const { api, state } = useAPI();

  useEffect(() => {
    api.list();
  }, []);

  return (
    <ul className={styles.container}>
      {state.todos.map(todo => (
        <TodoRow key={todo.id} todo={todo} />
      ))}
    </ul>
  )
};

export default TodoList;
