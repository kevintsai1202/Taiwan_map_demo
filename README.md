# Taiwan Map React Demo (台灣地圖 React 互動範例)

A beautiful, interactive, and accurate SVG map of Taiwan built with React.
一個美觀、互動且精準的 React 台灣地圖組件。

### 🚀 [Live Demo / 線上預覽](https://kevintsai1202.github.io/Taiwan_map_demo/)

![Demo Screenshot](./screenshot.png) 
*(Please add a screenshot named screenshot.png to the root directory if available / 請在根目錄添加截圖)*

## Features (功能特色)

- **High Precision (高精準度)**: accurate geographical borders including Penghu, Kinmen, and Matsu. (包含澎湖、金門、馬祖的精準行政區界線)。
- **Interactive (互動性)**: Hover effects and click selection with visual feedback. (支援懸停高亮與點擊選取)。
- **Aesthetic Design (美學設計)**: Uses a Morandi/Pastel color palette for a modern look. (採用莫蘭迪粉彩色系，視覺舒適)。
- **Island Zoom (離島特寫)**: Dedicated magnified views for offshore islands to ensure visibility. (專屬離島特寫區，解決離島過小難以點選的問題)。
- **Bilingual Support (雙語支援)**: Code mapping for Chinese county names. (內建縣市名稱中文化映射)。

## Installation (安裝與執行)

This project uses [Vite](https://vitejs.dev/).

```bash
# Install dependencies (安裝依賴)
npm install

# Start development server (啟動開發伺服器)
npm run dev
```

## Credits & Acknowledgements (致謝與延伸資源)

This project is built upon the following excellent open-source libraries:
本專案基於以下優秀的開源套件構建：

1.  **[@svg-maps/taiwan](https://github.com/VictorCazanave/svg-maps/tree/master/packages/taiwan)**
    - Provides the accurate SVG path data for Taiwan's administrative divisions.
    - 提供台灣行政區劃的精確 SVG 路徑數據。

2.  **[react-svg-map](https://github.com/VictorCazanave/react-svg-map)**
    - Used as a reference for the component structure (though this demo implements a custom renderer for React 18 compatibility).
    - 作為組件結構的參考（本範例實作了自定義渲染器以相容 React 18）。

## Project Structure (專案結構)

- `src/components/TaiwanMap/`: The main component module. (核心組件模組)。
- `src/App.tsx`: Entry point rendering the demo. (程式入口)。

## License

MIT
