import React, { useState } from 'react'
import { useContext } from "react";
import { NoteContext } from "../Context";

const AddNote = (props) => {
    const {addNote} = useContext(NoteContext);

    const[note,setnote]=useState({title:"",description:"",tag:""});

    const handleClick=(e)=>{
        e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""});
    props.showAlert("Notes added Successful", "success");
    }

    const handleChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }


  return (
    <div>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="email"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<3 }type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
