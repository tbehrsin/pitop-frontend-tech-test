import React from 'react';

import { useAPI } from '../api';

import styles from '../css/header.module.css';

const Header = () => {
  const { api } = useAPI();

  const onClickReset = () => {
    api.reset();
  };

  return (
    <header>
      <img src="https://static.pi-top.com/images/logo/black-344x140.png" />
      <button className={styles.button} onClick={onClickReset}>Reset</button>
    </header>
  );
};

export default Header;
