import React from 'react';
import Note from './Note';

export default ({notes, onDelete}) => (
    <ul>{notes.map(({id, task}) =>
        <li key={id}>
            <Note
                onDelete={onDelete.bind(this, id)}
                task={task} />
        </li>
    )}</ul>
)
