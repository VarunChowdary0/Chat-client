import React, {  useContext, useState } from 'react'
import { Globals } from '../globals/Globals';

const Settings = () => {
    const {ToggleSettings} =useContext(Globals);
    const {BgColor,setBgColor} =useContext(Globals)
    const {TextColor,setTextColor} =useContext(Globals)
    const {colorSaturation,setColorSaturation} = useContext(Globals);
    const {CurrentButtonColor,setCurrentButtonColor} = useContext(Globals);
    const Colors = ['green','teal','orange','rose','yellow','purple','blue']
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
    
    const handleTheSaturationPlus =() =>{
        if ( colorSaturation < 800){
            setColorSaturation(colorSaturation+100)
            localStorage.setItem('ColorSaturation',colorSaturation+100)
        }
    }
    const handleTheSaturationMinus =() =>{
        if (colorSaturation > 300 ){
            setColorSaturation(colorSaturation-100)
            localStorage.setItem('ColorSaturation',colorSaturation-100)

        }
    }

    const HandleChangeInColor = (col) =>{
        setCurrentButtonColor(col);
        localStorage.setItem('TheButtonColor',col);
    }

  return (
    <div style={{ backgroundColor: BgColor }} className={` z-[1000]
    fixed top-0 bottom-0  left-0 right-0`}>
        <div className='fixed top-12 right-6 active:rotate-[-90deg]
         fill-white scale-125 
        transition-all' onClick={()=>HandleSetting()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em"
             viewBox="0 0 384 512"><path
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
            <div className=' flex gap-6 p-5 bg-black/50 w-[70%] max-sm:w-[90%]
            justify-around rounded-md text-xl max-sm:text-lg'>
                <p>Background color</p>
                <input className=' rounded-full h-8 w-8' value={BgColor}
                 onChange={handleBgInput} type='color'/>
            </div>
            <div className=' flex gap-6 p-5 bg-black/50 w-[70%] max-sm:w-[90%]
             justify-around rounded-md text-xl max-sm:text-lg'>
                <p>Text color</p>
                <input className=' rounded-full h-8 w-8' value={TextColor}
                 onChange={handleTextInput} type='color'/>
            </div>
            <div className=' flex gap-6 p-5 bg-black/50 max-sm:w-[90%]
            w-[70%] max-sm:text-center max-sm:text-lg
             justify-around rounded-md text-xl max-sm: flex-col'>
                <div className=' flex justify-around'>
                    <p>Button color</p>
                    <div className=' flex gap-3 items-center justify-center'>
                    <div onClick={handleTheSaturationMinus} className=' hover:scale-125 hover:cursor-pointer
                                                 active:scale-100 transition-all fill-yellow-600'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 
                                                        0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 
                                                        14.3 32 32z"/>
                                                    </svg>
                        </div>
                        <div>{colorSaturation}</div>
                        <div onClick={handleTheSaturationPlus} className=' hover:scale-125 hover:cursor-pointer
                                                 active:scale-100 transition-all fill-yellow-600'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32
                                                         32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32
                                                          32H192V432c0 17.7 14.3 32 32 32s32-14.3
                                                           32-32V288H400c17.7 0 32-14.3 
                                                           32-32s-14.3-32-32-32H256V80z"/>
                                                    </svg>
                        </div>
                        
                    </div>
                </div>
                <div className=' flex flex-row gap-4 flex-wrap 
                                items-center justify-center'>
                        {
                            Colors.map((col)=>{
                                return (
                                    <div onClick={()=>{HandleChangeInColor(col)}} className={` 
                                    flex justify-center items-center  hover:scale-110 transition-all duration-150 active:scale-75
                                        w-10 h-10 rounded-xl bg-${col}-${colorSaturation}`}>
                                        {col === CurrentButtonColor &&
                                            <svg className=' fill-[#ffffff]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 
                                                256c-12.5 12.5-32.8 12.5-45.3 
                                                0l-128-128c-12.5-12.5-12.5-32.8
                                                0-45.3s32.8-12.5 45.3 0L160 338.7 
                                                393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                            </svg>
                                        }
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings