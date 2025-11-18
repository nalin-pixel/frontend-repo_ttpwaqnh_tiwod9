import { useEffect, useState } from 'react'

export default function IntentionList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/intentions`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  if (loading) return (
    <div className="text-blue-200 text-center">იტვირთება...</div>
  )

  if (!items.length) return (
    <div className="text-blue-200 text-center">ჯერ არ გაქვს ჩანაწერი — დაიწყე პირველით ✨</div>
  )

  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it._id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white font-semibold">{it.title}</p>
              {it.note && <p className="text-blue-200/80 text-sm mt-1">{it.note}</p>}
              <div className="text-xs text-blue-300/60 mt-2 flex items-center gap-3">
                {it.category && <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{it.category}</span>}
                {it.created_at && <span>შექმნილია {new Date(it.created_at).toLocaleString()}</span>}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
