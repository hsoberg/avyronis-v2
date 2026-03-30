const clients = [
  'Accenture', 'HubSpot', 'Stripe', 'Notion',
  'Linear', 'Vercel', 'Figma', 'Loom', 'Webflow',
]

export default function LogoTicker() {
  // Duplicate items for seamless CSS loop
  const items = [...clients, ...clients]

  return (
    <div className="ticker" aria-label="Client logos" aria-hidden="true">
      <div className="ticker__track">
        {items.map((name, i) => (
          <div className="ticker__item" key={`${name}-${i}`}>
            <span className="ticker__item-text">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
