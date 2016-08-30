import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';

class App extends React.Component {

    render() {
        const {notes} = this.props;
        return (
            <div>
                <button className="add-note" onClick={this.addNote}>&#x2795;</button>
                <Notes
                    notes={notes}
                    onNoteClick={this.activateNoteEdit}
                    onDelete={this.deleteNote}
                    onEdit={this.editNote}
                />
            </div>
        );
    }

    addNote = () => {
        this.props.NoteActions.create({
            id: uuid.v4(),
            task: 'New task'
        });
    }

    deleteNote = (id, e) => {
        e.stopPropagation();
        this.props.NoteActions.delete(id);
    }

    activateNoteEdit = (id) => {
        this.props.NoteActions.update({id, editing: true});
    }

    editNote = (id, task) => {
        const {NoteActions} = this.props;

        NoteActions.update({id, task, editing: false});
    }
}

export default connect(({notes}) => ({
    notes
}), {
    NoteActions
})(App)