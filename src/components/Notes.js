import React, { useContext,  useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notesitem from "./Notesitem";
import Addnotes from "./Addnotes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Notes() {
  const context = useContext(noteContext);
  const { notes,getnotes} = context;
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      navigate('/')
    }
    else{
      navigate('/login')
    }
  }, []);
  const [note,setnote]=useState({etitle:"",edescription:"",etag:""})
  const ref = useRef(null);
  const refclose = useRef(null);
  const updateNote = () => {
    ref.current.click();
    // refclose.current.click();
    // setnote({etitle:currrentnote.title,edescription:currrentnote.description})
  };
  const handleclick=()=>{
    refclose.current.click();
  }
  const onchange=()=>{

  }
  return (
    <div>
      <Addnotes />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
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
              <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={onchange}
                      id="title"
                      name="title"
                      value={note.etitle}
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text"></div>
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
                      value={note.edescription}
                      onChange={onchange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      value={note.etag}
                      onChange={onchange}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                    </label>
                  </div>
                  <button
                    type="submit"
                    onClick={handleclick}
                    className="btn btn-primary"
                  >
                    Add Note
                  </button>
                </form>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={()=>{
                  return handleclick();
                }}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                update notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <h1>You Notes</h1>
        {/* {notes.map((note)=>{ */}
        {/* {notes.length===0 && "no notes to display"} aage vala true hota he to bad vala chlta he*/}
        <Notesitem note={notes} updateNote={updateNote}  />
        {/* })} */}
      </div>
    </div>
  );
}

export default Notes;
