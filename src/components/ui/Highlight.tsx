import React from 'react';

interface HighlightProps {
    color: string;
    children: React.ReactNode;
}

const Highlight: React.FC<HighlightProps> = ({ color, children }) => (
    <span style={{ color, fontWeight: 'bold' }}>{children}</span>
);

export default Highlight;
