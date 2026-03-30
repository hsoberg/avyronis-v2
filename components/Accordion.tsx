'use client'

import { useState } from 'react'

interface AccordionItem {
  id: string
  label?: string
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    items.find((i) => i.defaultOpen)?.id ?? null
  )

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div className="accordion" role="list">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className={`accordion__item${isOpen ? ' open' : ''}`} role="listitem">
            <button
              className="accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              <div className="accordion__header-content">
                {item.label && <span className="accordion__label">{item.label}</span>}
                <span className="accordion__title">{item.title}</span>
              </div>
              <span className="accordion__icon" aria-hidden="true" />
            </button>
            <div className="accordion__content" id={`accordion-${item.id}`} role="region">
              <div className="accordion__body">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
