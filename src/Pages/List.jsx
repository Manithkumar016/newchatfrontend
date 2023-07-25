import React, { useEffect ,useState,useRef} from 'react';
import "./list.css";
import DeleteIcon from '@mui/icons-material/Delete';
// import {chatRoute, deleteRoute, editRoute, listRoute, mainRoute} from '../Utils/APIRouters'
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import { IconButton,Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import MicIcon from '@mui/icons-material/Mic';
import avatar1 from "../image/avatar1.png";
import avatar2 from "../image/avatar2.png";
import avatar3 from "../image/avatar3.jpg";
import { chatRoute, deleteRoute, msgRoute } from '../Utils/APIRouters';

function List({searchvalue,issearch,handlelist1,handleCancel,contactindex,contacts}) {
const scrollRef=useRef(null);
const Scrolltobottom =()=>{
  if(scrollRef.current){
    scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
  }
}

const UN=localStorage.getItem("username");
const [avatars, setAvatars] = useState([avatar1, avatar2, avatar3]);
const [message,setmessage]=useState("");
const [msgData,setmsgData]=useState([]);

const MAX_RETRY_COUNT = 3; // Set the maximum number of retries
const [date,setDate]=useState(new Date());
const submithandler = async (e) => {
  e.preventDefault();
    try {
      if (!initialLoad) {
        Scrolltobottom();
      } else {
        setInitialLoad(false);
      }
      setmessage('');
      setDate(new Date());
      const a=contacts[contactindex].username;
      console.log({ "Sender": UN, "Receiver": a, "Message": message, "Date":date});
      const response = await axios.post(chatRoute, { UN, a, message,date });
      const data = response.data;
      console.log("Successful");
      return; // Exit the function if successful
    } catch (error) {
       console.log("error: ",error)
      } 
  };
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchuserdata = async () => {
      try {
        const a=contacts[contactindex].username;
        // console.log({UN,a});
        const response = await fetch(`${msgRoute}${UN}/${a}`);
        const data = await response.json();
        // console.log(data);
        setmsgData(data.user);
        
        // console.log(msgData);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchuserdata();
  },[msgData]);

  // console.log(msgData);

  const deleteHandler=async(date,sender)=>{
    try{
      console.log({date,sender})
      const response=await axios.post(deleteRoute,{date,sender});
      const data=response.data;
      console.log("successfull");
      return;
    }catch(err){
      console.log("error",err)
    }
  }

  return (
      <div className='chatbar'>
      <div className='chat_header'>
          <div className='avtar'>
            <Avatar src={avatars[contacts[contactindex].index]}/>
          </div>
          <div className='chat_headerInfo'>
              <h6><b>{contacts[contactindex].username}</b></h6>
              <p>Last Seen...</p>
          </div>
          <div className='chat_headerRight'>
              <IconButton>
                <SearchIcon/>
              </IconButton>
              <IconButton>
                <AttachFileIcon/>
              </IconButton>
              <IconButton>
                <MoreVertIcon/>
              </IconButton>
          </div>
      </div >
      <div className="chat_body" ref={scrollRef}>
      {
        msgData.map((msg,index)=>{
          if(msg.Sender==UN){
            return(
                <p onDoubleClick={()=>deleteHandler(msg.Date,msg.Sender)} className="chat_reciver">
                  <span className='chat_name'>{msg.Sender}</span>
                  {msg.Message}
                  <span className='chat_timestamp'>
                  {msg.Date}
                  
                  </span>
                </p>
            )
          }
          else{
            return(
              <p className="chat_msg">
                  <span className='chat_name'>{msg.Sender}</span>
                  {msg.Message}
                  <span className='chat_timestamp'>
                  {msg.Date}
                  
                  </span>
                </p>
            )
          }
            })
          }
       
      </div>
      
      
      <div className='Chat_footer'>
        
        <form >
        <TagFacesIcon/>
          <input  placeholder='Type a message' type='text' value={message} onChange={(e)=>setmessage(e.target.value)}/>
          
          <MicIcon/>
          <button style={{backgroundColor:"transparent"}} onClick={submithandler} className="btn btns"><SendIcon /></button>
        </form>
        
      </div>
    </div>
  )

}

export default List;
