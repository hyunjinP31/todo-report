import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const TodoLIst = ({ todos, isTodoDone }) => {
    return (
        <div className='todoList inner'>
            <ul>
                {todos.map(todo =>
                    <li key={todo.id} className={`todoItem ${todo.isDone ? 'done' : ''}`}>
                        <div className='todoItemRight'>
                            <div
                                className='checkBox'
                                onClick={() => isTodoDone(todo.id)}><AiOutlineCheck className='checkIcon' /></div>
                            <p className='todoText'>{todo.text}</p>
                        </div>
                        <p className='todoUploadedTime'>{todo.uploadedTime}</p>
                    </li>
                )
                }
            </ul>
        </div>
    );
};

export default TodoLIst;