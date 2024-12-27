'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

interface ResultsDisplayProps {
  generatedLinks: string[]
}

export function ResultsDisplay({ generatedLinks }: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLinks.join('\n')).then(() => {
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "The generated links have been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const downloadCSV = () => {
    const csv = generatedLinks.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'generated_links.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-semibold">Generated Links</h2>
      <Textarea
        value={generatedLinks.join('\n')}
        readOnly
        className="h-64"
      />
      <div className="flex gap-4">
        <Button onClick={copyToClipboard} disabled={generatedLinks.length === 0}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        <Button onClick={downloadCSV} disabled={generatedLinks.length === 0}>
          Download CSV
        </Button>
      </div>
    </div>
  )
}

