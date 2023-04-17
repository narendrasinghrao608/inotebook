import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
function Notesitem(props) {
  const context=useContext(noteContext);
  const { deleteNote} = context;
  const { note ,updateNote } = props;
  return (
    <div className="col-md-3">
      {/* {note.title}
      {note.description} */}
      <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <i className="fa-regular fa-trash-can" onClick={()=>{
            deleteNote(note._id)
          }}></i>
        </div>
        <div className="card-body">
          <h5 className="card-title">title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <i className="fa-regular fa-trash-can" onClick={()=>{
            updateNote()

          }}></i>
        </div>
      </div>
    </div>
  );
}

export default Notesitem;
