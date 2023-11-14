import React, { useContext, useState } from 'react'
import { Globals } from '../globals/Globals';
import axios from 'axios';
import { RaceBy } from '@uiball/loaders'


const Login = () => {
    const {URL} = useContext(Globals)
    const {username,setUsername} = useContext(Globals)
    const [userName,setusername] = useState('');
    const [Password,setPassword] = useState('');
    const [Email,SetEmail] = useState('');
    const [flasher,setFlasher] = useState('')
    const [action,setAction] = useState('login');
    const [doBuffer,setBuffer] = useState(false)
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
  return (

    <>
        <div className='flex w-full h-screen justify-center items-center max-sm:pb-[100px] 
                                max-md:pb-[100px] max-lg:pb-[100px] bg-black/50'>
            {action === 'signup'?
            <div className="h-[50vh] w-[30vw] bg-black/30 relative max-sm:w-[80vw]
                    max-lg:w-[60vw] 
                rounded-md flex flex-col p-5 space-y-7">
            <h1 className='text-white text-2xl text-center'>GET Signed Up</h1>
            <input className='h-10 pl-4 focus:outline-none rounded-md' 
                        value={userName} placeholder='Your name..' 
                        onChange={handleUserName}/>
            <input type='password' className='h-10 pl-4 focus:outline-none rounded-md' 
                        value={Password} placeholder='Password'
                        onChange={handlePassword}/>
            <input className='h-10 pl-4 focus:outline-none rounded-md' 
                        value={Email} placeholder='abc@gmail.com'
                        onChange={handleEmail}/>
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
                    <input type='password' className='h-10 pl-4 focus:outline-none rounded-md' 
                                value={Password} placeholder='Password'
                                onChange={handlePassword}/>
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