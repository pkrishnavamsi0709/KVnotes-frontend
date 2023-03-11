import React from "react";
import { useContext } from "react";
import { NoteContext } from "../Context";

const NoteItem = (props) => {
  const { deleteNote} = useContext(NoteContext);
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>{
            updateNote(note)
          }}></i>
          <i className="fa-regular fa-trash-can mx-2" onClick={()=>{
            deleteNote(note._id)
            props.showAlert("Notes Deleted Successful", "success");
          }}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
