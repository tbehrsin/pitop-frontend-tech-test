
import {
  TODOS_LIST_BEGIN,
  TODOS_LIST_END,
  TODOS_LIST_ERROR,

  TODOS_GET_BEGIN,
  TODOS_GET_END,
  TODOS_GET_ERROR,

  TODOS_CREATE_BEGIN,
  TODOS_CREATE_END,
  TODOS_CREATE_ERROR,

  TODOS_UPDATE_BEGIN,
  TODOS_UPDATE_END,
  TODOS_UPDATE_ERROR,

  TODOS_RESET_BEGIN,
  TODOS_RESET_END,
  TODOS_RESET_ERROR
} from './constants';

export const initialState = () => ({
  todos: [],
  list: { pending: false },
  get: {},
  create: { pending: false },
  update: {},
  reset: { pending: false }
});

const sort = (state) => Object.assign({}, state, {
  todos: state.todos.sort((a, b) => {
    const ad = a.isDone;
    const bd = b.isDone;
    const ap = parseInt(a.priority, 10);
    const bp = parseInt(b.priority, 10);

    if (!ad && bd) {
      return -1;
    }

    if (!bd && ad) {
      return 1;
    }

    if (ap > bp) {
      return -1;
    }

    if (ap < bp) {
      return 1;
    }

    return 0;
  })
});

const assignTodo = (state, todo) => {
  const todos = state.todos.slice();

  const index = todos.findIndex(t => t.id === todo.id);

  if (index === -1) {
    todos.push(todo);
  } else {
    todos.splice(index, 1, todo);
  }

  return sort(Object.assign({}, state, { todos }));
};

export const reducer = (state, { type, payload }) => {
  console.debug('reducer', type, payload);

  switch(type) {
    case TODOS_LIST_BEGIN: {
      return Object.assign({}, state, {
        list: { pending: true }
      });
    }
    case TODOS_LIST_END: {
      return sort(Object.assign({}, state, {
        todos: payload,
        list: { pending: false }
      }));
    }
    case TODOS_LIST_ERROR: {
      return Object.assign({}, state, {
        list: { pending: false, error: payload }
      });
    }

    case TODOS_GET_BEGIN: {
      return Object.assign({}, state, {
        get: {
          [payload]: { pending: true }
        }
      });
    }
    case TODOS_GET_END: {
      return assignTodo(Object.assign({}, state, {
        get: {
          [payload.id]: { pending: false }
        }
      }), payload);
    }
    case TODOS_GET_ERROR: {
      return Object.assign({}, state, {
        get: {
          [payload.id]: { pending: false, error: payload.error }
        }
      });
    }

    case TODOS_CREATE_BEGIN: {
      return Object.assign({}, state, {
        create: { pending: true }
      });
    }
    case TODOS_CREATE_END: {
      return assignTodo(Object.assign({}, state, {
        create: { pending: false }
      }), payload);
    }
    case TODOS_CREATE_ERROR: {
      return Object.assign({}, state, {
        create: { pending: false, error: payload }
      });
    }

    case TODOS_UPDATE_BEGIN: {
      return Object.assign({}, state, {
        update: {
          [payload]: { pending: true }
        }
      });
    }
    case TODOS_UPDATE_END: {
      return assignTodo(Object.assign({}, state, {
        update: {
          [payload.id]: { pending: false }
        }
      }), payload);
    }
    case TODOS_UPDATE_ERROR: {
      return Object.assign({}, state, {
        update: {
          [payload.id]: { pending: false, error: payload.error }
        }
      });
    }

    case TODOS_RESET_BEGIN: {
      return Object.assign({}, state, {
        reset: { pending: true }
      });
    }
    case TODOS_RESET_END: {
      window.location.reload();
      return Object.assign({}, state, {
        reset: { pending: false }
      });
    }
    case TODOS_RESET_ERROR: {
      return Object.assign({}, state, {
        reset: { pending: false, error: payload }
      });
    }

    default: {
      throw new Error(`unknown action type: ${type}`)
    }
  }
};
