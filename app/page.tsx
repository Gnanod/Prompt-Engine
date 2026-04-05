'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { CATEGORY_TEMPLATES, CategoryKey } from '@/lib/generator/category-templates'
import { buildUniqueCandidate } from '@/lib/generator/build'

type SavedPrompt = {
  id: string
  category: string
  rendered_prompt: string
  fingerprint_hash: string
  created_at: string
}

export default function HomePage() {
  const [category, setCategory] = useState<CategoryKey>('politics')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [currentHash, setCurrentHash] = useState('')
  const [currentPayload, setCurrentPayload] = useState<any>(null)
  const [history, setHistory] = useState<SavedPrompt[]>([])

  const currentTemplate = CATEGORY_TEMPLATES[category]

  useEffect(() => {
    fetchHistory()
  }, [])

  async function fetchHistory() {
    const { data } = await supabase
      .from('saved_prompts')
      .select('id, category, rendered_prompt, fingerprint_hash, created_at')
      .order('created_at', { ascending: false })
      .limit(20)

    setHistory(data || [])
  }

  async function randomizePrompt() {
    setLoading(true)
    setMessage('Checking duplicates against saved prompts...')

    for (let attempt = 0; attempt < 20; attempt++) {
      const candidate = await buildUniqueCandidate(category)

      const { data, error } = await supabase
        .from('saved_prompts')
        .select('id')
        .eq('fingerprint_hash', candidate.fingerprintHash)
        .limit(1)

      if (error) {
        setMessage('Error while checking duplicates.')
        setLoading(false)
        return
      }

      if (!data || data.length === 0) {
        setCurrentPrompt(candidate.generatedPrompt)
        setCurrentHash(candidate.fingerprintHash)
        setCurrentPayload(candidate.payload)
        setMessage(`Unique ${category} prompt found after ${attempt + 1} attempt(s).`)
        setLoading(false)
        return
      }
    }

    setMessage('Could not find a unique prompt after multiple tries.')
    setLoading(false)
  }

  async function savePrompt() {
    if (!currentPrompt || !currentHash || !currentPayload) {
      setMessage('Generate a prompt first.')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('saved_prompts').insert({
      category,
      subcategory: currentTemplate.templateName,
      payload: currentPayload,
      rendered_prompt: currentPrompt,
      fingerprint_hash: currentHash,
    })

    if (error) {
      if ((error as any).code === '23505') setMessage('This prompt is already saved.')
      else setMessage('Error saving prompt.')
      setSaving(false)
      return
    }

    setMessage('Prompt saved successfully.')
    setSaving(false)
    fetchHistory()
  }

  async function copyPrompt() {
    if (!currentPrompt) {
      setMessage('Nothing to copy yet.')
      return
    }
    await navigator.clipboard.writeText(currentPrompt)
    setMessage('Prompt copied to clipboard.')
  }

  return (
    <main style={{ minHeight: '100vh', background: '#08101d', color: '#eaf2ff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8 }}>Prompt Engine</h1>
        <p style={{ color: '#9fb3d6', marginBottom: 20 }}>
          Category-based master prompts with visible character pools.
        </p>

        <div style={{ marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {Object.entries(CATEGORY_TEMPLATES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setCategory(key as CategoryKey)}
              style={{
                padding: '10px 16px',
                borderRadius: 12,
                border: '1px solid #30425f',
                background: category === key ? '#2563eb' : '#11192b',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 }}>
          <section style={{ background: '#10192b', border: '1px solid #24314d', borderRadius: 18, padding: 20 }}>
            <div style={{ marginBottom: 16, padding: 14, borderRadius: 14, background: '#17233b', border: '1px solid #30425f' }}>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#88a6d8', marginBottom: 8 }}>
                Loaded Master Prompt
              </div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{currentTemplate.templateName}</div>
              <div style={{ marginTop: 10, color: '#cfe0ff', fontSize: 14 }}>{currentTemplate.intro}</div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <button onClick={randomizePrompt} disabled={loading} style={btnBlue}>
                {loading ? 'Randomizing...' : '🎲 Randomize'}
              </button>
              <button onClick={copyPrompt} style={btnDark}>📋 Copy Prompt</button>
              <button onClick={savePrompt} disabled={saving} style={btnGreen}>
                {saving ? 'Saving...' : '💾 Save Used Prompt'}
              </button>
            </div>

            {message && (
              <div style={{ marginBottom: 16, padding: 12, background: '#17233b', borderRadius: 12, border: '1px solid #30425f' }}>
                {message}
              </div>
            )}

            <div style={{ background: '#09111d', border: '1px solid #23304a', borderRadius: 16, padding: 18 }}>
              <div style={{ fontSize: 12, color: '#86a4d6', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>
                Generated Prompt
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0, color: '#aaf5b2', fontSize: 14, lineHeight: 1.72 }}>
                {currentPrompt || 'Your full generated prompt will appear here...'}
              </pre>
            </div>

            {currentHash && (
              <div style={{ marginTop: 12, fontSize: 12, color: '#7f96bc' }}>
                Fingerprint: {currentHash.slice(0, 20)}...
              </div>
            )}
          </section>

          <aside style={{ display: 'grid', gap: 20 }}>
            <section style={{ background: '#10192b', border: '1px solid #24314d', borderRadius: 18, padding: 20 }}>
              <h2 style={{ marginTop: 0 }}>Character Pool</h2>
              {Object.entries(currentTemplate.groupedCharacters).map(([group, names]) => (
                <div key={group} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#88a6d8', marginBottom: 8 }}>{group}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {names.map((name) => (
                      <span
                        key={name}
                        style={{
                          background: '#17233b',
                          border: '1px solid #30425f',
                          borderRadius: 999,
                          padding: '6px 10px',
                          fontSize: 13,
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section style={{ background: '#10192b', border: '1px solid #24314d', borderRadius: 18, padding: 20 }}>
              <h2 style={{ marginTop: 0 }}>Saved History</h2>
              <div style={{ maxHeight: 360, overflowY: 'auto', display: 'grid', gap: 12 }}>
                {history.length === 0 ? (
                  <div style={{ color: '#9fb3d6' }}>No saved prompts yet.</div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} style={{ background: '#17233b', border: '1px solid #30425f', borderRadius: 14, padding: 12 }}>
                      <div style={{ fontSize: 12, color: '#86a4d6', textTransform: 'uppercase', marginBottom: 6 }}>
                        {item.category}
                      </div>
                      <div style={{ fontSize: 12, color: '#7f96bc', marginBottom: 8 }}>
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                      <div style={{ fontSize: 13, color: '#dbe8ff', lineHeight: 1.55, maxHeight: 120, overflow: 'hidden' }}>
                        {item.rendered_prompt}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}

const btnBlue: React.CSSProperties = {
  padding: '12px 18px',
  borderRadius: 12,
  border: 'none',
  background: '#2563eb',
  color: 'white',
  fontWeight: 700,
  cursor: 'pointer',
}

const btnDark: React.CSSProperties = {
  padding: '12px 18px',
  borderRadius: 12,
  border: '1px solid #31405f',
  background: '#0d1524',
  color: '#e8f0ff',
  fontWeight: 700,
  cursor: 'pointer',
}

const btnGreen: React.CSSProperties = {
  padding: '12px 18px',
  borderRadius: 12,
  border: 'none',
  background: '#16a34a',
  color: 'white',
  fontWeight: 700,
  cursor: 'pointer',
}