import axios from "axios";
import { API_URL } from "../api";

const initialState = {
    todo: [],
    todayDate: {
        loading: false,
        data: null,
        error: null,
    },
    doneTodoId: [],
}

const TODO_CREATE = "todo/TODO_CREATE";
const TODO_ISDONE = "todo/TODO_ISDONE";
const TODO_CLEAR = "todo/TODO_CLEAR";
const DONE_TODO_ID = "todo/DONE_TODO_ID";
const GET_DATE = "todo/GET_DATE";
const GET_DATE_SUCESS = "todo/GET_DATE_SUCESS";
const GET_DATE_ERROR = "todo/GET_DATE_ERROR";
const DONE_TODO_CLEAR = "todo/DONE_TODO_CLEAR";
const UNDONE_TODO_ID = "todo/UNDONE_TODO_ID";

let nextId = 1;

export const todoCreate = (text, time) => {
    return {
        type: TODO_CREATE,
        newTodo: {
            id: nextId++,
            text,
            isDone: false,
            uploadedTime: time,
        },
    }
}
export const getDate = () => async (dispatch) => {
    dispatch({ type: GET_DATE });
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        dispatch({ type: GET_DATE_SUCESS, data })
    }
    catch (e) {
        dispatch({ type: GET_DATE_ERROR, e })
    }
}
export const toggleIsdone = (id) => {
    return {
        type: TODO_ISDONE,
        id,
    }
}
export const todoClear = () => {
    return {
        type: TODO_CLEAR
    }
}
export const todoDone = (id) => {
    return {
        type: DONE_TODO_ID,
        id
    }
}
export const todoDoneClear = () => {
    return {
        type: DONE_TODO_CLEAR,
    }
}
export const todoUnDone = (id) => {
    return {
        type: UNDONE_TODO_ID,
        id
    }
}

export default function todo(state = initialState, action) {
    switch (action.type) {
        case TODO_CREATE:
            return {
                ...state,
                todo: [
                    ...state.todo,
                    action.newTodo
                ]
            }
        case TODO_ISDONE:
            return {
                ...state,
                todo: state.todo.map(item => item.id === action.id ? {...item, isDone: !item.isDone} : item)
            }
        case TODO_CLEAR:
            return {
                ...state,
                todo: [],
            }
        case GET_DATE:
            return {
                ...state,
                todayDate: {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_DATE_SUCESS:
            return {
                ...state,
                todayDate: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            }
        case GET_DATE_ERROR:
            return {
                ...state,
                todayDate: {
                    loading: false,
                    data: null,
                    error: action.e
                }
            }
        case DONE_TODO_ID:
            return {
                ...state,
                doneTodoId: [
                    ...state.doneTodoId,
                    action.id
                ]
            }
        case UNDONE_TODO_ID:
            return {
                ...state,
                doneTodoId: state.doneTodoId.filter(id=> action.id !== id)
            }
        case DONE_TODO_CLEAR:
            return {
                ...state,
                todo: state.todo.filter(item=> !state.doneTodoId.includes(item.id)),
                doneTodoId: []
            }
        default:
            return state
    }
}