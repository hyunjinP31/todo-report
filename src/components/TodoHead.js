import moment from 'moment';
import React from 'react';

const TodoHead = ({data, todos, checkTodoClear}) => {
    return (
        <div className='todoHeader inner'>
            <ul>
                <li className='flexLi flexLiEnd'>
                    <div className='todoTitle'>
                        <h1 className='todoDate'>{moment(data).format('dddd')},</h1>
                        <span className='todoDays'>{moment(data).format('Do')}</span>
                    </div>
                    <span className='todoTasks'>{todos.length} Tasks</span>
                </li>
                <li className='flexLi flexLiStart'>
                    <p className='todoMonth'>{moment(data).format('MMMM')}</p>
                    <button className='todoClear' onClick={checkTodoClear}>CLEAR LIST</button>
                </li>
            </ul>
        </div>
    );
};

export default TodoHead;