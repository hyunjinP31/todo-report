import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Footer from './Footer';
import { getDate, todoClear, todoCreate, todoDone, todoDoneClear, todoUnDone, toggleIsdone } from './modules/todo';
import TodoCreate from './TodoCreate';
import TodoHead from './TodoHead';
import TodoLIst from './TodoLIst';

const TodoTemplateDiv = styled.div`
    width: 30%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background: rgb(250, 250, 250);
    border-radius: 10px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

const TodoTemplate = () => {
    const todos = useSelector(state => state.todo.todo);
    const date = useSelector(state => state.todo.todayDate);
    const doneTodoId = useSelector(state => state.todo.doneTodoId);
    const { loading, data, error } = date;
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const uploadTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const onTextChange = (e) => {
        setText(e.target.value)
    }
    const createTodo = () => {
        if (text === "") return alert('Please type the text')
        dispatch(todoCreate(text, uploadTime(new Date())))
        setText("");
    }
    const createTodoEnter = (e) => {
        if (e.code === "Enter") {
            if (text === "") return alert('Please type any text')
            dispatch(todoCreate(text, uploadTime(new Date())))
            setText("");
        }
    }
    const isTodoDone = (id) => {
        dispatch(toggleIsdone(id));
        if(doneTodoId.includes(id)) return dispatch(todoUnDone(id));
        dispatch(todoDone(id));
    }
    const checkTodoClear = () => {
        dispatch(todoDoneClear());
    }
    useEffect(() => {
        dispatch(getDate());
    }, [])

    if (loading) return <div>loading</div>;
    if (!data || error) return;
    return (
        <TodoTemplateDiv>
            <TodoHead data={data} todos={todos} checkTodoClear={checkTodoClear} />
            <TodoCreate
                createTodo={createTodo}
                onTextChange={onTextChange}
                text={text}
                createTodoEnter={createTodoEnter} />
            <TodoLIst todos={todos} isTodoDone={isTodoDone} />
            <Footer />
        </TodoTemplateDiv>
    );
};

export default TodoTemplate;