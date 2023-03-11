import React, { useRef, useState } from "react";
import { useContext, useEffect } from "react";
import { NoteContext } from "../Context";
import NoteItem from "./NoteItem";
import {useNavigate} from 'react-router'

const Notes = (props) => {
  const { notes, getNotes } = useContext(NoteContext);
  const {editNote} = useContext(NoteContext);
  let navigate=useNavigate();

  const [note, setnote] = useState({etitle: "", edescription: "", etag: ""})
    const refupdate=useRef(null);

    const handleClick=(e)=>{
        e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refupdate.current.click();//this is used to close when we click on the update buttton
    props.showAlert("Notes Updated Successful", "success");
    }

    const handleChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
   
  });

  

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  };

  const ref =useRef(null);
  return (
    <div className="row my-3">
      <div>
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
              <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              value={note.etitle}
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
              id="edescription"
              name="edescription"
              value={note.edescription}
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
              id="etag"
              name="etag"
              value={note.etag}
              onChange={handleChange}
            />
          </div>
        </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refupdate}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<3 } type="button" className="btn btn-primary" onClick={handleClick}>
                  Update Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="container my-2 mx-1">
        {notes.length===0 &&"No Notes To Display"}
      </div>
      {notes.map((note) => {
        return (
          <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}></NoteItem >
        );
      })}
    </div>
  );
};

export default Notes;
