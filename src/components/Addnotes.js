import React,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";
function Addnotes() {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setnote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
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
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label"
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label"
            >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
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
              Check me out
            </label>
          </div>
          <button type="submit" onClick={handleclick} className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnotes;
