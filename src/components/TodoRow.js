import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useAPI } from '../api';

import TodoDetail from './TodoDetail';

import styles from '../css/todo-row.module.css';

const TodoRow = ({ todo }) => {
  const { api } = useAPI();
  const [expanded, setExpanded] = useState(false);

  const onChange = (event) => {
    const { checked } = event.target;
    api.update({
      id: todo.id,
      isDone: checked
    });
  };

  const onClickTitle = (event) => {
    setExpanded(!expanded);
  };

  return (
    <li className={styles.container}>
      <div className={`${styles.rowContainer} ${todo.isDone ? styles.done : ''}`}>
        <div className={styles.isDone}>
          <input type="checkbox" checked={todo.isDone} onChange={onChange} />
        </div>
        <div className={styles.title} onClick={onClickTitle}>{todo.title}</div>
        <div className={styles.date}>{moment(todo.createdAt).fromNow()}</div>
      </div>
      {expanded && (
        <TodoDetail id={todo.id} />
      )}
    </li>
  );
};

export default TodoRow;
