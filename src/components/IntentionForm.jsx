import { useState } from 'react'

export default function IntentionForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${baseUrl}/api/intentions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, note, category })
      })
      if (!res.ok) throw new Error('ვერ დამახსოვრდა ჩანაწერი')
      const data = await res.json()
      setMessage('შენმა არჩევანმა ფორმა მიიღო ✨')
      setTitle('')
      setNote('')
      setCategory('')
      if (onCreated) onCreated(data)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6 space-y-4">
      <div>
        <label className="block text-blue-100 text-sm mb-2">განზრახვა</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="რას ირჩევ ახლა?"
          className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={2}
        />
      </div>

      <div>
        <label className="block text-blue-100 text-sm mb-2">გაფართოება (არასავალდებულო)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="დააზუსტე როგორ გინდა რომ განვითარდეს"
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-blue-100 text-sm mb-2">კატეგორია</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="მაგ: ჯანმრთელობა, კარიერა, ურთიერთობები"
          className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
      >
        {loading ? 'იტვირთება...' : 'არჩევნის დაფიქსირება'}
      </button>

      {message && <p className="text-center text-blue-200">{message}</p>}
    </form>
  )
}
