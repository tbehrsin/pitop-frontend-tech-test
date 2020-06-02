
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

export const list = () => async (dispatch, state, context) => {
  dispatch({
    type: TODOS_LIST_BEGIN
  });

  try {
    const response = await fetch(`${context.url}/todos`);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error.message);
    }

    dispatch({
      type: TODOS_LIST_END,
      payload: json
    });
  } catch (err) {
    dispatch({
      type: TODOS_LIST_ERROR,
      payload: err
    });
    throw err;
  }
};

export const get = ({ id }) => async (dispatch, state, context) => {
  dispatch({
    type: TODOS_GET_BEGIN,
    payload: id
  });

  try {
    const response = await fetch(`${context.url}/todos/${id}`);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error.message);
    }

    dispatch({
      type: TODOS_GET_END,
      payload: json
    });
  } catch(err) {
    dispatch({
      type: TODOS_GET_ERROR,
      payload: err
    });
    throw err;
  }
};

export const create = ({
  title,
  description,
  priority,
  tags
}) => async (dispatch, state, context) => {
  dispatch({
    type: TODOS_CREATE_BEGIN
  });

  try {
    const response = await fetch(`${context.url}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        tags
      })
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error.message);
    }

    dispatch({
      type: TODOS_CREATE_END,
      payload: json
    });
  } catch (err) {
    dispatch({
      type: TODOS_CREATE_ERROR,
      payload: err
    });
    throw err;
  }
};

export const update = ({
  id,
  isDone
}) => async (dispatch, state, context) => {
  dispatch({
    type: TODOS_UPDATE_BEGIN,
    payload: id
  });

  try {
    const response = await fetch(`${context.url}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isDone
      })
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error.message);
    }

    dispatch({
      type: TODOS_UPDATE_END,
      payload: json
    });
  } catch (err) {
    dispatch({
      type: TODOS_UPDATE_ERROR,
      payload: { id, error: err }
    });
    throw err;
  }
};

export const reset = () => async (dispatch, state, context) => {
  dispatch({
    type: TODOS_RESET_BEGIN
  });

  try {
    const response = await fetch(`${context.url}/reset`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error(json.error.message);
    }

    dispatch({
      type: TODOS_RESET_END
    });
  } catch (err) {
    dispatch({
      type: TODOS_RESET_ERROR,
      payload: err
    });
    throw err;
  }
};
