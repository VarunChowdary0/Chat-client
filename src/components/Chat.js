import React, { useContext, useRef , useEffect } from 'react'
import { Globals } from '../globals/Globals'
import axios, { all } from 'axios';


const Chat = () => {
    const {socket , username , roomID} = useContext(Globals)
    const {newMessage,setNewMessage} = useContext(Globals);
    const {AllMessages,addMessages}=useContext(Globals);
    const {saverModeOn} = useContext(Globals);
    const {URL} = useContext(Globals)

    useEffect(() => {
            socket.emit("join_room", { 'room': roomID, 'username': username });
        },[])

        useEffect(() => {
           if(saverModeOn){
            console.log('called')
            axios.get(URL + "/get_old_messages", { params: { roomID } })
                .then((res) => {
                    if (res.statusText === 'OK') {
                        const datas = res.data.data;
                        // Call UpdateMessages_1 once with the array of messages
                        UpdateMessages_1(datas);
                       // console.log(datas);
                    } else {
                        console.log("something went wrong");
                        console.log(res);
                    }
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
            console.log(AllMessages.length)

            await socket.emit("send_message",messageINFO)
            //localStorage.setItem("Allmessages",AllMessages.concat(messageINFO))
            UpdateMessages(messageINFO)
            setNewMessage("");
        }
    }
    const UpdateMessages=(data)=>{
        addMessages((list)=>[...list , data]);
        console.log(AllMessages)
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
            <button  onClick={SendMessage} className='text-white text-5xl'>&#9658;
            </button>
        </div>
    </div>
  )
}

export default Chat;



