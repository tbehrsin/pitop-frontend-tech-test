
import * as actions from './actions';
import {
  TODOS_LIST_BEGIN,
  TODOS_LIST_END,

  TODOS_GET_BEGIN,
  TODOS_GET_END,

  TODOS_CREATE_BEGIN,
  TODOS_CREATE_END,
  TODOS_CREATE_ERROR,

  TODOS_UPDATE_BEGIN,
  TODOS_UPDATE_END,
} from './constants';

describe('actions', () => {
  const context = {
    url: 'https://backend-test.pi-top.com/todo-test/v1'
  };

  test('list action (integration)', async (done) => {
    const action = await actions.list();
    const dispatch = jest.fn();
    await action(dispatch, {}, context);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls).toEqual([
      [{ type: TODOS_LIST_BEGIN }],
      [{
        type: TODOS_LIST_END,
        payload: expect.arrayContaining([{
          id: expect.any(String),
          createdAt: expect.any(String),
          isDone: expect.any(Boolean),
          priority: expect.any(String),
          title: expect.any(String)
        }])
      }]
    ]);
    done();
  });

  test('get action (integration)', async (done) => {
    const listAction = await actions.list();
    const dispatch = jest.fn();
    await listAction(dispatch, {}, context);

    const todo = dispatch.mock.calls[1][0].payload[0];

    dispatch.mockReset();

    const action = await actions.get({ id: todo.id });
    await action(dispatch, {}, context);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls).toEqual([
      [{ type: TODOS_GET_BEGIN, payload: todo.id }],
      [{
        type: TODOS_GET_END,
        payload: {
          ...todo,
          description: expect.any(String),
          tags: expect.arrayContaining([expect.any(String)])
        }
      }]
    ]);
    done();
  });

  test('create action (integration)', async (done) => {
    const todo = {
      title: 'test title',
      description: 'test description',
      priority: 1,
      tags: ['test-tag'],
    };

    const action = await actions.create(todo);
    const dispatch = jest.fn();
    await action(dispatch, {}, context);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls).toEqual([
      [{ type: TODOS_CREATE_BEGIN }],
      [{
        type: TODOS_CREATE_END,
        payload: {
          ...todo,
          id: expect.any(String),
          createdAt: expect.any(String),
          isDone: false
        }
      }]
    ]);
    done();
  });

  test('create action failure (integration)', async (done) => {
    const todo = {
      title: 'test title',
      description: '',
      priority: 1,
      tags: ['test-tag'],
    };

    const action = await actions.create(todo);
    const dispatch = jest.fn();
    await expect(action(dispatch, {}, context)).rejects.toThrow("The property 'description' is required.")

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls).toEqual([
      [{ type: TODOS_CREATE_BEGIN }],
      [{
        type: TODOS_CREATE_ERROR,
        payload: expect.any(Error)
      }]
    ]);
    done();
  });

  test('update action (integration)', async (done) => {
    const listAction = await actions.list();
    const dispatch = jest.fn();
    await listAction(dispatch, {}, context);

    const todo = dispatch.mock.calls[1][0].payload[0];

    dispatch.mockReset();

    const action = await actions.update({ id: todo.id, isDone: !todo.isDone });
    await action(dispatch, {}, context);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls).toEqual([
      [{ type: TODOS_UPDATE_BEGIN, payload: todo.id }],
      [{
        type: TODOS_UPDATE_END,
        payload: {
          ...todo,
          isDone: !todo.isDone,
          description: expect.any(String),
          tags: expect.arrayContaining([expect.any(String)])
        }
      }]
    ]);
    done();
  });

  test('reset action (integration)', async (done) => {
    const action = await actions.reset();
    const dispatch = jest.fn();
    await action(dispatch, {}, context);
    done();
  })
});
