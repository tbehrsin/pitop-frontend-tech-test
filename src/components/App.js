import React from 'react';

import Header from './Header';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';

const App = () => {
  return (
    <div>
      <Header/>
      <div className="view">
        <CreateTodo />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
