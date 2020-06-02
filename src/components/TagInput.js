import React, { useState } from 'react';

import styles from '../css/tag-input.module.css';

const TagInput = ({ value, onChange, disabled, placeholder }) => {
  const [tag, setTag] = useState('');

  const onChangeTag = (event) => {
    const { value } = event.target;
    setTag(value.toLowerCase());
  };

  const onKeyDown = (event) => {
    if (event.which === ' '.charCodeAt(0) || event.which === 0x0d) {
      event.preventDefault();

      if (tag.trim() === '') {
        return;
      }

      const tags = (value || []).slice();
      if (tags.indexOf(tag.trim().toLowerCase()) === -1) {
        tags.push(tag.trim().toLowerCase());

        if (onChange) {
          onChange(tags);
        }
      }

      setTag('');
    }
  };

  const onClickDelete = (tag) => {
    const tags = (value || []).slice();

    const index = tags.indexOf(tag);
    if (index !== -1) {
      tags.splice(index, 1);

      if (onChange) {
        onChange(tags);
      }
    }
  };

  return (
    <div className={styles.container}>
      {value && value.map(tag => (
        <span key={tag} className={styles.tag}>
          {tag}
          {!disabled && (
            <span className={styles.delete} onClick={() => onClickDelete(tag)}>
              x
            </span>
          )}
        </span>
      ))}
      {!disabled && (
        <input
          type="text"
          value={tag}
          onChange={onChangeTag}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      )}
    </div>
  )
};

export default TagInput;
