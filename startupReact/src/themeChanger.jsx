import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export function ThemeChanger() {
    const [theme, setTheme] = React.useState('red');

    React.useEffect(() => {
        const header = document.getElementsByTagName('nav')[0];
        header.className = `${theme}-header navbar fixed-top navbar-dark`;
        const main = document.getElementsByClassName('body')[0];
        main.className = `${theme}-body body text-light`; 
        
    }, [theme]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Pick a Theme
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { setTheme('red'); handleClose(); }}>Red</MenuItem>
                <MenuItem onClick={() => { setTheme('purple'); handleClose(); }}>Purple</MenuItem>
                <MenuItem onClick={() => { setTheme('blue'); handleClose(); }}>Blue</MenuItem>
            </Menu>
        </div>
    );
}