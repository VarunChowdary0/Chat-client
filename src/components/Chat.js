    import React, { useContext , useEffect, useState } from 'react'
    import { Globals } from '../globals/Globals'
    import axios from 'axios';
    import { infinity } from 'ldrs'

    infinity.register()

// Default values shown


    const Chat = () => {
        const {socket , username , roomID} = useContext(Globals)
        const {newMessage,setNewMessage} = useContext(Globals);
        const {AllMessages,addMessages}=useContext(Globals);
        const {saverModeOn} = useContext(Globals);
        const {URL} = useContext(Globals)
        const {LocalDataOnNotifications,updateLocalnotifiation} = useContext(Globals);
        const [Temp , setTemp] = useState([]);
        const [isCode , changeCode] = useState(false);
        const {TextColor} =useContext(Globals)
        const [Code_ , takeCode] = useState();
        const [Saved,setSave] = useState(false)
        const [copiedIndex , setCopiedIndex ] = useState(null)
        const [Iscopied,setCopied] = useState(false);
        const [IsPublic,SetPublic] = useState(true)
        const [KeyWord,setKeyWord] = useState("")
        const [MassagesFetched,setMessageFetched] = useState(false)
        const [CurrentDate,SetCurrentDate] = useState("")
        const [MembersofRoom,setMembersOfRoom] = useState([])
        const [allUsersPop,changeusrsPop]=useState("translate-y-[-30vh]")
        const [thisRoomAdmin,setRoomAdmin] = useState("")
        const [btm,setBtm] = useState(1)
        const [messagePlaceHolder,setPaceHolder] = useState("Type a message")
        const [moreOptions,setMore] =useState("translate-y-[100px] opacity-0")
        const [connected,setConnectionStatus] = useState(true)
        const [OflineWarning,setOflineWaring] = useState(false)
        const [onlines,addOnlines] = useState(['A','B','C','A','B','C','A','B','C','A','B','C','A','B','C','A','B','C','A','B','C']);
        const months_ = [ "Jan", "Feb", "March", "April",
         "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const Date_Today = `${new Date(Date.now()).getDate()} ${months_[(new Date(Date.now()).getMonth())]} ${new Date(Date.now()).getFullYear()}`
        const Yesterday = `${new Date(Date.now()).getDate()-1} ${months_[(new Date(Date.now()).getMonth())]} ${new Date(Date.now()).getFullYear()}`

        const TheGifFrame = `
        <!DOCTYPE html>
        <html>
            <style>
                body {
                    background-color: rgb(29, 29, 29);
                    display: flex;
                    padding-top : 10px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    overflow: auto;  
                    scrollbar-width: 5px;
                }
                body::-webkit-scrollbar {
                    width: 10px;
                    height: 5px;
                  }
                  body::-webkit-scrollbar-track{
                    background: #f0f0f000;
                  }
                  body::-webkit-scrollbar-thumb {
                    height: 10px;
                    border-radius: 10px;
                    background-color: rgba(0, 0, 0, 0.349); /* Hide the scrollbar thumb */
                  }
                .gif_img {
                    width: 130px;
                    height: fit-content;
                    border-radius: 10px;
                    display: block;
                    transition: all 0.23s;
                }
                .gif_img:hover{
                    cursor: pointer;
                    box-shadow:-1px 3px 20px 0px;
                    scale : 1.01;
                }
                .imho {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    border-radius: 5px;
                }
                .boxio {
                    width: 50vw;
                    height: 10vh;
                    font-size: 3vw;
                    padding-left: 2vw;
                    border: none;
                    border-radius: 50px;
                }
                .boxio:focus {
                    outline: none;
                    border: none;
                }
                .iopp{
                    padding: 3vw;
                    background-color: rgb(255, 213, 0);
                    border: none;
                    font-size: 3vw;
                    border-radius: 50%;
                }
                .iopp:hover{
                    cursor: pointer;
                }
                .inputer{
                    width: 100vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2vw;
                }
            </style>
            <body>
                <div class="inputer">
                    <input class="boxio" type="text" id="searchInput" placeholder="Search GIFs...">
                    <button class="iopp" id="searchButton">Go</button>
                </div>
                <div class="imho"></div>
        
                <script>
                    let searchTerm = "trending"||"popular";
                    // Function to perform the search when the "Go" button is clicked
                    function performSearch() {
                        searchTerm = document.getElementById("searchInput").value || "popular";
                        document.querySelector(".imho").innerHTML=""
                        console.log(searchTerm)
                        if(searchTerm.trim()!==""){
                            grab_data(searchTerm)
                        }
                    }
        
                    // URL Async requesting function
                    function httpGetAsync(theUrl, callback) 
                    {
                        // create the request object
                        var xmlHttp = new XMLHttpRequest();
        
                        // set the state change callback to capture when the response comes in
                        xmlHttp.onreadystatechange = function()
                        {
                            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                            {
                                callback(xmlHttp.responseText);
                            }
                        }
        
                        // open as a GET call, pass in the url and set async = True
                        xmlHttp.open("GET", theUrl, true);
        
                        // call send with no params as they were passed in on the url string
                        xmlHttp.send(null);
        
                        return;
                    }
                    // Callback for the top 8 GIFs of search
                    function tenorCallback_search(responsetext) {
                        // Parse the JSON response
                        var response_objects = JSON.parse(responsetext);
        
                        top_10_gifs = response_objects["results"];
        
                        for(i=0;i<top_10_gifs.length+1;i++){
                            const img = document.querySelector(".imho").innerHTML+='<img class="gif_img" src="'+top_10_gifs[i]["media_formats"]["gif"]["url"]+'" alt="cannot load">'
                        }
                        if (top_10_gifs.length === 0){
                            document.querySelector(".imho").innerHTML = "<p>no results found</p>"
                        }
                        return;
        
                    }
                    // Function to call the search endpoint
                    function grab_data(searchTerm) 
                        {
                        // set the apikey and limit
                        var apikey = "AIzaSyDmx3zTDhjRG9Z6mu-_V1xPlHaDlFI1BmA";
                        var clientkey = "my_test_app";
                        var lmt = 100;
        
                        // using default locale of en_US
                        var search_url = "https://tenor.googleapis.com/v2/search?q=" + searchTerm + "&key=" +
                                apikey +"&client_key=" + clientkey +  "&limit=" + lmt;
        
                        httpGetAsync(search_url,tenorCallback_search);
        
                        // data will be loaded by each call's callback
                        return;
                    }
        
                    // Add an event listener to the "Go" button
                    document.getElementById("searchButton").addEventListener("click", performSearch);
        
                    // Initial data load with "popular" as the default search term
                    grab_data("trending"||"popular");
                </script>
            </body>
        </html>
        
        `
        const [ShowGifFrame,setGifShow] = useState(false)
        const UpdayeIt = (x)=>{
            LocalDataOnNotifications.forEach(local => {
                let MyOp;
                //console.log('loc') 
                if(local['room']===roomID)  {
                    MyOp = { 'room': local['room'], 'length': x };
                    //console.log("current => ",MyOp)
                }
                else{
                    MyOp = local;
                }
                //  console.log(`{'room': ${hold.room}, 'length': ${fetched.length  - hold.length}`)
                    TempUp(MyOp)
                });
            }
        const TempUp = (gh) =>{
            // const MyTemp =[] 
            // LocalDataOnNotifications.forEach(element => {
            //     const myO = MyTemp.find(item => item.room === element.room);
            //     if (myO === undefined) {
            //     MyTemp.push(element);
            //     }
            // });
            // MyTemp.push(gh)
            // console.log(MyTemp)
            if (Temp.length === 0){
                setTemp((x)=>[...x,gh]);
            }
            else{
                const TheFind  = Temp.find(i => i.room === gh.room)
                if(TheFind === undefined){
                    setTemp((x)=>[...x,gh]);
                }
            }
        }
        // useEffect(()=>{
        //     //console.log('Temp',Temp)
        //     console.log("local",LocalDataOnNotifications);
        // },[])

        useEffect(()=>{
            axios.get(URL+'/get_length_of_room',{params:{'room':roomID}})
                .then((res)=>{
                    // console.log(res.data['length']);
                    UpdayeIt(res.data['length']);
                })
                .catch((err)=>{
                    console.log("Error: ",err);
                })
        },[])

        useEffect(()=>{
            opu();
        },[Temp])

        const opu =() =>{
            // console.log('opu called -> ',Temp)
            const MyTemp =[] 
            Temp.forEach(element => {
                const myO = MyTemp.find(item => item.room === element.room);
                if (myO === undefined) {
                    MyTemp.push(element);
                }
            });
            // console.log(MyTemp)
            localStorage.setItem('_Local_Notifications_',JSON.stringify(MyTemp));
            // console.log(localStorage.getItem("_Local_Notifications_"))
            updateLocalnotifiation(MyTemp);
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
                            setMessageFetched(true)
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
            socket.on("disconnect", () => {
                // console.log(`Socket is disconnected.`);
                setConnectionStatus(false)
                setOflineWaring(true)
            });
            socket.on("connect", (socket)=>{
                // console.log(`Socket connected .`,socket)
                setConnectionStatus(true)
                setOflineWaring(false)
            })
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
        const months = [ "Jan", "Feb", "March", "April",
         "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const SendMessage =async () => {
            const hrs = new Date(Date.now()).getHours()
            const format_ = (hrs>12)? "PM" : "AM" ;
            if (!connected){
                console.log("You are ofline.")
                setOflineWaring(true)
            }
            else if(newMessage.trim()!==""){
                const messageINFO = {
                    room : roomID,
                    auther : username,
                    message : newMessage,
                    time : hrs%12 +
                    ':'+ `${new Date(Date.now()).getMinutes()}`+
                    " "+format_+
                    " -> "+new Date(Date.now()).getDate()+
                    " "+months[(new Date(Date.now()).getMonth())]+
                    " "+new Date(Date.now()).getFullYear()
                };
                //console.log(AllMessages.length)

                await socket.emit("send_message",messageINFO)
                //localStorage.setItem("Allmessages",AllMessages.concat(messageINFO))
                UpdateMessages(messageINFO)
                setNewMessage("");
                setSave(false)
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


        const ToCode = () =>{
            changeCode(true)
        }
        const ToChat = ()=>{
            setNewMessage("")
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
        const CopyText = (ind,text) => {
            if (navigator.clipboard) {
                // Disable scroll behavior temporarily
                document.body.style.overflow = 'hidden';
            
                navigator.clipboard.writeText(text)
                .then(() => {
                    console.log('Text copied to clipboard:', text);
                    setCopied(true);
                    setTimeout(() => {
                    setCopied(false);
                    }, 5000);
            
                    // Re-enable scroll behavior
                    document.body.style.overflow = 'auto';
                })
                .catch((error) => {
                    console.error('Failed to copy text to clipboard:', error);
                    // Make sure to re-enable scroll behavior even on error
                    document.body.style.overflow = 'auto';
                });
            }
            setCopied(true)
            setCopiedIndex(ind)
            setTimeout(()=>{
                setCopied(false);
                setCopiedIndex(null);
            },5000
            )
        };   
        const GoBottom = () =>{
            setBtm(btm+1);
        }   
        useEffect(()=>{
            var myDiv = document.getElementById("myDiv");
            var myDiv2 = document.getElementById("myDiv2");
            if (myDiv) {
                myDiv.scrollIntoView({ behavior: "smooth" });
            }
            if (myDiv2) {
                myDiv2.scrollIntoView({ behavior: "smooth" });
            }
        },[,GoBottom])
        
        const Private_ = (x)=>{
            // console.log("Called")
            if(IsPublic){
                SetPublic(false)
                // console.log(x)
                setKeyWord(x)
                // console.log("private")
            }
        }
        useEffect(()=>{
            if(AllMessages !== undefined){
                const MyTemp = AllMessages[0]
                if(MyTemp!==undefined){
                    //console.log(MyTemp.message)
                    if(MyTemp.message.startsWith("[-->private<--]-")){
                        const x =MyTemp.message.replace("[-->private<--]- ","")
                        //console.log(x)
                        Private_(x)
                    }
                }
            }
        },[AllMessages])
        const makePrivate = () =>{
            const P_code = `[-->private<--]- ${username}`;
            setNewMessage(P_code);
            if(newMessage === P_code){
                SendMessage()
            }
        }
        const Caller = () =>{
            makePrivate();
            makePrivate();
        }
        useEffect(()=>{
            if (newMessage===`[-->private<--]- ${username}`){
                SendMessage()
            }
        },[newMessage])
        const URL_domain = (url) =>{
            const parser = document.createElement('a');
            parser.href = url;
            parser.remove();
            return parser.hostname;
        }

        const Change_CurrentDate = (d) => {
            const Date = d.split("->");
            if (Date[1] === undefined) {
              if (CurrentDate !== "") {
                SetCurrentDate("");
              }
            } else {
              if (CurrentDate !== Date[1]) {
                SetCurrentDate(Date[1]);
              }
            }
          };

          const CheckDate = (val) => {
            const Date = val.split("->");
            if (Date[1] === undefined || Date[1] === CurrentDate) {
                return false;
            } else {
                //console.log(CurrentDate , Date[1])
              return true;
            }
          };


            useEffect(() => {
            const uniqueMembers = new Set(MembersofRoom);
            AllMessages.forEach(msg => {
                const usrnme = MembersofRoom.find(nme => nme === msg.auther);
                if (usrnme === undefined) {
                uniqueMembers.add(msg.auther); 
                }
                if(thisRoomAdmin ===""){
                    setRoomAdmin(AllMessages[0].auther)
                }
            });
            const uniqueMembersArray = Array.from(uniqueMembers);
            setMembersOfRoom(uniqueMembersArray);
            }, [AllMessages]);

        useEffect(()=>{
            const me = MembersofRoom.find(nme => nme === username);
            if(me === undefined){
                setMembersOfRoom((x)=>[...x,username])
            }
        },[MembersofRoom])

        const DELETE_MSG = (_id) =>{
            axios.get(URL+'/delete_one_message',{params:{'roomID':roomID,'message_ID':_id}})
            .then((res)=>{
                window.location.href='/chat'
            })
            .catch((err)=>{
                console.log("Error: ",err);
            })
        }

        const DeleteMessage = (id) =>{
            console.log(id)
            // const msg = AllMessages.find(ele => ele._id === id);
            // console.log(msg)
            DELETE_MSG(id)
        }

        const [isHovered, setIsHovered] = useState(false);

        const showHover = () => {
          setIsHovered(true);
        };
      
        const hideHover = () => {
          setIsHovered(false);
        };

    return (
        <>
            <div className={`h-screen w-full  flex flex-col ${OflineWarning && "blur-md"} transition-all duration-500`}>
                <div style={{ color: TextColor }} className={`h-[60px] bg-[#323232] fixed top-0 w-full
                flex justify-between px-10 items-center text-2xl max-sm:text-sm max-sm:px-4 z-[1000]`}>
                    <a className='fixed' href='/o'>
                    <svg className=' fill-slate-50 max-sm:scale-110' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 
                        5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 
                        .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 
                        384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 
                        24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 
                        .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 
                        .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 
                        8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                    </svg>
                    </a>
                    <p className='flex'><span className='text-yellow-500 ml-[70px] max-sm:ml-[35px]'></span><p className='max-sm:text-[18px] max-sm:max-w-[90px] overflow-x-auto'> {roomID}</p></p>
                    <h1 style={{ color: TextColor }} className={`text-3xl `}>Chat</h1>
                    { allUsersPop.length !==0 &&
                        <div className='w-8 h-8 transition-colors
                        rounded-full fill-white hover:bg-[#3e3e3e]
                    flex items-center justify-center' onClick={()=>{changeusrsPop("")}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512">
                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 
                            56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 
                            56 0 1 0 112 0z"/>
                        </svg>
                    </div>
                    }
                    { allUsersPop.length ===0 &&
                        <div className='w-8 h-8 transition-colors
                        rounded-full fill-white hover:bg-[#3e3e3e] rotate-180
                    flex items-center justify-center' onClick={()=>{changeusrsPop("translate-y-[-30vh]")}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" 
                                viewBox="0 0 320 512">
                                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 
                                    11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6
                                    19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                            </svg>
                    </div>
                    }
                </div>
                {/* <div className='w-full h-10 bg-black/60 flex gap-4 items-center px-3 overflow-x-auto scrollable-container'>
                {onlines.map((ele)=>{
                    return(
                        <div className='text-green-500 h-5 px-2 bg-black text-center flex items-center justify-center'>{ele}</div>
                    )
                })}
                </div> */}
                <div className='h-fit w-full BG-IMG flex flex-col bg-black'>

                    
                    <div  className={`flex-1 flex flex-col px-1 gap-4 h-fit overflow-y-auto min-h-[92vh] mt-[65px]
                    ${ IsPublic ? "" : "ml-[7vw] md:ml-[20vw]"
                    }
                    `}>
                    {AllMessages.map((ele,index) => {
                            return (
                            <div>
                                {index===0 && ele.message === `[-->private<--]- ${username}`?
                                (
                                    <div className='w-full h-[40px] flex 
                                    justify-center items-center text-[#a8a8a8] font-semibold text-2xl ml-0
                                    '>
                                        <p className='flex-1'>Private Room</p>
                                        <div className='max-md:w-[15vw] h-4 flex-1'></div>
                                    </div>
                                )
                        :
                        <>
                            {(CheckDate(ele.time) ) && (
                                <div className='w-full text-center text-[#ababab] font-semibold mt-3 mb-3'>
                                {Date_Today === (`${(ele.time.split("->"))[1]}`) === 1 ? 
                                <>
                                {'Today'}
                                </>
                                : 
                                        (Yesterday.localeCompare(`${(ele.time.split("->"))[1]}`) === 1 ?
                                        (ele.time.split("->"))[1]
                                        :
                                        (ele.time.split("->"))[1]
                                        )
                                }
                                </div>
                            )}

                        <>
                        {ele.auther !== username ? (
                            
                            <>
                                {ele.message === `[-->private<--]- ${ele.auther}`?
                                (
                                    <div className='w-full h-[40px] flex
                                    justify-center items-center text-[#989898] font-semibold text-2xl
                                    '>
                                        Private Room</div>
                                )
                                :
                                <>
                            <div key={index} className={`w-fit h-fit px-4 max-w-[60vw]
                                            max-sm:max-w-[80vw] pr-3
                                            bg-[#373737] rounded-lg max-h-[76vh] mb-2 ${ele.message === "--DELETED--" ? " py-1 mt-2 mb-2" : "py-4"}
                                            overflow-x-auto overflow-y-auto  scrollable-container flex  
                                            ${ele.message.endsWith('.gif') && ' bg-black/0 pl-10 py-0'}
                                            
                            `}>
                {(ele.message.startsWith('http'))
                    ? (ele.message.endsWith('.gif')
                        ? <img className=' h-fit flex items-center w-full justify-center
                                                 scale-100 pt-4 max-w-[250px] 
                                                max-sm:w-[180px] rounded-sm'
                        src={ele.message}/>
                        : 
                        <div className='flex w-fit items-center justify-center gap-2'>
                            <div className='w-10 h-10 bg-black/10 rounded-full flex 
                                                items-center justify-center'>
                                <img className='scale-100 pt-4 rounded-md mb-3' 
                                src={`https://${URL_domain(ele.message)}/favicon.ico`} alt='' />
                            </div>
                            <a href={ele.message} target='_blank'>
                                <div className='text-lg text-blue-400 font-light'>{ele.message}</div>
                            </a>
                        </div>
                        )
                    : 
                    (ele.message.startsWith('code ') ? 

                    <> {`${ele.message}`.endsWith("-exe") || `${ele.message}`.endsWith("-exe\n")?
                    <div className=' w-fit  h-fit px-4 py-2
                    bg-black/70 rounded-lg  max-sm:w-fit
                    '>
                        <div className='px-2 py-1 w-fit mb-3 bg-green-600 rounded-md text-white'>Code</div>
                            <pre className={`text-lg text-[#fbaf69] mt-10`}>     
                            <iframe width="100%" className=' rounded-md'
                                height="560px"
                                frameborder="0"
                                srcDoc = {(ele.message.replace('code ',"").replace('-exe',""))}
                            >
                            </iframe>
                            </pre>
                    </div>
                    :
                                    <div className=' w-fit  h-fit px-4 py-2
                                    bg-black/70 rounded-lg  max-sm:w-fit
                                    '>
                                        <div className='px-2 py-1 w-fit mb-3 bg-green-600 rounded-md text-white'>Code</div>
                                            <pre className={`text-lg text-[#fbaf69] mt-10`}>
                                            {ele.message.replace("code ","").startsWith("<blockquote")||ele.message.replace("code ","").startsWith("<iframe")?
                                                    <div dangerouslySetInnerHTML={{ __html: (ele.message.replace('code ',"")) }}></div>
                                                :
                                                (ele.message.replace('code ',''))
                                                }
                                                
                                                </pre>
                                        <div className=' fill-gray-300 text-white mt-4 flex w-full justify-start '>
                                            {(!Iscopied)
                                            ?             
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" 
                                        onClick={()=>CopyText(index,ele.message.replace("code ",""))}
                                        >
                                            <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64
                                            64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121
                                            27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16
                                            16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 
                                            16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 
                                            24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 
                                            24 0 1 0 0-48 24 24 0 1 0 0 48z"/>    
                                        </svg>
                                            :
                                            (index === copiedIndex) ? 
                                                <svg className=' fill-green-500' xmlns="http://www.w3.org/2000/svg"
                                                    height="1em" viewBox="0 0 448 512"><path d="M438.6 
                                                    105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 
                                                    12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 
                                                    0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5
                                                    32.8-12.5 45.3 0z"/>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                    <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64
                                                    64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121
                                                    27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16
                                                    16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 
                                                    16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 
                                                    24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 
                                                    24 0 1 0 0-48 24 24 0 1 0 0 48z"/>    
                                                </svg>
                                            
                                        }
                                        
                                            
                                        </div>
                                    </div>
                        }
                    </>

                    :
                    <>
                        {ele.message === "--DELETED--"?
                            <>
                                <div className={`text-lg w-[50vw] max-sm:hidden text-center text-[#818181]`}
                            >-------- This message has been deleted by {ele.auther} --------</div>
                                <div className={`text w-[50vw] max-sm:w-[80vw] text-sm
                                sm:hidden text-center text-[#818181]`}
                            >-- This message has been deleted --</div>
                            </>
                            :
                            <div style={{ color: TextColor }} className={`text-lg`}>{ele.message}</div>
                        }
                    </>
                )
                    }

                                        
                                </div>
                                    <div className='flex justify-start space-x-5 ml-2'>
                                            <div className='text-sm mt-1 text-gray-500'>{(ele.time.split("->"))[0]}</div>
                                            <div className='text-yellow-600'>~{ele.auther}</div>
                                </div>
                                </>
                            }
                            
                            </>
                                ) : (
                                    <div className='flex w-full'>
                                        <div className='flex-1'></div>
                                        <div className=' w-fit'>
                                        {ele.message !== '--DELETED--'?
                                        <div className= {`fill-white flex mr-5 mb-3 parentDIV bg-white/0 h-5`}>
                                            <div className=' flex w-full'>
                                                <div className='flex-1 hover:opacity-0'></div>
                                            <svg className=' rotate-180 fill-[#919191] hover:opacity-0' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 
                                                0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32
                                                192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                            </svg>
                                            </div>

                                        <div className='flex-1 ChildDiv'></div>
                                        <div onClick={()=>{DeleteMessage(ele._id)}} className='z-0 ChildDiv hover:fill-red-700'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                            <path d="M170.5 51.6L151.5
                                            80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7
                                            3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 
                                            24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3
                                            0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0
                                                177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 
                                                32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 
                                                16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 
                                                8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 
                                                16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 
                                                16-16s16 7.2 16 16z"/>
                                        </svg>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                        }
                                        <div className={`w-fit h-fit px-4 max-w-[60vw]
                                        max-sm:max-w-[80vw] pr-3
                                        bg-[#373737] rounded-lg max-h-[76vh] mb-2 ${ele.message === "--DELETED--" ? " py-1 mt-2 mb-2" : "py-4"}
                                        overflow-x-auto overflow-y-auto  scrollable-container flex w-full  ${ele.message.endsWith('.gif') && ' bg-black/0 pr-10 py-0'}
                                        `}>
                                        {(ele.message.startsWith('http'))
                                            ? (ele.message.endsWith('.gif')
                                                ? <img className=
                                                ' w-full h-fit flex items-center  justify-center scale-100 pt-4 max-w-[250px] max-sm:w-[180px] rounded-sm'
                                                src={ele.message}></img>
                                                : 
                                                <div className='flex w-fit items-center justify-center gap-2'>
                                                    <div className='w-10 h-10 bg-black/10 rounded-full flex items-center justify-center'>
                                                    <img className='scale-100 pt-4 rounded-md mb-3' src={`https://${URL_domain(ele.message)}/favicon.ico`} alt='' />
                                                    </div>
                                                    <a href={ele.message} target='_blank'>
                                                        <div className='text-lg text-blue-400 font-light'>{ele.message}</div>
                                                    </a>
                                                </div>
                                                )
                                            : 
                                            (ele.message.startsWith('code ') ? 

                                            <>
                                            {`${ele.message}`.endsWith("-exe") || `${ele.message}`.endsWith("-exe\n")?
                                                <iframe width="100%" className=' rounded-md'
                                                height="560px"
                                                frameborder="0"
                                                srcDoc = {(ele.message.replace('code ',"").replace('-exe',""))}
                                                >
                                            </iframe>
                                        :
                                            <div className=' w-fit  h-fit px-4 py-2
                                            bg-black/70 rounded-lg  max-sm:w-fit
                                            '>
                                                <div className='px-2 py-1 w-fit mb-3 bg-green-600 rounded-md text-white'>Code</div>
                                                    <pre className={`text-lg text-[#fbaf69]`}>

                                                    {ele.message.replace("code ","").startsWith("<blockquote")||ele.message.replace("code ","").startsWith("<iframe")?
                                                            <div dangerouslySetInnerHTML={{ __html: (ele.message.replace('code ',"")) }}></div>
                                                        :
                                                        (ele.message.replace('code ',''))
                                                        }
                                                        
                                                        </pre>
                                            </div>
                                }
                            </>
                                                

                                                :
                                                <>
                                                {ele.message === "--DELETED--"?
                                                        <>
                                                            <div className={`text-lg w-[50vw] max-sm:hidden text-center text-[#818181]`}
                                                        >-------- This message has been deleted --------</div>
                                                            <div className={` w-[50vw] max-sm:w-[80vw] text-sm
                                                            sm:hidden text-center text-[#818181]`}
                                                        >-- This message has been deleted --</div>
                                                        </>
                                                        :
                                                        <div style={{ color: TextColor }} className={`text-lg`}>{ele.message}</div>
                                                    }
                                            </>
                                            )
                                            
                                        }                      
                                            </div>
                                            <div className='flex space-x-9 justify-end pr-3'>
                                                <div className='text-sm~ mt-1 text-gray-500'>{(ele.time.split("->"))[0]}</div>
                                                    <div className='text-yellow-600'>~{ele.auther}</div>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                    </>
                        </>
                    
                    }
                        
                            </div>);
                    })}
                    <div id='myDiv' className=' mb-[100px]'></div>
                    </div>
                    {/* input box \/ */}
                                {/* (roomID==='Phsdvjbk00' || roomID === 'Welcome') && */}
                        {(!IsPublic && KeyWord !== username)
                        ?
                            <div>
                                <div style={{ color: TextColor }} className='h-[50px] bg-[#1e1e1e] flex justify-center max-sm:text-sm text-center
                                fixed bottom-0 left-0 right-0 items-center gap-4 text-lg'>
                                                    Cannot reply in this room,
                                        This is a private room only the owner can send messages 
                                </div>
                            </div>
                            :
                    (isCode) ? 
                        <>
                        <div className={` h-[40vh] relative  bg-[#1e1e1ec0] flex flex-col  transition-all
                                        items-center rounded-lg justify-center`}>
                            <div className='h-7 w-7 absolute top-3 left-[5vh] hover:bg-[#3b3b3bc0] transition-colors
                            rounded-md text-white font-bold flex items-center justify-center  hover:cursor-pointer'
                            onClick={ToChat}>T</div>
                            {(Saved && newMessage !== "code undefined")?
                                    <div className='absolute top-2 right-[8vw] px-2 py-1 
                                    bg-[#5b5b5b49] text-white rounded-md hover:cursor-pointer
                                    ' onClick={handleSendCode}>send</div>
                                :
                                    <div className='absolute bottom-2 right-[3vw] px-2 py-1 
                                    bg-[#62626249] text-white rounded-md hover:cursor-pointer' onClick={SaveIt}>save</div>
                                }
                                
                                <textarea placeholder='Code starts here... [ Add "-exe" at end of the code to run the HTML/CSS/JS code ]' className='px-3 mt-4 py-2 w-[80vw] 
                                rounded-md h-[30vh] max-h-[30vh]
                                focus:outline-none min-h-[20vh]' value={Code_} onChange={handleCodeTake} />
                            </div>  
                        <div id='myDiv2'></div> 
                        </>  
                    :
                        <div className='h-[70px] bg-[#262626] flex justify-center fixed bottom-3 left-[10vw] right-[10vw] rounded-lg
                                    max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:px-4
                                        items-center gap-4'>
                                            <div className='h-10 w-10 mr-5  rounded-full fill-[#9a9a9a]
                                            flex items-center justify-center  hover:cursor-pointer
                                            hover:bg-[#303030] relative
                                            '
                                            onClick={()=>{
                                                if (moreOptions === "translate-y-[100px] opacity-0"){
                                                    setMore("translate-y-0 opacity-01");
                                                }
                                                else{
                                                    setMore("translate-y-[100px] opacity-0")
                                                }
                                                }
                                            }
                                            >
                                            <svg  className=' rotate-180'
                                            xmlns="http://www.w3.org/2000/svg" height="1em" 
                                                viewBox="0 0 320 512">
                                                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 
                                                    11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6
                                                    19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                            </svg>
                                            <div className={` absolute h-[80px] bottom-[60px] rounded-xl max-sm:left-[20px]
                                                        w-[130px] bg-[#3a3a3a] ${moreOptions} transition-all flex justify-around
                                                        items-center max-sm:w-[100px] max-sm:h-[60px]
                                                        `} 
                                            >
                                                <div className='h-10 w-10 mr-5  rounded-full fill-[#9a9a9a]
                                            flex items-center justify-center  hover:cursor-pointer
                                            hover:bg-[#303030] ml-5 
                                            ' onClick={()=>{
                                                    changeCode(!isCode);
                                                }
                                            }>
                                                    <svg className=' scale-140 ' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
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
                                                <div className='h-10 w-10 mr-5  rounded-full fill-[#9a9a9a]
                                            flex items-center justify-center  hover:cursor-pointer
                                            hover:bg-[#303030] 
                                            ' onClick={()=>{
                                                    setGifShow(!ShowGifFrame);
                                                    setPaceHolder("Drag and drop the gif here...")
                                                    }
                                                }>
                                                    {/* <svg className=' scale-140 ' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                                                        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 
                                                        39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 
                                                        12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 
                                                        45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 
                                                        0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 
                                                        0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 
                                                        45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 
                                                        256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
                                                    </svg> */}
                                                    <p className=' text-sm font-thin text-[#a2a2a2]'>gif</p>
                                                </div>
                                            </div>

                                            </div>
                            <input className='px-3 py-2 w-[60vw] rounded-md 
                                                focus:outline-none' type='text'
                                                placeholder={messagePlaceHolder} 
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
                <div className='fixed top-[30%] left-[40%]
                max-sm:top-[37%]
                rigth-[50%] max-sm:left-[25%]'>
                    {AllMessages.length === 0 ?
                        <>
                        {MassagesFetched ?
                        <div className=' h-[300px] w-[300px] bg-black/70
                            max-sm:h-[200px] max-sm:w-[200px] flex-col gap-5
                            rounded-md flex justify-center items-center p-1
                            shadow-lg active:shadow-sm transition-shadow shadow-[#2c2c2c] relative
                            '
                            >
                            <p className=' text-white font-semibold text-center'>Make This a Private room Room</p>
                            <p className=' text-[#ffbe57] text-center'>You cannot change it later if first message is sent</p>
                            <div onClick={Caller} className=' bg-green-600 px-2 py-1 rounded-md text-white font-semibold'>Make</div>
                        </div>
                        : 
                        <div className='fixed top-[40%] left-[47%]
                                    max-sm:top-[42%] flex flex-col gap-4 text-white
                                    rigth-[50%] max-sm:left-[43%]'>
                            <l-infinity
                                size="55"
                                stroke="4"
                                stroke-length="0.15"
                                bg-opacity="0.1"
                                speed="1.3" 
                                color="white" 
                            ></l-infinity>
                            fetching...
                        </div>
                        }
                            
                        </>
                    :
                    <></>
                }
                </div>
                
            <div className={`fixed top-[60px] max-sm:w-full right-0 scrollable-container
            w-[25vw] bg-[#424243] h-[30vh] text-white transition-all 
            rounded-b-lg flex flex-col items-center gap-3 py-5 overflow-y-auto
            ${allUsersPop}`}>
                <div>
                    {
                        connected?
                        <p className=' text-green-600'>Online</p>
                        :
                        <p className=' text-red-500'>Ofline</p>
                    }
                </div>
                {
                    MembersofRoom.map(ele=>{
                        return(
                            <>
                            {ele === thisRoomAdmin ?
                            <div className={`w-[70%] px-4 py-2 rounded-[10px] ${ele===username?  (connected ? "text-green-600" : "text-red-500") : ""}
                                font-semibold bg-[#2c2c2c] flex justify-between`}>
                                {ele}
                                <span className=' font-light text-yellow-600'>~ Admin</span>
                            </div>
                            :
                            (ele === username ? 
                                <div className={`w-[70%] px-4 py-2 rounded-[10px]
                                ${(connected ? "text-green-600" : "text-red-500")}
                                    font-semibold bg-[#2c2c2c] flex justify-between`}>
                                        {ele}
                                        <span className=' font-light text-yellow-600'>~ me</span>
                            </div>:
                                <div className='w-[70%] px-4 py-2 rounded-[10px]
                                        font-semibold bg-[#2c2c2c]'>
                                        {ele}
                                </div>
                            )
                            }
                            </>
                        )
                    })
                }
            </div>
                {!isCode && <div onClick={GoBottom} className=' fixed h-[50px] w-[50px] bottom-5
                bg-[#5c5c5c] 
                right-4 flex items-center justify-center opacity-60 max-sm:hidden
                rounded-full bg-[#6060 0] fill-white'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                    <path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5
                    12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 
                    224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 
                    329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/>
                </svg>
                </div>}
                {ShowGifFrame &&
                <div className='fixed bottom-[100px]
                    max-sm:left-[0vw]
                    left-[30vw] rounded-lg'>
                <div className='
                text-white z-[1000] scale-90
                    absolute right-5 max-sm:scale-75
                    max-sm:right-[33px] max-sm:top-5
                    p-2  rounded-full hover:bg-[#292828]
                '
                onClick={()=>{
                        setGifShow(!ShowGifFrame);
                        setPaceHolder("Type a message")
                    }
                }
                >
                    <svg className=' fill-white' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1
                        4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9
                            7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8
                            9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1
                            4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                    </svg>

                </div>
                    <iframe className=' rounded-md scrollable-container max-sm:scale-90'
                        height="300px"
                        width="350px"
                        frameborder="0"
                        srcDoc = {TheGifFrame}
                    >
                    </iframe>
                </div>
                }
            </div>

            <div className={` fixed top-0 left-0 right-0 bottom-0 flex justify-center
                                        max-sm:top-[20vh]  transition-all duration-500 sm:pt-[150px]
                                        ${!connected && OflineWarning ? "translate-y-0 opacity-1 scale-100":" translate-y-[-40vh] scale-0 opacity-25"}
                            `} >
                    <div className='max-md:w-[50vw] w-[40vw] h-[30vh] bg-[#1b1b1b]
                                     relative shadow-xl hover:shadow-sm transition-shadow duration-300
                                        rounded-xl max-sm:w-[70vw] max-sm:h-[20vh]'>
                            <div className=' absolute right-3 top-3 active:rotate-180
                            active:scale-125 transition-all duration-200' onClick={()=>{setOflineWaring(false)}}  >
                                <svg className=' fill-white' xmlns="http://www.w3.org/2000/svg"
                                    height="1em" viewBox="0 0 384 512">
                                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1
                                    4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9
                                        7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8
                                        9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1
                                        4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                                </svg>
                            </div>
                            <div className=' pt-5 max-sm:gap-3 gap-5 flex flex-col justify-center 
                                            items-center text-white'>
                                <h1 className='max-sm:text-3xl text-5xl'>
                                    {!connected ? "Warning !":"Connected"}
                                </h1>
                                <p className='text-[#ff8787]'>Ofline</p>
                                <p className='max-sm:text-sm  text-[#a6a6a6] text-center'> Pleaase check your internet connection  </p>
                                <p className=' max-sm:hidden'>Connection failed</p>
                            </div>
                    </div>
                </div>
        </>
    )
    }

    export default Chat;

