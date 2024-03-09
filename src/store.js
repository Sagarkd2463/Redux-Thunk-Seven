import { createSlice, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        todosPerPage: 10,
        currentPage: 1,
    },
    reducers: {
        fetchTodos: (state, action) => {
            state.todos = [...action.payload];
        },

        onNavigateNext: (state) => {
            state.currentPage++;
        },

        onNavigatePrev: (state) => {
            state.currentPage--;
        },

        onChangeTodosPerPage: (state, action) => {
            state.todosPerPage = action.payload;
        },

        onClickCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const fetchAllTodos = () => {
    return async (dispatch) => {
        const fetchTodosApi = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            return response;
        };
        try {
            const res = await fetchTodosApi();
            const todos = await res.json();
            dispatch(todoSlice.actions.fetchTodos(todos.map((todo) => {
                return (
                    {
                      _id: todo.id,
                      title: todo.title,
                      completed: todo.completed
                    }
                )
            })));
        } catch (error) {
            console.log(error);
        }
    };
};

const todoMiddleware = [thunk];

const store = configureStore({
    reducer: {
        todosStore: todoSlice.reducer,
    },
    middleware: () => todoMiddleware,
});

export const TodosAction = todoSlice.actions;
export default store;