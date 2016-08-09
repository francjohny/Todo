import React from 'react';
import Notes from './Notes';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    getTODO = () =>
        axios.get('http://localhost:3000/notes');

    addTODO = (note) =>
        axios.post('http://localhost:3000/notes',  note);

    deleteTODO = (id) =>
        axios.delete('http://localhost:3000/notes/' +  id);

    updateTODO = (id, task) =>
        axios.put('http://localhost:3000/notes/' +  id, task);

    render() {
        const {notes} = this.state;
        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <Notes
                    notes={notes}
                    onNoteClick={this.activateNoteEdit}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote}
                />
            </div>
        );
    }

    addNote = () => {
        this.addTODO(JSON.stringify('New task')).then((res) => {

            this.setState({
                notes: [
                    ...this.state.notes,
                    {
                        id: res.data.id,
                        task: 'New task'
                    }
                ]
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    deleteNote = (id, e) => {

        e.stopPropagation();
        this.setState({
            notes: this.state.notes.filter(note => note.id != id)
        })
        this.deleteTODO(id);
    }

    activateNoteEdit = (id) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.id === id) {
                    return {
                        ...note,
                        editing: true
                    };
                }

                return note;
            })
        });
    }
    editNote = (id, task) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.id === id) {
                    return {
                        ...note,
                        task: task,
                        editing: false
                    };
                }
                return note;
            })
        });
        this.updateTODO(id, task);
    }
}

