interface TextSectionProps {
  children: React.ReactNode
  bordered?: boolean
}

export default function TextSection({ children, bordered = false }: TextSectionProps) {
  return (
    <section className={`text-section${bordered ? ' text-section--bordered' : ''}`}>
      <div className="text-section__inner fade-up">
        <p className="text-section__body">{children}</p>
      </div>
    </section>
  )
}
