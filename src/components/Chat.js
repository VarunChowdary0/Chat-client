import React, { useContext, useRef , useEffect, useState } from 'react'
import { Globals } from '../globals/Globals'
import axios from 'axios';


const Chat = () => {
    const {socket , username , roomID} = useContext(Globals)
    const {newMessage,setNewMessage} = useContext(Globals);
    const {AllMessages,addMessages}=useContext(Globals);
    const {saverModeOn} = useContext(Globals);
    const {URL} = useContext(Globals)
    const {LocalDataOnNotifications,updateLocalnotifiation} = useContext(Globals);
    const [Temp , setTemp] = useState([]);

    const UpdayeIt = (x)=>{
        LocalDataOnNotifications.forEach(local => {
            let MyOp;
            console.log('loc') 
            if(local['room']===roomID)  {
                MyOp = { 'room': local['room'], 'length': x };
            }
            else{
                MyOp = local;
            }
              //  console.log(`{'room': ${hold.room}, 'length': ${fetched.length  - hold.length}`)
                TempUp(MyOp)
            });   
        opu();
    }
    const TempUp = (gh) =>{
        setTemp(Temp.push(gh));
    }
    useEffect(()=>{
        console.log("local",LocalDataOnNotifications);
    },[])

    useEffect(()=>{
        axios.get(URL+'/get_length_of_room',{params:{'room':roomID}})
            .then((res)=>{
                console.log(res.data['length']);
                UpdayeIt(res.data['length']);
            })
            .catch((err)=>{
                console.log("Error: ",err);
            })
    },[])


    const opu =() =>{
        console.log(Temp)
        localStorage.setItem('_Local_Notifications_',JSON.stringify(Temp));
            updateLocalnotifiation(Temp);
    }
    useEffect(() => {
            socket.emit("join_room", { 'room': roomID, 'username': username });
        },[])

        useEffect(() => {
           if(saverModeOn){
            axios.get(URL + "/get_old_messages", { params: { roomID } })
                .then((res) => {
                        const datas = res.data.data;
                        // Call UpdateMessages_1 once with the array of messages
                        UpdateMessages_1(datas);
                       // console.log(datas);
                })
                .catch((err) => {
                    console.log("Error: ", err);
                })
           }
           else{
            console.log('On saver')
           }
        }, [])
        

    useEffect(() => {
        socket.on("recive_message", (data) => {
          //  localStorage.setItem("Allmessages",AllMessages.concat(data))
            UpdateMessages(data);
        });
        return () => {
            socket.off("recive_message");
        };
    }, [socket]);

    const UpdateMessages_1=(data)=>{
        data.map((ele)=>{
            addMessages((list)=>[...list,ele ]);
        })
        //console.log(AllMessages)
    }

    const SendMessage =async () => {
        if(newMessage.trim()!==""){
            const messageINFO = {
                room : roomID,
                auther : username,
                message : newMessage,
                time : new Date(Date.now()).getHours()+
                ':'+ new Date(Date.now()).getMinutes()
            };
            //console.log(AllMessages.length)

            await socket.emit("send_message",messageINFO)
            //localStorage.setItem("Allmessages",AllMessages.concat(messageINFO))
            UpdateMessages(messageINFO)
            setNewMessage("");
        }
    }
    const UpdateMessages=(data)=>{
        addMessages((list)=>[...list , data]);
        //console.log(AllMessages)
    }
    const handleMessageInp = (event) =>{
        setNewMessage(event.target.value)
    }
    const handleKeyDown = (event)=>{
        if(event.key === 'Enter'){
            SendMessage();
        }
    }
    const chatContainerRef = useRef();
    function scrollToBottom() {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
      useEffect(() => {
        scrollToBottom();
      }, [UpdateMessages]);
  return (
    <div className="h-screen w-full bg-black/50 flex flex-col">
        <div className='h-[60px] bg-black/40 flex justify-between px-10 items-center  text-white'>
            <p><span className='text-yellow-500'>RoomID : </span> {roomID}</p>
            <h1 className='text-3xl text-white'>Chat</h1>
            <p>{username}</p>
        </div>
        <div ref={chatContainerRef} className='flex-1 flex flex-col px-1 gap-4 h-fit overflow-y-auto'>
        {AllMessages.map((ele,index) => {
    return (
        <div key={index}>
            {ele.auther !== username ? (
                <div className='w-[400px] max-md:w-[30%] h-fit px-4 py-2 
                        bg-black/70 rounded-lg max-sm:w-[45%] max-sm:w-fit
                        '>
                    <div className='text-lg text-white'>{ele.message}</div>
                    <div className='flex justify-between space-x-5'>
                        <div className='text-sm mt-1 text-gray-500'>{ele.time}</div>
                        <div className='text-yellow-600'>~{ele.auther}</div>
                    </div>
                </div>
            ) : (
                <div className='flex w-full'>
                    <div className='flex-1'></div>
                    <div className='w-[400px] max-md:w-[30%] h-fit px-4 py-2
                         bg-black/70 rounded-lg max-sm:w-[45%] max-sm:w-fit
                         '>
                        <div className='text-lg text-white'>{ele.message}</div>
                        <div className='flex justify-between space-x-5'>
                            <div className='text-sm mt-1 text-gray-500'>{ele.time}</div>
                            <div className='text-yellow-600'>~{ele.auther}</div>
                        </div>
                    </div>
                </div>
            )}
            <div></div>
        </div>
    );
})}


        </div>
        <div className='h-[100px] bg-black/60 flex justify-center 
                        items-center gap-4'>
            <input className='px-3 py-2 w-[60vw] rounded-md 
                                focus:outline-none' type='text'
                                 placeholder='Type a message' 
                                value={newMessage}
            onKeyDown={handleKeyDown}
            onChange={handleMessageInp}/>
            <button  onClick={SendMessage} className='text-white text-5xl fill-white scale-75 rotate-45'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 
                23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 
                160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 
                360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 
                23.9-5.5 34 1.4z"/>
            </svg>
            </button>
        </div>
    </div>
  )
}

export default Chat;



