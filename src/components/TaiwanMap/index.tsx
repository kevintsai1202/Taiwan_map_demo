import React, { useState, useMemo, useCallback } from 'react';
import Taiwan from '@svg-maps/taiwan';
import {
    COUNTY_NAMES_ZH,
    COUNTY_COLORS,
    DEFAULT_COLOR,
    ISLAND_CONFIG,
    type CountyId
} from '@/constants/taiwan';
import Highlight from '@/components/ui/Highlight';
import LocationPath from './LocationPath';
import IslandCard from './IslandCard';
import { styles } from './styles';

/**
 * TaiwanMap Demo (v6 - 重構優化版)
 * 
 * 1. 模組化: 將路徑與卡片拆分為獨立組件。
 * 2. 效能優化: 使用 React.memo 減少不必要的重繪。
 * 3. 無障礙性 (A11y): 加入鍵盤導航與 ARIA 標籤。
 */

const TaiwanMap: React.FC = () => {
    const [hoveredLocation, setHoveredLocation] = useState<CountyId | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<CountyId | null>(null);

    const handleHover = useCallback((id: CountyId | null) => setHoveredLocation(id), []);
    const handleSelect = useCallback((id: CountyId) => setSelectedLocation(id), []);

    const getLocationColor = useCallback((id: CountyId) => {
        if (selectedLocation === id) return '#3b82f6';
        if (hoveredLocation === id) return '#64748b';
        return COUNTY_COLORS[id] || DEFAULT_COLOR;
    }, [selectedLocation, hoveredLocation]);

    const selectedData = useMemo(() =>
        Taiwan.locations.find(loc => loc.id === selectedLocation),
        [selectedLocation]
    );

    return (
        <div style={styles.container}>
            <a
                href="https://github.com/kevintsai1202/Taiwan_map_demo"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.githubLink}
                aria-label="View source on GitHub"
            >
                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
                    <path fill="#24292f" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
            </a>

            <header style={styles.header}>
                <h2 style={styles.title}>台灣地圖 (繽紛版)</h2>
                <p style={styles.subtitle}>
                    包含 <Highlight color="#a0c4ff">澎湖</Highlight>、
                    <Highlight color="#bdb2ff">金門</Highlight>、
                    <Highlight color="#ffc6ff">馬祖</Highlight> 特寫視圖
                </p>
            </header>

            <div style={styles.mainLayout}>
                {/* 主地圖區 */}
                <div style={styles.mapContainer}>
                    <svg
                        viewBox={Taiwan.viewBox}
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.svg}
                    >
                        {Taiwan.locations.map((loc) => (
                            <LocationPath
                                key={loc.id}
                                id={loc.id as CountyId}
                                name={loc.name || ''}
                                d={loc.path}
                                fill={getLocationColor(loc.id as CountyId)}
                                isSelected={selectedLocation === loc.id}
                                onHover={handleHover}
                                onSelect={handleSelect}
                            />
                        ))}
                    </svg>
                </div>

                {/* 離島特寫區 */}
                <aside style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>離島特寫</h3>
                    {ISLAND_CONFIG.map(config => (
                        <IslandCard
                            key={config.id}
                            config={config}
                            isHovered={hoveredLocation === config.id}
                            isSelected={selectedLocation === config.id}
                            fill={getLocationColor(config.id)}
                            onHover={handleHover}
                            onSelect={handleSelect}
                        />
                    ))}
                </aside>
            </div>

            <div style={styles.infoCard}>
                {selectedData ? (
                    <div>
                        <h3 style={styles.infoTitle}>{COUNTY_NAMES_ZH[selectedData.id as CountyId]}</h3>
                        <p style={styles.infoSubtitle}>{selectedData.name} (En)</p>
                        <div style={styles.badgeContainer}>
                            <span style={{ ...styles.badge, backgroundColor: getLocationColor(selectedData.id as CountyId) }}>
                                已選擇
                            </span>
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '1rem' }}>
                        <p style={styles.placeholderText}>
                            {hoveredLocation ? `指向：${COUNTY_NAMES_ZH[hoveredLocation]}` : '請選擇一個縣市'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaiwanMap;
