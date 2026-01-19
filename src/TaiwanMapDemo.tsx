import React, { useState } from 'react';
import Taiwan from '@svg-maps/taiwan';

/**
 * TaiwanMap Demo (v5 - 中文化與離島修復版)
 * 
 * 1. 中文化: 對照表映射 ID 到中文縣市名稱。
 * 2. 離島修復: 使用精確計算的 viewBox 讓金馬澎在特寫卡片中完美居中顯示。
 * 3. 視覺與互動: 保持繽紛配色與雙向高亮互動。
 */

// 縣市名稱中文化對照表
const COUNTY_NAMES_ZH: { [key: string]: string } = {
  'keelung-city': '基隆市',
  'taipei-city': '台北市',
  'new-taipei-city': '新北市',
  'taoyuan-city': '桃園市',
  'hsinchu-county': '新竹縣',
  'hsinchu-city': '新竹市',
  'miaoli-county': '苗栗縣',
  'taichung-city': '台中市',
  'changhua-county': '彰化縣',
  'nantou-county': '南投縣',
  'yunlin-county': '雲林縣',
  'chiayi-county': '嘉義縣',
  'chiayi-city': '嘉義市',
  'tainan-city': '台南市',
  'kaohsiung-city': '高雄市',
  'pingtung-county': '屏東縣',
  'yilan-county': '宜蘭縣',
  'hualien-county': '花蓮縣',
  'taitung-county': '台東縣',
  'penghu-county': '澎湖縣',
  'kinmen-county': '金門縣',
  'lienchiang-county': '連江縣 (馬祖)'
};

// 現代配色表 (Morandi / Muted Pastel Tones)
const COUNTY_COLORS: { [key: string]: string } = {
  'keelung-city': '#8dd3c7',     // 基隆
  'taipei-city': '#ffffb3',      // 台北
  'new-taipei-city': '#bebada',  // 新北
  'taoyuan-city': '#fb8072',     // 桃園
  'hsinchu-county': '#80b1d3',   // 新竹縣
  'hsinchu-city': '#fdb462',     // 新竹市
  'miaoli-county': '#b3de69',    // 苗栗
  'taichung-city': '#fccde5',    // 台中
  'changhua-county': '#d9d9d9',  // 彰化
  'nantou-county': '#bc80bd',    // 南投
  'yunlin-county': '#ccebc5',    // 雲林
  'chiayi-county': '#ffed6f',    // 嘉義縣
  'chiayi-city': '#c4e17f',      // 嘉義市
  'tainan-city': '#f7f4c3',      // 台南
  'kaohsiung-city': '#ffb7b2',   // 高雄
  'pingtung-county': '#e2f0cb',  // 屏東
  'yilan-county': '#ffdac1',     // 宜蘭
  'hualien-county': '#b5ead7',   // 花蓮
  'taitung-county': '#c7ceea',   // 台東
  'penghu-county': '#a0c4ff',    // 澎湖 (特別色)
  'kinmen-county': '#bdb2ff',    // 金門 (特別色)
  'lienchiang-county': '#ffc6ff' // 連江/馬祖 (特別色)
};

const DEFAULT_COLOR = '#e2e8f0';

// 離島配置，包含精確計算的 viewBox (x y width height) (增加一點 padding 讓畫面不要太滿)
const ISLAND_CONFIG = [
  { id: 'penghu-county', viewBox: '280 755 115 182' }, // 澎湖
  { id: 'kinmen-county', viewBox: '0 400 340 190' },   // 金門 (+padding)
  { id: 'lienchiang-county', viewBox: '445 0 165 140' } // 連江 (+padding)
];

const TaiwanMap: React.FC = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // 根據狀態決定顏色
  const getLocationColor = (id: string) => {
    if (selectedLocation === id) return '#3b82f6'; // 選中色 (鮮亮藍)
    if (hoveredLocation === id) return '#64748b'; // 懸停色 (深灰)
    return COUNTY_COLORS[id] || DEFAULT_COLOR;    // 預設色
  };

  const containerStyle: React.CSSProperties = {
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
  };

  const infoCardStyle: React.CSSProperties = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    width: '100%',
    textAlign: 'center',
    minHeight: '100px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  };

  const selectedData = Taiwan.locations.find(loc => loc.id === selectedLocation);
  const hoveredData = Taiwan.locations.find(loc => loc.id === hoveredLocation);

  const getZhName = (id: string | null | undefined) => {
    if (!id) return '';
    return COUNTY_NAMES_ZH[id] || id;
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#0f172a', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '800' }}>
        台灣地圖 (繽紛版)
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        包含 <span style={{ color: '#a0c4ff', fontWeight: 'bold' }}>澎湖</span>、
        <span style={{ color: '#bdb2ff', fontWeight: 'bold' }}>金門</span>、
        <span style={{ color: '#ffc6ff', fontWeight: 'bold' }}>馬祖</span> 特寫視圖
      </p>

      <div style={{ display: 'flex', width: '100%', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>

        {/* 主地圖區 */}
        <div style={{ flex: '2', minWidth: '300px', maxWidth: '600px', position: 'relative' }}>
          <svg
            viewBox={Taiwan.viewBox}
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' }}
          >
            {Taiwan.locations.map((loc) => (
              <path
                key={loc.id}
                id={loc.id}
                name={loc.name}
                d={loc.path}
                fill={getLocationColor(loc.id)}
                stroke="#ffffff"
                strokeWidth="1"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onMouseEnter={() => setHoveredLocation(loc.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setSelectedLocation(loc.id)}
              />
            ))}
          </svg>
        </div>

        {/* 離島特寫區 (Cards) */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#475569', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
            離島特寫
          </h3>
          {ISLAND_CONFIG.map(config => {
            const loc = Taiwan.locations.find(l => l.id === config.id);
            if (!loc) return null;

            return (
              <div
                key={config.id}
                style={{
                  border: `2px solid ${selectedLocation === config.id ? '#3b82f6' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  padding: '10px',
                  backgroundColor: hoveredLocation === config.id ? '#f1f5f9' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={() => setHoveredLocation(config.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setSelectedLocation(config.id)}
              >
                {/* 縮圖容器: 使用自定義 viewBox 實現精準特寫 */}
                <div style={{ width: '80px', height: '80px', overflow: 'hidden', borderRadius: '8px', background: '#f8fafc', position: 'relative' }}>
                  <svg
                    viewBox={config.viewBox}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <path d={loc.path} fill={getLocationColor(config.id)} stroke="none" />
                  </svg>
                </div>

                {/* 文字資訊 */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: '#334155' }}>
                    {COUNTY_NAMES_ZH[config.id]}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Zoom View</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div style={infoCardStyle}>
        {selectedData ? (
          <div>
            <h3 style={{ fontSize: '1.8rem', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
              {getZhName(selectedData.id)}
            </h3>
            <p style={{ fontSize: '1rem', color: '#64748b' }}>
              {selectedData.name} (En)
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <span style={{ padding: '6px 14px', backgroundColor: getLocationColor(selectedData.id), color: '#333', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                已選擇
              </span>
            </div>
          </div>
        ) : (
          <div style={{ padding: '1rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: '500' }}>
              {hoveredData ? `指向：${getZhName(hoveredData.id)}` : '請選擇一個縣市'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaiwanMap;
