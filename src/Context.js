import { createContext,useState } from "react";

export const NoteContext  = createContext();

const Context = ({children}) => {
    const host="https://kvnotes.onrender.com";
    const notesInitial =[];
    const [notes,setnotes]=useState(notesInitial);
    const [user,setuser]=useState({name:"",email:"",phoneno:"",data:""});

   //fetch user data
   const getUser =async()=>{
    const response = await fetch(`${host}/api/auth/getuser`,{
        method:"POST",
        headers:{
            "auth-token":localStorage.getItem('token')
        },
    });
    const json =await response.json();
    setuser({name:json.name,email:json.email,phoneno:json.phoneno,date:json.date})
}

    //fetch notes

    const getNotes =async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method:"GET",
            headers:{
                "auth-token":localStorage.getItem('token')
            },
        });
        const json =await response.json();
        setnotes(json);
    }

   //add notes

   const addNote=async(title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnotes`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
    });
    const json =await response.json();
    //console.log(json);
    setnotes(notes.concat(json));
    
   }
 

   //delete note
   const deleteNote = async(id)=>{
    console.log(id);
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
        },
    });
    const json =await response.json();
    console.log(json.status);

    const NewNote = notes.filter((note)=>{return note._id!==id})
    setnotes(NewNote);
   }


   //edit notes
   const editNote =async(id,title,description,tag)=>{

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
    });
    const json =await response.json();
    console.log(json.status);

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break;
        }
    } 
    setnotes(newNotes);
   

   }


  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,getUser,user,host}}>
      {children}
    </NoteContext.Provider>
  )
}

export default Context
