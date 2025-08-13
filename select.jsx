export function NativeSelect({value, onChange, options=[]}){
  return (
    <select className="input" value={value} onChange={e=>onChange?.(e.target.value)}>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  )
}