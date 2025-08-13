import React,{useEffect,useState} from 'react'
import { Button } from './ui/button.jsx'
import { Card } from './ui/card.jsx'

const LS_KEY='LIFE_OS_CHACHA'
const todayISO=()=>new Date().toISOString().slice(0,10)

export default function LifeOS(){
  const [data,setData]=useState(()=>{try{const raw=localStorage.getItem(LS_KEY);return raw?JSON.parse(raw):{profile:{name:'Chacha'}, agenda:{today:todayISO(),tasks:[]}}}catch(e){return {profile:{name:'Chacha'}, agenda:{today:todayISO(),tasks:[]}}}})
  useEffect(()=>{localStorage.setItem(LS_KEY, JSON.stringify(data))},[data])
  return (<div className='space-y-4'>
    <div className='flex items-center justify-between'>
      <h1 className='text-2xl md:text-3xl font-bold'>My Life Manager – {data.profile.name}</h1>
      <div className='flex gap-2'>
        <Button onClick={()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`my-life-manager-${todayISO()}.json`;a.click();URL.revokeObjectURL(url)}}>Exporter</Button>
        <Button onClick={()=>{const i=document.createElement('input');i.type='file';i.accept='application/json';i.onchange=(e)=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);localStorage.setItem(LS_KEY,JSON.stringify(j));location.reload()}catch(_){alert('Fichier invalide')}};r.readAsText(f)};i.click()}}>Importer</Button>
      </div>
    </div>
    <Card>Bienvenue Chacha 🫶 Ton app est en ligne. Ajoute tes modules petit à petit. (La PWA est déjà prête : menu → « Ajouter à l'écran d'accueil »)</Card>
  </div>)
}
