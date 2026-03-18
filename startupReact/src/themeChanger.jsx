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
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    minWidth: '150px',
                    zIndex: 100
                }}>
                    <button className="cinematic-btn primary" onClick={() => { setTheme('red'); setOpen(false) }}>Crimson Core</button>
                    <button className="cinematic-btn primary" onClick={() => { setTheme('purple'); setOpen(false) }}>Nebula Purple</button>
                    <button className="cinematic-btn primary" onClick={() => { setTheme('blue'); setOpen(false) }}>Cobalt Drive</button>
                </div>
            )}
        </div>
    );
}