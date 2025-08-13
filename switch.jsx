export function Switch({checked, onCheckedChange}){
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={e=>onCheckedChange?.(e.target.checked)} />
      <span> </span>
    </label>
  )
}