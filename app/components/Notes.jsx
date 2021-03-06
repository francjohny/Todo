import React from 'react';
import Note from './Note';
import Editable from './Editable'

export default ({ notes, onNoteClick=() => {}, onDelete=() => {}, onEdit=() => {} }) => (
    <ul className="notes">{notes.map(({ id, task, editing }) =>
        <li key={id}>
            <Note className="note" onClick={() => onNoteClick(id)}>
                <Editable
                    className="editable"
                    editing={editing}
                    value={task}
                    onEdit={onEdit.bind(null, id)}/>
                <button className="delete" onClick={onDelete.bind(null, id)}>&#x274c;</button>
            </Note>
        </li>
    )}</ul>
)
