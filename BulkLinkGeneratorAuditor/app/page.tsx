'use client'

import { useState } from 'react'
import { LinkGenerator } from './components/LinkGenerator'
import { ResultsDisplay } from './components/ResultsDisplay'

export default function Home() {
  const [generatedLinks, setGeneratedLinks] = useState<string[]>([])

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-left sm:text-center mb-8">
        Bulk Link<br className="sm:hidden" /> Generator Auditor
      </h1>
      <LinkGenerator setGeneratedLinks={setGeneratedLinks} />
      <ResultsDisplay generatedLinks={generatedLinks} />
    </main>
  )
}

