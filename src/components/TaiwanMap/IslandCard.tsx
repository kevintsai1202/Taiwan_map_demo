import React from 'react';
import Taiwan from '@svg-maps/taiwan';
import { COUNTY_NAMES_ZH } from '@/constants/taiwan';
import type { IslandCardProps } from './types';

const IslandCard = React.memo(({ config, isSelected, isHovered, fill, onHover, onSelect }: IslandCardProps) => {
    const loc = Taiwan.locations.find(l => l.id === config.id);
    if (!loc) return null;

    return (
        <div
            style={{
                border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
                borderRadius: '12px',
                padding: '10px',
                backgroundColor: isHovered ? '#f1f5f9' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.15)' : '0 2px 5px rgba(0,0,0,0.05)'
            }}
            role="button"
            tabIndex={0}
            onMouseEnter={() => onHover(config.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(config.id)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(config.id);
                }
            }}
        >
            <div style={{ width: '80px', height: '80px', overflow: 'hidden', borderRadius: '8px', background: '#f8fafc' }}>
                <svg viewBox={config.viewBox} style={{ width: '100%', height: '100%' }}>
                    <path d={loc.path} fill={fill} stroke="none" />
                </svg>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: isSelected ? '#3b82f6' : '#334155' }}>
                    {COUNTY_NAMES_ZH[config.id]}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Zoom View</div>
            </div>
        </div>
    );
});

export default IslandCard;
