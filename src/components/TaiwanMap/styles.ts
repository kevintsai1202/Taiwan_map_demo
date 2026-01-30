import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
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
