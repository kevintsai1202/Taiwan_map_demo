/**
 * Taiwan Map Constants & Types
 */

export type CountyId =
    | 'keelung-city'
    | 'taipei-city'
    | 'new-taipei-city'
    | 'taoyuan-city'
    | 'hsinchu-county'
    | 'hsinchu-city'
    | 'miaoli-county'
    | 'taichung-city'
    | 'changhua-county'
    | 'nantou-county'
    | 'yunlin-county'
    | 'chiayi-county'
    | 'chiayi-city'
    | 'tainan-city'
    | 'kaohsiung-city'
    | 'pingtung-county'
    | 'yilan-county'
    | 'hualien-county'
    | 'taitung-county'
    | 'penghu-county'
    | 'kinmen-county'
    | 'lienchiang-county';

export const COUNTY_NAMES_ZH: Record<CountyId, string> = {
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

export const COUNTY_COLORS: Record<CountyId, string> = {
    'keelung-city': '#8dd3c7',
    'taipei-city': '#ffffb3',
    'new-taipei-city': '#bebada',
    'taoyuan-city': '#fb8072',
    'hsinchu-county': '#80b1d3',
    'hsinchu-city': '#fdb462',
    'miaoli-county': '#b3de69',
    'taichung-city': '#fccde5',
    'changhua-county': '#d9d9d9',
    'nantou-county': '#bc80bd',
    'yunlin-county': '#ccebc5',
    'chiayi-county': '#ffed6f',
    'chiayi-city': '#c4e17f',
    'tainan-city': '#f7f4c3',
    'kaohsiung-city': '#ffb7b2',
    'pingtung-county': '#e2f0cb',
    'yilan-county': '#ffdac1',
    'hualien-county': '#b5ead7',
    'taitung-county': '#c7ceea',
    'penghu-county': '#a0c4ff',
    'kinmen-county': '#bdb2ff',
    'lienchiang-county': '#ffc6ff'
};

export const DEFAULT_COLOR = '#e2e8f0';

export interface IslandConfig {
    id: CountyId;
    viewBox: string;
}

export const ISLAND_CONFIG: IslandConfig[] = [
    { id: 'penghu-county', viewBox: '280 755 115 182' },
    { id: 'kinmen-county', viewBox: '0 400 340 190' },
    { id: 'lienchiang-county', viewBox: '445 0 165 140' }
];
