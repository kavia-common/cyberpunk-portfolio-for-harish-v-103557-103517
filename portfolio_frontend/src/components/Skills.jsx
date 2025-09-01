import React from 'react';
import Icon from './Icon';

/**
 * PUBLIC_INTERFACE
 * Skills - renders a grid of skills with accessible tooltips
 * Props:
 *  - items: Array<{ id: string, label: string, icon?: string, level?: string }>
 */
export default function Skills({ items = [] }) {
  return (
    <div className="skills-grid" role="list" aria-label="Skills">
      {items.map((s) => (
        <SkillPill key={s.id} item={s} />
      ))}
    </div>
  );
}

function SkillPill({ item }) {
  const [show, setShow] = React.useState(false);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShow((v) => !v);
    }
    if (e.key === 'Escape') setShow(false);
  };
  return (
    <div
      className="skill"
      role="listitem"
      tabIndex={0}
      aria-describedby={`tip-${item.id}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      onKeyDown={onKey}
    >
      <span className="skill-icon" aria-hidden="true">
        <Icon name={item.icon || 'logo'} size={18} />
      </span>
      <span className="skill-label">{item.label}</span>
      <span
        id={`tip-${item.id}`}
        role="tooltip"
        className={`tooltip ${show ? 'show' : ''}`}
      >
        {item.level ? `${item.label} • ${item.level}` : item.label}
      </span>
    </div>
  );
}
