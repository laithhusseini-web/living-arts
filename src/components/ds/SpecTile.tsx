import React from 'react'
import { Icon } from './Icon'

/** One condition, in a hairline rectangle. */
export function SpecTile({ icon = 'sun', label, value }: { icon?: string; label: string; value: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '15px 16px',
        border: '1px solid var(--line-mid)',
        borderRadius: 'var(--radius-card)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--ink-muted)' }}>
        <Icon name={icon} size={14} />
        <span className="lbl">{label}</span>
      </div>
      <div style={{ marginTop: 7, fontSize: 15, fontWeight: 400, color: 'var(--ink)' }}>{value}</div>
    </div>
  )
}
