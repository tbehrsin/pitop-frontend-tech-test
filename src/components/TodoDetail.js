
import React, { useEffect } from 'react';

import { useAPI } from '../api';

import TagInput from './TagInput';
import styles from '../css/todo-detail.module.css';

const TodoDetail = ({ id }) => {
  const { api, state } = useAPI();

  useEffect(() => {
    api.get({ id });
  }, []);

  const todo = state.todos.find(t => t.id === id);

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.heading}>Description</span>
        {todo.description}
      </div>
      <div>
        <span className={styles.heading}>Priority</span>
        {todo.priority}
      </div>
      <div className={styles.tags}>
        <span className={styles.heading}>Tags</span>
        <TagInput value={todo.tags} disabled />
      </div>
    </div>
  )
};

export default TodoDetail;
