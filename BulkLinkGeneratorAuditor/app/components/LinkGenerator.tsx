'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface LinkGeneratorProps {
  setGeneratedLinks: (links: string[]) => void
}

export function LinkGenerator({ setGeneratedLinks }: LinkGeneratorProps) {
  const [liveSite, setLiveSite] = useState('')
  const [devSite, setDevSite] = useState('')
  const [bulkInput, setBulkInput] = useState('')

  const generateLinks = () => {
    const slugs = bulkInput.split('\n').map(slug => slug.trim()).filter(Boolean)
    const links: string[] = []

    slugs.forEach(slug => {
      const formattedSlug = slug.startsWith('/') ? slug.slice(1) : slug
      if (liveSite) {
        links.push(`Live Link: ${liveSite.replace(/\/$/, '')}/${formattedSlug}`)
      }
      if (devSite) {
        links.push(`Dev Link: ${devSite.replace(/\/$/, '')}/${formattedSlug}`)
      }
    })

    setGeneratedLinks(links)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="live-site">Live Site</Label>
        <Input
          id="live-site"
          placeholder="https://www.example.com/"
          value={liveSite}
          onChange={(e) => setLiveSite(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="dev-site">Dev Site</Label>
        <Input
          id="dev-site"
          placeholder="https://dev.example.com/"
          value={devSite}
          onChange={(e) => setDevSite(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="bulk-input">Bulk Slugs</Label>
        <Textarea
          id="bulk-input"
          placeholder="Enter one slug per line, with or without leading '/', e.g.:
/blog/example
about
/contact"
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          className="h-32"
        />
      </div>
      <Button onClick={generateLinks} className="w-full">Generate Links</Button>
    </div>
  )
}

