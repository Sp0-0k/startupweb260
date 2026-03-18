import React from 'react';

export function ThemeChanger() {
    const [theme, setTheme] = React.useState('red');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        document.body.className = `${theme}-theme`;
    }, [theme]);

    // Close menu when clicking outside could be added, but for now simple toggle
    return (
        <div className="theme-changer" style={{ position: 'relative', display: 'inline-block' }}>
            <button className="cinematic-btn" onClick={() => setOpen(!open)}>
                Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>

            {open && (
                <div className="glass-panel theme-menu fade-in" style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: 0,
                    marginBottom: '0.5rem',
                    padding: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    minWidth: '150px',
                    zIndex: 100
                }}>
                    <button className="cinematic-btn primary red-theme" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => { setTheme('red'); setOpen(false) }}>Crimson Core</button>
                    <button className="cinematic-btn primary purple-theme" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => { setTheme('purple'); setOpen(false) }}>Nebula Purple</button>
                    <button className="cinematic-btn primary blue-theme" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => { setTheme('blue'); setOpen(false) }}>Cobalt Drive</button>
                    <button className="cinematic-btn primary green-theme" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => { setTheme('green'); setOpen(false) }}>Sylvan Green</button>
                    <button className="cinematic-btn primary teal-theme" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => { setTheme('teal'); setOpen(false) }}>Eldritch Teal</button>
                </div>
            )}
        </div>
    );
}