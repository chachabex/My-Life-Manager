import React,{createContext,useContext,useState} from 'react'
const C=createContext(null)
export function Tabs({value,onValueChange,children}){const [v,setV]=useState(value);const ch=(x)=>{setV(x);onValueChange?.(x)};return <C.Provider value={{v,ch}}>{children}</C.Provider>}
export function TabsList({children,className=''}){return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>}
export function TabsTrigger({value,children,className=''}){const c=useContext(C);const a=c?.v===value;return <button onClick={()=>c.ch(value)} className={`btn ${a?'bg-gray-900 text-white':''} ${className}`}>{children}</button>}
export function TabsContent({value,children}){const c=useContext(C);if(c?.v!==value) return null;return <div>{children}</div>}