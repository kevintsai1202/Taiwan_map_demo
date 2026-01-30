import { type CountyId } from '@/constants/taiwan';

export interface LocationPathProps {
    id: CountyId;
    name: string;
    d: string;
    fill: string;
    isHovered: boolean;
    isSelected: boolean;
    onHover: (id: CountyId | null) => void;
    onSelect: (id: CountyId) => void;
}

export interface IslandCardProps {
    config: { id: CountyId; viewBox: string };
    isSelected: boolean;
    isHovered: boolean;
    fill: string;
    onHover: (id: CountyId | null) => void;
    onSelect: (id: CountyId) => void;
}
