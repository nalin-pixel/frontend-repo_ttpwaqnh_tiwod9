import { useState } from 'react'
import Header from './components/Header'
import IntentionForm from './components/IntentionForm'
import IntentionList from './components/IntentionList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_80%_110%,rgba(99,102,241,0.2),transparent_40%)]"></div>

      <div className="relative max-w-3xl mx-auto px-6 py-16 space-y-10">
        <Header />

        <section className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">განზრახვის ჩანაწერი</h2>
            <IntentionForm onCreated={() => setRefreshKey((k) => k + 1)} />
            <p className="text-blue-200/80 text-sm">
              ყოველდღე აირჩიე მცირე ქმედება, რომელიც დაგაახლოებს მიზანთან. შენს არჩევანს ძალა აქვს.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">ჩანაწერები</h2>
            <IntentionList refreshKey={refreshKey} />
          </div>
        </section>

        <footer className="text-center text-blue-300/70 text-sm pt-8">
          შექმნილია შთაგონებისთვის — შენი არჩევანი ქმნის რეალობას
        </footer>
      </div>
    </div>
  )
}

export default App
