import React, { useState, useMemo, useCallback } from 'react';
import Taiwan from '@svg-maps/taiwan';
import {
  COUNTY_NAMES_ZH,
  COUNTY_COLORS,
  DEFAULT_COLOR,
  ISLAND_CONFIG,
  type CountyId
} from './constants/taiwan';

/**
 * TaiwanMap Demo (v6 - 重構優化版)
 * 
 * 1. 模組化: 將路徑與卡片拆分為獨立組件。
 * 2. 效能優化: 使用 React.memo 減少不必要的重繪。
 * 3. 無障礙性 (A11y): 加入鍵盤導航與 ARIA 標籤。
 */

interface LocationPathProps {
  id: CountyId;
  name: string;
  d: string;
  fill: string;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: CountyId | null) => void;
  onSelect: (id: CountyId) => void;
}

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

interface IslandCardProps {
  config: { id: CountyId; viewBox: string };
  isSelected: boolean;
  isHovered: boolean;
  fill: string;
  onHover: (id: CountyId | null) => void;
  onSelect: (id: CountyId) => void;
}

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

const Highlight: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <span style={{ color, fontWeight: 'bold' }}>{children}</span>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: '"PingFang TC", "Microsoft JhengHei", sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    maxWidth: '1000px',
    margin: '2rem auto',
    minHeight: '80vh'
  },
  githubLink: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    cursor: 'pointer'
  },
  header: { textAlign: 'center' },
  title: { color: '#0f172a', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '800' },
  subtitle: { color: '#64748b', marginBottom: '2rem' },
  mainLayout: { display: 'flex', width: '100%', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' },
  mapContainer: { flex: '2', minWidth: '300px', maxWidth: '600px', position: 'relative' },
  svg: { width: '100%', height: 'auto', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' },
  sidebar: { flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' },
  sidebarTitle: { margin: '0 0 0.5rem 0', color: '#475569', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' },
  infoCard: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    width: '100%',
    textAlign: 'center',
    minHeight: '100px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  },
  infoTitle: { fontSize: '1.8rem', color: '#1e293b', margin: '0 0 0.5rem 0' },
  infoSubtitle: { fontSize: '1rem', color: '#64748b' },
  badgeContainer: { marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' },
  badge: { padding: '6px 14px', color: '#333', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' },
  placeholderText: { color: '#94a3b8', fontSize: '1.2rem', fontWeight: '500' }
};

export default TaiwanMap;
