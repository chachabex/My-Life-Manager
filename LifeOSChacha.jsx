import React, { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button.jsx'
import { Card } from './ui/card.jsx'
import { Input } from './ui/input.jsx'
import { Textarea } from './ui/textarea.jsx'
import { Progress } from './ui/progress.jsx'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs.jsx'
import { NativeSelect } from './ui/select.jsx'
import { Switch } from './ui/switch.jsx'
import { Label } from './ui/label.jsx'
import { Calendar, CheckCircle2, Clock, Notebook, Rocket, Shield, Truck, Wallet, Wrench } from 'lucide-react'

const LS_KEY = 'LIFE_OS_CHACHA'
const todayISO = () => new Date().toISOString().slice(0, 10)
const dmy = (d) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
const clamp = (v, a=0, b=100) => Math.max(a, Math.min(b, v))

const initialData = {
  profile: { name: 'Chacha', timezone: 'Europe/Paris' },
  inbox: [
    { id: crypto.randomUUID(), text: \"Appeler l'auto-école pour planning des leçons\", done: false },
    { id: crypto.randomUUID(), text: \"Lister les papiers pour le dossier ADIE\", done: false },
    { id: crypto.randomUUID(), text: \"45 min de tri jouets/chambre enfants\", done: false },
  ],
  routines: {
    morning: [
      { id: crypto.randomUUID(), label: \"Hydratation – 2 grands verres d'eau\", done: false },
      { id: crypto.randomUUID(), label: \"Prière/respiration 5 min\", done: false },
      { id: crypto.randomUUID(), label: \"Check planning du jour 3 min\", done: false },
    ],
    evening: [
      { id: crypto.randomUUID(), label: \"Journal 5 min (gratitude + humeur)\", done: false },
      { id: crypto.randomUUID(), label: \"Préparer sacs & tenues pour demain\", done: false },
      { id: crypto.randomUUID(), label: \"Cuisine rapide + vaisselle 10 min\", done: false },
    ],
  },
  agenda: {
    today: todayISO(),
    tasks: [
      { id: crypto.randomUUID(), date: todayISO(), title: 'Étudier le Code (série 1 – 40 questions)', cat: 'Permis', done: false },
      { id: crypto.randomUUID(), date: todayISO(), title: \"1h bloc business – page d\\'accueil Satin Bliss\", cat: 'Business', done: false },
      { id: crypto.randomUUID(), date: todayISO(), title: '15 min – plan sécurité (contacts & cache-mot)', cat: 'Sécurité', done: false },
    ],
  },
  journal: {
    entries: [
      { id: crypto.randomUUID(), date: todayISO(), mood: '😌', gratitude: 'Un moment calme ce matin', wins: 'J\\'ai listé mes priorités', focus: 'Permis + Business', note: 'Je peux y arriver, étape par étape.' },
    ],
  },
  separation: {
    safetyChecklist: [
      { id: crypto.randomUUID(), label: 'Créer un mot-code secret avec une amie pour signal de détresse', done: false },
      { id: crypto.randomUUID(), label: 'Préparer une pochette documents (CNI, carte vitale, livret de famille)', done: false },
      { id: crypto.randomUUID(), label: 'Lister contacts sûrs + adresses de repli', done: false },
      { id: crypto.randomUUID(), label: 'Sauvegarder preuves (messages, photos) dans un lieu sûr', done: false },
      { id: crypto.randomUUID(), label: 'Numéros utiles (3919, 17) visibles et mémorisés', done: false },
    ],
    goals: [
      { id: crypto.randomUUID(), label: 'Fixer une date de rendez-vous avec assistante sociale/CIDFF', done: false },
      { id: crypto.randomUUID(), label: 'Ouvrir/contrôler un compte bancaire personnel sécurisé', done: false },
    ],
    resources: [
      { id: crypto.randomUUID(), title: 'Urgences: 17 / 112 – Violences', note: 'Appel discret si nécessaire.' },
      { id: crypto.randomUUID(), title: '3919 – Violences Femmes Info', note: 'Anonyme, gratuit, 24/7.' },
      { id: crypto.randomUUID(), title: 'CIDFF local', note: 'Conseil juridique & accompagnement.' },
    ],
  },
  permis: {
    targetExamDate: '2025-09-20',
    codeStudy: {
      targetHours: 20,
      doneHours: 2,
      sessions: [ { id: crypto.randomUUID(), date: todayISO(), minutes: 30, note: 'Série thèmes signalisation' } ],
    },
    drivingLessons: {
      targetHours: 20,
      doneHours: 0,
      sessions: [],
    },
    tasks: [
      { id: crypto.randomUUID(), label: 'Comparer 3 auto-écoles (prix, délais, paiement en plusieurs fois)', done: false },
      { id: crypto.randomUUID(), label: 'Planifier 3 sessions Code/semaine (lun-mer-sam)', done: false },
      { id: crypto.randomUUID(), label: 'Constituer dossier inscription (photo e-photos, carte d\\'identité, ASSR si dispo)', done: false },
    ],
    budget: { estCost: 1400, saved: 150 },
  },
  car: {
    needBy: '2025-10-15',
    criteria: { gearbox: 'Auto', doors: 5, seats: 5, budget: 3000, yearMin: 2008, kmMax: 180000 },
    checklist: [
      { id: crypto.randomUUID(), label: 'Contrôle CT < 6 mois, contre-visite?', done: false },
      { id: crypto.randomUUID(), label: 'Carnet d\\'entretien / factures dispo', done: false },
      { id: crypto.randomUUID(), label: 'Pas de voyant moteur/airbag allumé', done: false },
      { id: crypto.randomUUID(), label: 'Boîte auto fluide (pas d\\'à-coups)', done: false },
    ],
    ads: [],
  },
  business: {
    deadline: '2025-09-05',
    milestones: [
      { id: crypto.randomUUID(), label: 'Finaliser page d\\'accueil claire & rassurante (Satin Bliss)', done: false },
      { id: crypto.randomUUID(), label: 'Mettre en ligne 3 fiches produits avec mini descriptions identiques par collection', done: false },
      { id: crypto.randomUUID(), label: 'Sections légales simplifiées (CGV, Confidentialité, Mentions, Livraison & retours, Contact)', done: false },
      { id: crypto.randomUUID(), label: 'Connexion domaine ok + test commandes', done: false },
    ],
  },
  home: {
    weeklyPlan: [
      { id: crypto.randomUUID(), day: 'Lundi', task: 'Salle de bain + serviettes' },
      { id: crypto.randomUUID(), day: 'Mardi', task: 'Cuisine + frigo (10 min reset)' },
      { id: crypto.randomUUID(), day: 'Mercredi', task: 'Chambres enfants – tri rapide' },
      { id: crypto.randomUUID(), day: 'Jeudi', task: 'Sol & poussière 20 min' },
      { id: crypto.randomUUID(), day: 'Vendredi', task: 'Linge + pliage 30 min' },
      { id: crypto.randomUUID(), day: 'Samedi', task: 'Courses + batch cuisine' },
      { id: crypto.randomUUID(), day: 'Dimanche', task: 'Repos + préparation semaine' },
    ],
    supplies: ['Sacs poubelle', 'Lingettes bébé', 'Lessive', 'Éponge'],
  },
  budget: {
    monthlyIncome: 0,
    monthlyFixed: [ { id: crypto.randomUUID(), label: 'Loyer', amount: 0 }, { id: crypto.randomUUID(), label: 'Énergie', amount: 0 } ],
    monthlyGoals: [
      { id: crypto.randomUUID(), label: 'Épargne permis', target: 200, saved: 30 },
      { id: crypto.randomUUID(), label: 'Épargne voiture', target: 800, saved: 50 },
      { id: crypto.randomUUID(), label: 'Lancement boutique', target: 150, saved: 0 },
    ],
  },
}

function useLocalState(){
  const [data, setData] = useState(()=>{
    try{
      const raw = localStorage.getItem(LS_KEY)
      return raw ? JSON.parse(raw) : initialData
    }catch(e){ return initialData }
  })
  useEffect(()=>{ localStorage.setItem(LS_KEY, JSON.stringify(data)) }, [data])
  return [data, setData]
}

const Chip = ({label}) => <span className="badge">{label}</span>
const Row = ({children}) => <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>

function PercentBar({value}){ return <Progress value={Math.max(0,Math.min(100,value||0))} className="h-2" /> }
function daysUntil(date){
  const ms = new Date(date).getTime() - new Date().setHours(0,0,0,0);
  return Math.max(0, Math.ceil(ms / (1000*60*60*24)));
}
function progressHours(block){
  const pct = (block.doneHours / Math.max(1, block.targetHours)) * 100;
  return Math.round(Math.max(0, Math.min(100, pct)));
}

function Section({ title, icon: Icon, children, right }){
  return (
    <Card>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {right}
      </div>
      {children}
    </Card>
  )
}

function Inbox({data,setData}){
  const [val,setVal]=useState('')
  return (
    <div className="space-y-2">
      {data.inbox.map((it,i)=>(
        <div key={it.id} className="flex items-center gap-2">
          <input type="checkbox" checked={it.done} onChange={()=>{
            const inbox=[...data.inbox]; inbox[i].done=!inbox[i].done; setData({...data,inbox})
          }} />
          <span className={it.done?'line-through text-gray-400':''}>{it.text}</span>
          <button onClick={()=>{ const inbox=[...data.inbox]; inbox.splice(i,1); setData({...data,inbox})}} className="ml-auto opacity-70 hover:opacity-100">✕</button>
        </div>
      ))}
      <div className="flex gap-2 pt-2">
        <Input placeholder="Ajouter une idée/à faire" value={val} onChange={e=>setVal(e.target.value)} />
        <Button onClick={()=>{ if(!val.trim()) return; setData({...data, inbox:[...data.inbox,{id:crypto.randomUUID(),text:val.trim(),done:false}]}); setVal('') }}>Ajouter</Button>
      </div>
    </div>
  )
}

function Today({data,setData}){
  const tasksToday = data.agenda.tasks.filter(t=>t.date===data.agenda.today)
  const [newTask,setNewTask]=useState('')
  const [newCat,setNewCat]=useState('Perso')
  const progress = Math.round((tasksToday.filter(t=>t.done).length / Math.max(1,tasksToday.length))*100)
  return (
    <div className="space-y-4">
      <Row>
        <Section title="Priorités du jour" icon={CheckCircle2} right={<Chip label={`${progress}%`}/> }>
          <div className="space-y-2">
            <PercentBar value={progress}/>
            {tasksToday.map(t=>(
              <div key={t.id} className="flex items-center gap-3 py-1">
                <input type="checkbox" checked={t.done} onChange={()=>{
                  const copy={...data}; const i=copy.agenda.tasks.findIndex(x=>x.id===t.id); copy.agenda.tasks[i].done=!copy.agenda.tasks[i].done; setData(copy);
                }}/>
                <span className={t.done?'line-through text-gray-400':''}>{t.title}</span>
                <Chip label={t.cat}/>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Input placeholder="Nouvelle tâche" value={newTask} onChange={e=>setNewTask(e.target.value)} />
              <NativeSelect value={newCat} onChange={setNewCat} options={['Perso','Maison','Business','Permis','Sécurité','Budget']}/>
              <Button onClick={()=>{
                if(!newTask.trim())return;
                const copy={...data}; copy.agenda.tasks.push({id:crypto.randomUUID(),date:data.agenda.today,title:newTask.trim(),cat:newCat,done:false}); setData(copy); setNewTask('')
              }}>Ajouter</Button>
            </div>
          </div>
        </Section>
        <Section title="Routines" icon={Clock}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-2">Matin</div>
              {data.routines.morning.map((it,i)=>(
                <div key={it.id} className="flex items-center gap-3 py-1">
                  <input type="checkbox" checked={it.done} onChange={()=>{
                    const routines={...data.routines}; routines.morning[i].done=!routines.morning[i].done; setData({...data,routines})
                  }}/>
                  <span className={it.done?'line-through text-gray-400':''}>{it.label}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="font-medium mb-2">Soir</div>
              {data.routines.evening.map((it,i)=>(
                <div key={it.id} className="flex items-center gap-3 py-1">
                  <input type="checkbox" checked={it.done} onChange={()=>{
                    const routines={...data.routines}; routines.evening[i].done=!routines.evening[i].done; setData({...data,routines})
                  }}/>
                  <span className={it.done?'line-through text-gray-400':''}>{it.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </Row>
      <Row>
        <Section title="Inbox rapide" icon={CheckCircle2}><Inbox data={data} setData={setData}/></Section>
        <Section title="Mini stats" icon={Rocket}>
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Jusqu'au 5 sept" value={`${daysUntil(data.business.deadline)} j`} icon={Calendar} />
            <MiniStat label="Avancée Code" value={`${progressHours(data.permis.codeStudy)}%`} icon={Notebook} />
            <MiniStat label="Budget Permis" value={`€ ${data.permis.budget.saved}/${data.permis.budget.estCost}`} icon={Wallet} />
            <MiniStat label="Objectif voiture" value={dmy(data.car.needBy)} icon={Truck} />
          </div>
        </Section>
      </Row>
    </div>
  )
}

function MiniStat({ label, value, icon: Icon }){
  return (
    <div className="p-3 rounded-xl border flex items-center gap-3">
      {Icon && <Icon className="w-4 h-4" />}
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-base font-semibold">{value}</div>
      </div>
    </div>
  )
}

function Journal({data,setData}){
  const [mood,setMood]=useState('🙂'); const [gratitude,setGratitude]=useState(''); const [wins,setWins]=useState(''); const [focus,setFocus]=useState(''); const [note,setNote]=useState('');
  const save=()=>{
    const entry={ id:crypto.randomUUID(), date:todayISO(), mood, gratitude, wins, focus, note }
    setData({...data, journal:{...data.journal, entries:[entry, ...data.journal.entries]}})
    setGratitude(''); setWins(''); setFocus(''); setNote('')
  }
  return (
    <div className="space-y-4">
      <Section title="Journal 5 minutes" icon={Notebook} right={<span className="text-sm text-gray-500">{dmy(todayISO())}</span>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Humeur</Label>
            <NativeSelect value={mood} onChange={setMood} options={['😌','🙂','😕','😢','😤','💪','🙏','🤍']}/>
            <Label>Gratitude</Label>
            <Input value={gratitude} onChange={e=>setGratitude(e.target.value)} placeholder="Je remercie pour..."/>
            <Label>Petites victoires du jour</Label>
            <Input value={wins} onChange={e=>setWins(e.target.value)} placeholder="J'ai réussi à..."/>
          </div>
          <div className="space-y-2">
            <Label>Focus de demain</Label>
            <Input value={focus} onChange={e=>setFocus(e.target.value)} placeholder="Ce qui compte le plus..."/>
            <Label>Notes</Label>
            <Textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Tout ce que tu veux déposer ici"/>
            <div className="flex justify-end"><Button onClick={save}>Enregistrer l'entrée</Button></div>
          </div>
        </div>
      </Section>
      <Section title="Historique" icon={Calendar}>
        <div className="space-y-3">
          {data.journal.entries.map(e => (
            <div key={e.id} className="p-3 rounded-xl border">
              <div className="flex items-center gap-2 text-sm text-gray-500"><span>{e.mood}</span><span>{dmy(e.date)}</span></div>
              <div className="text-sm mt-1"><strong>Gratitude:</strong> {e.gratitude || '—'}</div>
              <div className="text-sm"><strong>Victoires:</strong> {e.wins || '—'}</div>
              <div className="text-sm"><strong>Focus:</strong> {e.focus || '—'}</div>
              <div className="text-sm whitespace-pre-wrap"><strong>Note:</strong> {e.note || '—'}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Separation({data,setData}){
  const pct = Math.round((data.separation.safetyChecklist.filter(i=>i.done).length / data.separation.safetyChecklist.length) * 100)
  return (
    <div className="space-y-4">
      <Section title="Plan de sécurité & sortie de relation" icon={Shield} right={<Chip label={`${pct}%`}/> }>
        <PercentBar value={pct}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          <div>
            <div className="font-medium mb-2">Checklist sécurité</div>
            {data.separation.safetyChecklist.map((it,i)=>(
              <div key={it.id} className="flex items-center gap-3 py-1">
                <input type="checkbox" checked={it.done} onChange={()=>{
                  const copy={...data}; copy.separation.safetyChecklist[i].done=!copy.separation.safetyChecklist[i].done; setData(copy)
                }}/>
                <span className={it.done?'line-through text-gray-400':''}>{it.label}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-medium mb-2">Objectifs</div>
            {data.separation.goals.map((it,i)=>(
              <div key={it.id} className="flex items-center gap-3 py-1">
                <input type="checkbox" checked={it.done} onChange={()=>{
                  const copy={...data}; copy.separation.goals[i].done=!copy.separation.goals[i].done; setData(copy)
                }}/>
                <span className={it.done?'line-through text-gray-400':''}>{it.label}</span>
              </div>
            ))}
            <div className="mt-4">
              <div className="font-medium mb-2">Contacts & ressources</div>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {data.separation.resources.map(r => <li key={r.id}><span className="font-medium">{r.title}:</span> {r.note}</li>)}
              </ul>
              <div className="text-xs text-gray-500 mt-2">En cas d'urgence immédiate, appelle le 17/112.</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Permis({data,setData}){
  const codePct = progressHours(data.permis.codeStudy)
  const drivePct = progressHours(data.permis.drivingLessons)
  return (
    <div className="space-y-4">
      <Section title="Objectif Permis Auto" icon={Truck} right={<Chip label={`Examen visé: ${dmy(data.permis.targetExamDate)}`}/> }>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="font-medium">Code de la route</div>
            <PercentBar value={codePct}/>
            <div className="text-xs text-gray-500">{data.permis.codeStudy.doneHours}h / {data.permis.codeStudy.targetHours}h</div>
            <Button onClick={()=>{
              const copy={...data}; copy.permis.codeStudy.doneHours += 0.5; copy.permis.codeStudy.sessions.unshift({id:crypto.randomUUID(),date:todayISO(),minutes:30,note:'Session rapide'}); setData(copy)
            }}>+30 min</Button>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Leçons de conduite</div>
            <PercentBar value={drivePct}/>
            <div className="text-xs text-gray-500">{data.permis.drivingLessons.doneHours}h / {data.permis.drivingLessons.targetHours}h</div>
            <Button onClick={()=>{
              const copy={...data}; copy.permis.drivingLessons.doneHours += 1; copy.permis.drivingLessons.sessions.unshift({id:crypto.randomUUID(),date:todayISO(),minutes:60,note:'Leçon'}); setData(copy)
            }}>+1h</Button>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Budget</div>
            <div className="text-sm">Économies: € {data.permis.budget.saved} / {data.permis.budget.estCost}</div>
            <Button onClick={()=>{
              const add = Number(prompt('Ajouter un montant (euros)', '20'))
              if(!isNaN(add)){ const copy={...data}; copy.permis.budget.saved += add; setData(copy) }
            }}>Ajouter €</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="font-medium mb-2">Tâches clés</div>
            {data.permis.tasks.map((t,i)=>(
              <div key={t.id} className="flex items-center gap-3 py-1">
                <input type="checkbox" checked={t.done} onChange={()=>{ const copy={...data}; copy.permis.tasks[i].done=!copy.permis.tasks[i].done; setData(copy) }}/>
                <span className={t.done?'line-through text-gray-400':''}>{t.label}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-medium mb-2">Historique d'étude</div>
            <div className="space-y-2 max-h-40 overflow-auto pr-1">
              {data.permis.codeStudy.sessions.map(s => (
                <div key={s.id} className="text-sm p-2 rounded-lg border flex justify-between"><span>{dmy(s.date)} • {s.minutes} min</span><span className="opacity-70">{s.note}</span></div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Car({data,setData}){
  return (
    <div className="space-y-4">
      <Section title="Voiture – recherche & checklist" icon={Truck}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="font-medium">Critères</div>
            <div className="text-sm">Boîte: {data.car.criteria.gearbox} • {data.car.criteria.doors} portes • {data.car.criteria.seats} places</div>
            <div className="text-sm">Budget: € {data.car.criteria.budget} • Année ≥ {data.car.criteria.yearMin} • ≤ {data.car.criteria.kmMax} km</div>
            <Button onClick={()=>{
              const copy={...data}; const url = prompt('Colle un lien d\\'annonce Le Bon Coin')
              if(url){ copy.car.ads.unshift({id:crypto.randomUUID(), url, note:'', liked:true}); setData(copy) }
            }}>Ajouter une annonce</Button>
          </div>
          <div className="space-y-2">
            <div className="font-medium">À vérifier</div>
            {data.car.checklist.map((c,i)=>(
              <div key={c.id} className="flex items-center gap-3 py-1">
                <input type="checkbox" checked={c.done} onChange={()=>{ const copy={...data}; copy.car.checklist[i].done=!copy.car.checklist[i].done; setData(copy) }}/>
                <span className={c.done?'line-through text-gray-400':''}>{c.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="font-medium">Annonces sauvegardées</div>
            <div className="space-y-2 max-h-40 overflow-auto pr-1">
              {data.car.ads.length===0 && <div className="text-sm text-gray-500">Aucune encore. Ajoute ton premier lien.</div>}
              {data.car.ads.map(a => (
                <div key={a.id} className="text-sm p-2 rounded-lg border">
                  <a href={a.url} target="_blank" className="underline break-all">{a.url}</a>
                  <Textarea className="mt-2" placeholder="Tes notes" value={a.note} onChange={e=>{
                    const copy={...data}; const idx=copy.car.ads.findIndex(x=>x.id===a.id); copy.car.ads[idx].note=e.target.value; setData(copy)
                  }}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Business({data,setData}){
  const pct = Math.round((data.business.milestones.filter(m=>m.done).length / data.business.milestones.length) * 100)
  return (
    <div className="space-y-4">
      <Section title="Business – objectif 5 septembre" icon={Rocket} right={<Chip label={`${pct}%`}/> }>
        <PercentBar value={pct}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <div className="font-medium mb-2">Étapes clés</div>
            {data.business.milestones.map((m,i)=>(
              <div key={m.id} className="flex items-center gap-3 py-1">
                <input type="checkbox" checked={m.done} onChange={()=>{ const copy={...data}; copy.business.milestones[i].done=!copy.business.milestones[i].done; setData(copy) }}/>
                <span className={m.done?'line-through text-gray-400':''}>{m.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="font-medium">Sprint du jour (45–60 min)</div>
            <div className="text-sm text-gray-500">Choisis une seule tâche. Lance un minuteur et focus.</div>
            <Button onClick={()=> alert(\"Set timer on your phone: 50/10 focus break\")}>Démarrer focus 50'</Button>
            <div className="text-xs text-gray-500">Rappel: barre d'annonce → avis/étoiles → argumentaires courts → section engagements → footer complet.</div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function HomeView({data}){
  return (
    <div className="space-y-4">
      <Section title="Maison – routine hebdo" icon={Shield}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.home.weeklyPlan.map(w => (
            <div key={w.id} className="p-3 rounded-xl border">
              <div className="text-xs text-gray-500">{w.day}</div>
              <div className="font-medium">{w.task}</div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <div className="font-medium mb-1">Courses/Supplies</div>
          <div className="flex gap-2 flex-wrap">
            {data.home.supplies.map((s,i)=>(<span className="badge" key={i}>{s}</span>))}
          </div>
        </div>
      </Section>
    </div>
  )
}

function Budget({data,setData}){
  const totalFixed = data.budget.monthlyFixed.reduce((a,b)=>a+(Number(b.amount)||0),0)
  const remaining = Math.max(0,(Number(data.budget.monthlyIncome)||0)-totalFixed)
  return (
    <div className="space-y-4">
      <Section title="Budget mensuel" icon={Wallet}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Revenus mensuels (€)</Label>
            <Input type="number" value={data.budget.monthlyIncome} onChange={e=>{ const copy={...data}; copy.budget.monthlyIncome=Number(e.target.value||0); setData(copy) }}/>
            <div className="text-sm">Fixes: € {totalFixed}</div>
            <div className="text-sm">Reste à vivre estimé: € {remaining}</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Dépenses fixes</div>
            <div className="space-y-2 max-h-44 overflow-auto pr-1">
              {data.budget.monthlyFixed.map((f,i)=>(
                <div key={f.id} className="flex gap-2 items-center">
                  <Input value={f.label} onChange={e=>{ const copy={...data}; copy.budget.monthlyFixed[i].label=e.target.value; setData(copy) }} />
                  <Input type="number" value={f.amount} onChange={e=>{ const copy={...data}; copy.budget.monthlyFixed[i].amount=Number(e.target.value||0); setData(copy) }} />
                  <button className="btn" onClick={()=>{ const copy={...data}; copy.budget.monthlyFixed.splice(i,1); setData(copy)}}>✕</button>
                </div>
              ))}
            </div>
            <Button onClick={()=>{ const copy={...data}; copy.budget.monthlyFixed.push({id:crypto.randomUUID(), label:'', amount:0}); setData(copy)}}>+ Fixe</Button>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Objectifs d'épargne</div>
            <div className="space-y-2 max-h-44 overflow-auto pr-1">
              {data.budget.monthlyGoals.map((g,i)=>(
                <div key={g.id} className="p-2 rounded-lg border">
                  <Input value={g.label} onChange={e=>{ const copy={...data}; copy.budget.monthlyGoals[i].label=e.target.value; setData(copy) }}/>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input type="number" value={g.target} onChange={e=>{ const copy={...data}; copy.budget.monthlyGoals[i].target=Number(e.target.value||0); setData(copy) }} placeholder="Objectif"/>
                    <Input type="number" value={g.saved} onChange={e=>{ const copy={...data}; copy.budget.monthlyGoals[i].saved=Number(e.target.value||0); setData(copy) }} placeholder="Économisé"/>
                  </div>
                  <div className="mt-2"><Progress value={Math.round((g.saved/Math.max(1,g.target))*100)} /></div>
                </div>
              ))}
            </div>
            <Button onClick={()=>{ const copy={...data}; copy.budget.monthlyGoals.push({id:crypto.randomUUID(), label:'Nouvel objectif', target:100, saved:0}); setData(copy)}}>+ Objectif</Button>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default function LifeOS(){
  const [data,setData]=useLocalState()
  const [tab,setTab]=useState('today')
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Life OS – {data.profile.name}</h1>
          <div className="text-sm text-gray-500">Un seul endroit pour tout gérer sereinement.</div>
        </div>
        <div className="flex gap-2">
          <Button onClick={()=>{
            const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'})
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a'); a.href=url; a.download=`life-os-chacha-${todayISO()}.json`; a.click(); URL.revokeObjectURL(url)
          }}>Exporter</Button>
          <Button onClick={()=>{
            const input=document.createElement('input'); input.type='file'; input.accept='application/json'; input.onchange=(e)=>{
              const file=e.target.files?.[0]; if(!file) return;
              const fr=new FileReader(); fr.onload=()=>{ try{ const json=JSON.parse(fr.result); localStorage.setItem(LS_KEY, JSON.stringify(json)); location.reload() }catch(e){ alert('Fichier invalide') } }; fr.readAsText(file)
            }; input.click()
          }}>Importer</Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-2xl">
          <TabsTrigger value="today"><div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>Aujourd'hui</div></TabsTrigger>
          <TabsTrigger value="agenda"><div className="flex items-center gap-2"><Calendar className="w-4 h-4"/>Agenda</div></TabsTrigger>
          <TabsTrigger value="journal"><div className="flex items-center gap-2"><Notebook className="w-4 h-4"/>Journal</div></TabsTrigger>
          <TabsTrigger value="separation"><div className="flex items-center gap-2"><Shield className="w-4 h-4"/>Sécurité</div></TabsTrigger>
          <TabsTrigger value="permis"><div className="flex items-center gap-2"><Truck className="w-4 h-4"/>Permis</div></TabsTrigger>
          <TabsTrigger value="car"><div className="flex items-center gap-2"><Truck className="w-4 h-4"/>Voiture</div></TabsTrigger>
          <TabsTrigger value="business"><div className="flex items-center gap-2"><Rocket className="w-4 h-4"/>Business 5 sept</div></TabsTrigger>
          <TabsTrigger value="home"><div className="flex items-center gap-2"><Shield className="w-4 h-4"/>Maison</div></TabsTrigger>
          <TabsTrigger value="budget"><div className="flex items-center gap-2"><Wallet className="w-4 h-4"/>Budget</div></TabsTrigger>
        </TabsList>
        <div className="mt-4 space-y-4">
          <TabsContent value="today"><Today data={data} setData={setData}/></TabsContent>
          <TabsContent value="agenda"><Agenda data={data} setData={setData}/></TabsContent>
          <TabsContent value="journal"><Journal data={data} setData={setData}/></TabsContent>
          <TabsContent value="separation"><Separation data={data} setData={setData}/></TabsContent>
          <TabsContent value="permis"><Permis data={data} setData={setData}/></TabsContent>
          <TabsContent value="car"><Car data={data} setData={setData}/></TabsContent>
          <TabsContent value="business"><Business data={data} setData={setData}/></TabsContent>
          <TabsContent value="home"><HomeView data={data} /></TabsContent>
          <TabsContent value="budget"><Budget data={data} setData={setData}/></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function Agenda({data,setData}){
  const [title,setTitle]=useState('')
  const [cat,setCat]=useState('Perso')
  const [date,setDate]=useState(data.agenda.today)
  const add=()=>{
    if(!title.trim()) return
    const copy={...data}; copy.agenda.tasks.push({id:crypto.randomUUID(), date, title:title.trim(), cat, done:false}); setData(copy); setTitle('')
  }
  const remove=(id)=>{ const copy={...data}; copy.agenda.tasks = copy.agenda.tasks.filter(t=>t.id!==id); setData(copy) }
  const toggle=(id)=>{ const copy={...data}; const i=copy.agenda.tasks.findIndex(t=>t.id===id); copy.agenda.tasks[i].done=!copy.agenda.tasks[i].done; setData(copy) }
  const grouped = React.useMemo(()=>{
    const m={}; for(const t of data.agenda.tasks){ (m[t.date] ||= []).push(t) }
    return Object.entries(m).sort(([a],[b])=> a.localeCompare(b))
  }, [data.agenda.tasks])
  return (
    <div className="space-y-4">
      <Section title="Ajouter au planning" icon={Calendar}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Intitulé de la tâche"/>
          <Input type="date" value={date} onChange={e=>setDate(e.target.value)} />
          <NativeSelect value={cat} onChange={setCat} options={['Perso','Maison','Business','Permis','Sécurité','Budget','Santé','Famille']}/>
          <Button onClick={add}>Ajouter</Button>
        </div>
      </Section>
      <Section title="Agenda par date" icon={Clock}>
        <div className="space-y-3">
          {grouped.map(([d,items])=> (
            <div key={d} className="p-3 rounded-xl border">
              <div className="font-medium mb-2">{dmy(d)} <span className="text-xs text-gray-500">({items.length})</span></div>
              {items.map(t => (
                <div key={t.id} className="flex items-center gap-2 py-1">
                  <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id)} />
                  <span className={t.done?'line-through text-gray-400':''}>{t.title}</span>
                  <span className="badge">{t.cat}</span>
                  <button className="ml-auto opacity-70 hover:opacity-100" onClick={()=>remove(t.id)}>✕</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
