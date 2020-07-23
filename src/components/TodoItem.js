import React, { Component } from "react";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditableLabel from 'react-inline-editing';
import './inline.css';
import { Draggable } from "react-beautiful-dnd";


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
});

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.onEditingExit = this.onEditingExit.bind(this)
    }

    onEditingExit(description) {
        if(this.props.description !== description){
            this.props.handleEdit(this.props.index, description)
        }
    }
    
    render(){
        return(

            <Draggable key={this.props.item.id} draggableId={""+this.props.item.id} index={this.props.index}>
                {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <EditableLabel text={this.props.item.description}
                        labelClassName='myLabelClass'
                        inputClassName='myInputClass'
                        inputWidth='200px'
                        inputHeight='25px'
                        inputMaxLength={50}
                        onFocusOut={this.onEditingExit}

                    />

                    <div>
                        
                        <IconButton aria-label="delete" onClick={() => {this.props.handleDelete(this.props.index)}}>
                            <DeleteIcon />
                        </IconButton>


                    </div>
                    
                </div>
                )}

            </Draggable>
        )
    }
}



export default TodoItem;