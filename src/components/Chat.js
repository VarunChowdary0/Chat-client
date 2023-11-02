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
    const {BgColor} =useContext(Globals)
    const [isCode , changeCode] = useState(false);
    const {TextColor} =useContext(Globals)
    const [Code_ , takeCode] = useState();
    const [Saved,setSave] = useState(false)

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

    const ToCode = () =>{
        changeCode(true)
    }
    const ToChat = ()=>{
        changeCode(false)
    }
    const handleCodeTake = (e) =>{
        takeCode(e.target.value)
    }
    const handleSendCode =()=>{
        setNewMessage("code "+Code_)
        SendMessage();
        takeCode("")
    }
    const SaveIt = () =>{
        setNewMessage("code "+Code_)
        setSave(true)
    }
    
  return (
    <div className="h-screen w-full bg-black/50 flex flex-col">
        <div style={{ color: TextColor }} className={`h-[60px] bg-black/40 flex justify-between px-10 items-center text-2xl max-sm:text-sm max-sm:px-4`}>
            <p><span className='text-yellow-500'>RoomID : </span> {roomID}</p>
            <h1 style={{ color: TextColor }} className={`text-3xl `}>Chat</h1>
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
                    {(ele.message.startsWith('http'))
        ? (ele.message.endsWith('.gif')
            ? <iframe className=' scale-100 pt-4' src={ele.message}></iframe>
            : 
            <div>
            <iframe className=' scale-100 pt-4' src={ele.message}></iframe>
            <a href={ele.message} target='_blank'><div className='text-lg text-violet-600'>{ele.message}</div></a>
            </div>
            )
        : 
        (ele.message.startsWith('code ') ? 
        <div className=' w-fit  h-fit px-4 py-2
        bg-black/70 rounded-lg  max-sm:w-fit
        '>
            <div className='px-2 py-1 w-fit mb-3 bg-green-600 rounded-md text-white'>Code</div>
                <pre className={`text-lg text-[#fbaf69]`}>{ele.message.replace("code ","")}</pre>
        </div>

        :
        <div style={{ color: TextColor }} className={`text-lg`}>{ele.message}</div>
    )
        }

                            <div className='flex justify-between space-x-5'>
                                <div className='text-sm mt-1 text-gray-500'>{ele.time}</div>
                                <div className='text-yellow-600'>~{ele.auther}</div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex w-full'>
                            <div className='flex-1'></div>
                            <div className='w-fit max-w-[70%]  max-md:w-[50%] h-fit px-4 py-2
                                bg-black/70 rounded-lg max-sm:w-[45%] max-sm:w-fit
                                overflow-x-auto
                                '>
                            {(ele.message.startsWith('http'))
                                ? (ele.message.endsWith('.gif')
                                    ? 
                                    <iframe className=' scale-100 pt-4' src={ele.message}></iframe>
                                    : 
                                    <div>
                                        <iframe className=' scale-100 pt-4' src={`${ele.message}`}></iframe>
                                        <a href={ele.message} target='_blank'><div className='text-lg text-violet-600'>{ele.message}</div></a>
                                    </div>
                                    )
                                : 
                                (ele.message.startsWith('code ') ? 
                                    <div className=' w-fit  h-fit px-4 py-2
                                    bg-black/70 rounded-lg  max-sm:w-fit
                                    '>
                                        <div className='px-2 py-1 w-fit mb-3 bg-green-600 rounded-md text-white'>Code</div>
                                            <pre className={`text-lg text-[#fbaf69]`}>{ele.message.replace("code ","")}</pre>
                                    </div>

                                    :
                                    <div style={{ color: TextColor }} className={`text-lg`}>{ele.message}</div>
                                )
                                
                            }                      
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
                    {/* (roomID==='Phsdvjbk00' || roomID === 'Welcome') && */}
            {((roomID==='Phsdvjbk00' || roomID === 'Welcome') && ( username !=='Varun Chowdary' && username !=='Admin' ))
            ?
                <div>
                    <div style={{ color: TextColor }} className='h-[50px] bg-black/60 flex justify-center 
                                    items-center gap-4 text-lg'>
                                        Cannot reply in this room
                    </div>
                </div>
                :

        (isCode) ? 
            <div className=' h-[40vh] relative  bg-black/60 flex flex-col items-center justify-center'>
                 <div className='h-7 w-7 absolute top-3 left-[5vh] bg-green-600 rounded-md text-white font-bold flex items-center justify-center  hover:cursor-pointer'
                 onClick={ToChat}>T</div>
                 {(Saved)?
                        <div className='absolute top-2 right-[8vw] px-2 py-1 
                        bg-[#00000049] text-white rounded-md hover:cursor-pointer
                        ' onClick={handleSendCode}>send</div>
                    :
                    <div className='absolute bottom-2 right-[3vw] px-2 py-1 
                    bg-[#00000049] text-white rounded-md hover:cursor-pointer' onClick={SaveIt}>save</div>
                 }
                
                <textarea placeholder='Code starts here...' className='px-3 mt-4 py-2 w-[80vw] 
                rounded-md h-[30vh] max-h-[30vh]
                focus:outline-none min-h-[20vh]' value={Code_} onChange={handleCodeTake} />
            </div>     
        :
    
             <div className='h-[100px] bg-black/60 flex justify-center 
                            items-center gap-4'>
                                <div className='h-7 w-7 bg-green-600 rounded-md fill-white flex items-center justify-center  hover:cursor-pointer'
                                 onClick={ToCode}>
                                <svg className=' scale-90' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                                    <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 
                                    39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 
                                    12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 
                                    45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 
                                    0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 
                                    0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 
                                    45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 
                                    256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
                                </svg>
                                </div>
                <input className='px-3 py-2 w-[60vw] rounded-md 
                                    focus:outline-none' type='text'
                                     placeholder='Type a message' 
                                    value={newMessage}
                onKeyDown={handleKeyDown}
                onChange={handleMessageInp}/>
                <button  onClick={SendMessage} style={{ color: TextColor }} className={`text-5xl fill-white scale-75 rotate-45`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 
                    23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 
                    160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 
                    360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 
                    23.9-5.5 34 1.4z"/>
                </svg>
                </button>
            </div>
        
        }
        
    

    </div>
  )
}

export default Chat;



