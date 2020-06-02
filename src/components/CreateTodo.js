import React, { useState } from 'react';

import { useAPI } from '../api';
import TagInput from './TagInput';

import styles from '../css/create-todo.module.css';

const CreateTodo = () => {
  const { api, state } = useAPI();

  const [focused, setFocused] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const [tags, setTags] = useState([]);

  const onClickCreate = async () => {
    try {
      await api.create({
        title,
        description,
        priority,
        tags
      });
      setTitle('');
      setDescription('');
      setPriority(1);
      setTags([]);
    } catch (err) {

    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={event => event.preventDefault()}>
        <input
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="What do you want todo..."
        />

        {(focused || title) && (
          <>
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="Description of what you want todo..."
            />
            <input
              type="number"
              value={priority}
              onChange={event => setPriority(parseInt(event.target.value, 10) || 0)}
              placeholder="Priority..."
            />
            <TagInput
              value={tags}
              onChange={setTags}
              placeholder="Tags..."
            />

            {state.create.error && (
              <div className={styles.error}>
                {state.create.error.message}
              </div>
            )}

            <button onClick={onClickCreate} type="submit">Create</button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateTodo;
