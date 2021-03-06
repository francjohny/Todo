import React from 'react';
import classnames from 'classnames';

const Editable = ({editing, value, onEdit, className, ...props}) => {
    if (value=="Redux" ||editing) {
        return <Edit className={className} value={value} onEdit={onEdit} {...props} />;
    }

    return <span className={classnames('value', className)} {...props}>{value}</span>;
}

class Edit extends React.Component {
    render() {
        const {value, className} = this.props;

        return <input
            className={classnames('edit', className)}
            type="text"
            autoFocus={true}
            defaultValue={value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter}
        />;
    }

    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    }
    finishEdit = (e) => {
        const value = e.target.value;

        if (this.props.onEdit) {
            this.props.onEdit(value);
        }
    }
}

Editable.Edit = Edit;

export default Editable;