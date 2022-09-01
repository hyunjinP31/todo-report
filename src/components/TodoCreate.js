import React from 'react';

const TodoCreate = ({createTodo, onTextChange, text, createTodoEnter}) => {
    return (
        <div className='todoCreate'>
            <button onClick={createTodo} className='createBtn'>+</button>
            <input onKeyPress={createTodoEnter} className='createInput' type='text' value={text} onChange={onTextChange} placeholder='Type your Task'/>
        </div>
    );
};

export default TodoCreate;