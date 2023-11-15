import React, { useContext, useState } from 'react'
import { Globals } from '../globals/Globals';
import axios from 'axios';
import { RaceBy } from '@uiball/loaders'


const Login = () => {
    const {URL} = useContext(Globals)
    const [userName,setusername] = useState('');
    const [Password,setPassword] = useState('');
    const [Email,SetEmail] = useState('');
    const [flasher,setFlasher] = useState('')
    const [action,setAction] = useState('login');
    const [doBuffer,setBuffer] = useState(false)
    const [PawdType,setPswdType] = useState('password')
    const handleUserName = (e)=>{
        setusername(e.target.value);
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }
    const handleEmail = (e) =>{
        SetEmail(e.target.value);
    }
    const sendDATA_signup = () =>{
        if(userName.length>3 && Password.length>=5 && Email.length>5){
                    setBuffer(true);
                    const Data_Obj = {
                        'username':userName,
                        'password':Password,
                        'mail':Email
                    }
                    axios.get(`${URL}/signup`,{params:Data_Obj})
                        .then((res)=>{
                            setBuffer(false)
                            setFlasher("User Created")
                            console.log(res.data)
                            setTimeout(()=>setAction('signin'),1000)
                        })
                        .catch((err)=>{
                            setBuffer(false)
                            setFlasher("username or mail address already exists.")
                            setTimeout(()=>setFlasher(),1000)
                            setPassword("")
                            setusername("")
                            SetEmail("")
                            console.log("Error",err)
                        })
                
                }
                else{
                    setFlasher("Length of credentials not met");
                    setTimeout(()=>setFlasher(''),1500);
                }
        }
    const sendLogin=()=>{
        const Data_Obj = {
            'username':userName,
            'password':Password
        }
        setBuffer(true)
        if(userName.length>3 && Password.length>=5){
            axios.get(`${URL}/login`,{params:Data_Obj})
                .then((res)=>{
                    console.log(res.data)
                    setFlasher('Login Successful !')
                    localStorage.setItem('username',userName)
                    console.log(localStorage.getItem('username'));
                    localStorage.setItem('ISloggedIN',true);
                    window.location.href='/';
                    setBuffer(false)
                })
                .catch((err)=>{
                    setBuffer(false)
                    setFlasher("Invalied credentials !")
                    setTimeout(()=>setFlasher(''),1000)
                    setPassword('');
                })
            }
            else{
                setFlasher("Length of credentials not met");
                setTimeout(()=>setFlasher(''),1500);
            }
    }
    const toSignUp =()=>{
        setAction('signup');
    }
    const tosignin =()=>{
        setAction('login')
    }
    const handleKeyDown = (event)=>{
        if(event.key === 'Enter'){
            sendDATA_signup();
        }
    }
    const handleKeyDown_1 = (event)=>{
        if(event.key === 'Enter'){
            sendLogin();
        }
    }

    const ShowPswd = () =>{
        setPswdType('text');
        setTimeout(()=>{
            ClosePswd();
        },800)
    }
    const ClosePswd = () =>{
        setPswdType('password');
    }
  return (

    <>
        <div className='flex w-full h-screen justify-center items-center max-sm:pb-[100px] 
                                max-md:pb-[100px] max-lg:pb-[100px] bg-[#201a28]'>
            {action === 'signup'?
            <div className="h-[50vh] w-[30vw] bg-black/50 relative max-sm:w-[80vw]
                    max-lg:w-[60vw] 
                rounded-md flex flex-col p-5 space-y-7">
            <h1 className='text-white text-2xl text-center'>GET Signed Up</h1>
            <input className='h-10 pl-4 focus:outline-none rounded-md' 
                        value={userName} placeholder='Your name..' 
                        onChange={handleUserName}/>
            <div className=' flex flex-row relative justify-center items-center'>
            <input type={PawdType} className='h-10 pl-4 flex-1 focus:outline-none rounded-md' 
                        value={Password} placeholder='Password'
                        onChange={handlePassword}/>
                        <div className=' fill-[#4e4e4e] hover:cursor-pointer absolute right-6'>
                            {
                                PawdType === 'text' ?
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 
                                    226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 
                                    432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 
                                    256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 
                                    80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 
                                    80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9
                                     35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 
                                     480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 
                                     268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 
                                     112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 
                                     0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 
                                     0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 
                                     128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                                </svg>
                                :
                                <svg onClick={ShowPswd} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 
                                    192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7
                                     64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3
                                      28.7-64 64-64H80z"/>'
                                </svg>
                            }
                        </div>
            </div>
            <input className='h-10 pl-4 focus:outline-none rounded-md' 
                        value={Email} placeholder='abc@gmail.com'
                        onChange={handleEmail} onKeyDown={handleKeyDown}/>
                        
            <p className='text-center mr-10 text-yellow-400'>{flasher}</p>
           {doBuffer? <div className='w-full flex justify-center mr-4'><RaceBy 
                                                size={80}
                                                lineWeight={5}
                                                speed={1.4} 
                                                color="white" 
                                                /></div>:
         <div></div>}
            <button className='px-4 py-2 bg-green-500 w-[100px] 
                        absolute bottom-10 right-6 rounded-md 
                        hover:bg-green-600 transition-all
                        active:bg-green-200
                        active:text-green-800'
            onClick={sendDATA_signup} >
                Continue</button>

                <div className='h-fit w-[320px] bg-white fixed
                            bottom-9 right-7 rounded-xl px-3 py-5
                            overflow-hidden hover:cursor-pointer
                            max-sm:w-[200px] max-sm:w-[85vw]  max-sm:h-[25vh] max-sm:text-sm max-sm:max-w-[400px]
                    '>
                    <div className='flex flex-col space-y-3' >
                        <p className=' text-center text-lg font-semibold text-green-300'>TOOL TIPS</p>
                        <li><span className='t text-green-600'>STEP 1 : </span>Username should be unique</li>
                        <li><span className='t text-green-600'>STEP 2 : </span>Please use a strong password</li>
                        <li><span className='t text-green-600'>STEP 3 : </span>Mail address should be unique</li>
                    </div>
                </div>
            </div>
        :
                <div className="h-[40vh] w-[30vw] bg-black/30 relative max-sm:w-[80vw]
                            max-lg:w-[60vw] 
                        rounded-md flex flex-col p-5 space-y-7">
                    <h1 className='text-white text-2xl text-center'>GET Logged IN</h1>
                    <input className='h-10 pl-4 focus:outline-none rounded-md' 
                                value={userName} placeholder='Your name..' 
                                onChange={handleUserName}/>
                    <div className=' flex flex-row relative justify-center items-center'>
            <input type={PawdType} className='h-10 pl-4 flex-1 focus:outline-none rounded-md' 
                        value={Password} placeholder='Password'
                        onChange={handlePassword} onKeyDown={handleKeyDown_1}/>
                        <div className=' fill-[#4e4e4e] hover:cursor-pointer absolute right-6'>
                            {
                                PawdType === 'text' ?
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 
                                    226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 
                                    432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 
                                    256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 
                                    80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 
                                    80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9
                                     35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 
                                     480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 
                                     268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 
                                     112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 
                                     0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 
                                     0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 
                                     128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                                </svg>
                                :
                                <svg onClick={ShowPswd} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 
                                    192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7
                                     64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3
                                      28.7-64 64-64H80z"/>'
                                </svg>
                            }
                        </div>
            </div>
                    <p className='text-center mr-10 text-yellow-400'>{flasher}</p>
                    {doBuffer? <div className='w-full flex justify-center mr-4'><RaceBy 
                                                        size={80}
                                                        lineWeight={5}
                                                        speed={1.4} 
                                                        color="white" 
                                                        /></div>: <div></div>}
                    <button className='px-4 py-2 bg-green-500 w-[100px] 
                                absolute bottom-10 right-6 rounded-md 
                                hover:bg-green-600 transition-all
                                active:bg-green-200
                                active:text-green-800'
                    onClick={sendLogin} >
                        Start</button>

                <div className='h-fit w-[320px] bg-white fixed
                            bottom-9 right-7 rounded-xl px-3 py-5
                            overflow-hidden hover:cursor-pointer
                            max-sm:w-[200px] max-sm:w-[85vw]  max-sm:h-[25vh] max-sm:text-sm max-sm:max-w-[400px]
                    '>
                    <div className='flex flex-col space-y-3' >
                        <p className=' text-center text-lg font-semibold text-green-300'>TOOL TIPS</p>
                        <li><span className='t text-green-600'>STEP 1 : </span>Enter your username</li>
                        <li><span className='t text-green-600'>STEP 2 : </span>Enter your Password </li>
                    </div>
                </div>
        </div>
                }

        {action === 'signup' ?
        <div onClick={tosignin} className='fixed top-8 right-5 text-lg hover:cursor-pointer text-[#71ff42]'>Have an account ?</div>
        :
        <div onClick={toSignUp} className='fixed top-8 right-5 text-lg hover:cursor-pointer  text-[#ffe345]'>Create an account ?</div>
        }

        </div>
    </>
  )
}

export default Login