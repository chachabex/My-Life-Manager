import React, {createContext, useContext, useState} from 'react'
const TabsCtx = createContext(null)
export function Tabs({value, onValueChange, children}){
  const [val, setVal] = useState(value)
  const change = (v)=>{ setVal(v); onValueChange?.(v) }
  return <TabsCtx.Provider value={{val, change}}>{children}</TabsCtx.Provider>
}
export function TabsList({children, className=''}){ return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div> }
export function TabsTrigger({value, children, className=''}){
  const ctx = useContext(TabsCtx)
  const active = ctx?.val===value
  return <button onClick={()=>ctx.change(value)} className={`btn ${active?'bg-gray-900 text-white':''} ${className}`}>{children}</button>
}
export function TabsContent({value, children}){
  const ctx = useContext(TabsCtx)
  if(ctx?.val!==value) return null
  return <div>{children}</div>
}