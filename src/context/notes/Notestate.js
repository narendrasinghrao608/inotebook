import { useState } from "react"
import noteContext from "./noteContext"
const NoteState=(props)=>{
    const host="http://localhost:5000"
    //context api with set state
    // const s1={
    //     "name":"krishnadas",
    //     "class":"5b"
    // }
    // const [state,setstate]=useState(s1)
    // const update=()=>{
    //     setTimeout(() => {
    //         setstate({
    //             "name":"govinddas",
    //             "class":"6d"
    //         })
    //     }, 1000);
    // }
    const notesinitial={}
    const [notes,setNotes]=useState(notesinitial)
    //get all Notes
    const getNotes=async (title,description,tag)=>{
        //fetch api
        const response=await fetch(`${host}api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth':localStorage.getItem('token')
            },
        });
        const json=await response.json();
        console.log(json)
    }
    //add a Note
    const addNote=async (title,description,tag)=>{

        //
        const response=await fetch(`${host}api/notes/updatenote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth':localStorage.getItem('token')
            },
            body:JSON.stringify(title,description,tag)
        });
        const json= response.json();
        console.log("adding a new note")
        let note="null";
        setNotes(notes.concat(note))
    }
    //Delete a Note
    const deleteNote=async(id,title,descirption,tag)=>{
        //Todo:api call
        const response=await fetch(`${host}api/notes/updatenote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth':localStorage.getItem('token')
            },
            body:JSON.stringify(title,descirption,tag)
        });
        const json= response.json();
        console.log("delete js")
        let newnotes=notes.filter((note)=>{
            return note._id!==id
        })
        setNotes(newnotes)
    }
    //Edit a Note
    const editnote=async (id,title,description,tag)=>{
        //api call
        const response=await fetch(`${host}api/notes/updatenote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth':localStorage.getItem('token')
            },
            body:JSON.stringify(title,description,tag)
        });
        const json= response.json();
        //logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
            }
            
        }
    }
    return (
        <noteContext.Provider value={ {notes,setNotes,addNote,deleteNote,editnote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;