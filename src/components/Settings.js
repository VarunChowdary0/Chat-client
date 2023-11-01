import React, { useCallback, useContext } from 'react'
import { Globals } from '../globals/Globals';

const Settings = () => {
    const {ToggleSettings} =useContext(Globals);
    const {BgColor,setBgColor} =useContext(Globals)
    const {TextColor,setTextColor} =useContext(Globals)
    const HandleSetting = () =>{
        ToggleSettings(false);
    } 
    console.log(BgColor)
    const handleBgInput =(event) =>{
        setBgColor(event.target.value)
        localStorage.setItem('bgCol',event.target.value)
    }
    const handleTextInput =(event) =>{
        setTextColor(event.target.value)
        localStorage.setItem('TxtCol',event.target.value)
    }
  return (
    <div style={{ backgroundColor: BgColor }} className={` z-[1000] fixed top-0 bottom-0  left-0 right-0`}>
        <div className='fixed top-12 right-6 active:rotate-[-90deg] fill-white scale-125 transition-all' onClick={()=>HandleSetting()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path
            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 
            4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 
            70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 
            45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 
            15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
            </svg>
        </div>
        <div className=' pt-3 pl-4'>
            <h1 style={{ color: TextColor }} className={`text-3xl`}>Settings</h1>
        </div>
        <div className=' pt-9 pl-4 flex flex-col gap-4 text-white '>
            <div className=' flex gap-6 p-5 bg-black/50 w-[70%] justify-around rounded-md text-xl'>
                <p>Background color</p>
                <input className=' rounded-full h-8 w-8' value={BgColor} onChange={handleBgInput} type='color'/>
            </div>
            <div className=' flex gap-6 p-5 bg-black/50 w-[70%] justify-around rounded-md text-xl'>
                <p>Text color</p>
                <input className=' rounded-full h-8 w-8' value={TextColor} onChange={handleTextInput} type='color'/>
            </div>
        </div>
    </div>
  )
}

export default Settings