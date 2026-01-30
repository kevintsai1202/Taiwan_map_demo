import React from 'react';
import { COUNTY_NAMES_ZH } from '@/constants/taiwan';
import type { LocationPathProps } from './types';

const LocationPath = React.memo(({ id, name, d, fill, isSelected, onHover, onSelect }: Omit<LocationPathProps, 'isHovered'>) => {
    return (
        <path
            id={id}
            name={name}
            d={d}
            fill={fill}
            stroke="#ffffff"
            strokeWidth={isSelected ? "2" : "1"}
            aria-label={COUNTY_NAMES_ZH[id]}
            role="button"
            tabIndex={0}
            style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                filter: isSelected ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' : 'none'
            }}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(id)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(id);
                }
            }}
        />
    );
});

export default LocationPath;
