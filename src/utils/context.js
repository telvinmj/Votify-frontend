import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { fetchdatafromapi } from "./api";
export const Context=createContext();
const AppContext=({children})=>{
    const [poll_id,poll_setId]=useState({
        userid:"admin@gmail.com",
        title:"",
        type:"Poll",
        starttime:"",
        endtime:"",
        voterslist:[],
        questions: [
            // Add more questions as needed
          ],

    });
    const [vote_id,vote_setId]=useState({
        userid:"qwertyu123456",
        title:"",
        type:"Vote",
        starttime:"",
        endtime:"",
        voterslist:[],
        questions: 
            {
              question: 'What is your preferred method of relaxation after a long day?',
              options: [{name:"manoj",img_url:"google.com"},{name:"telvin",img_url:"google.com"},{name:"asdfghjkl",img_url:"hvdsiu.com"}],
            }
            
            // Add more questions as needed
          ,

    });
    const [user,setUser]=useState("");
    
    
    
    return(
        <Context.Provider value={{
            poll_id,poll_setId,user,setUser,vote_id,vote_setId
        }}>
            {children}
        </Context.Provider>
        )
}

export default AppContext;
