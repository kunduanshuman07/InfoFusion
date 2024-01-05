import React from 'react'
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
export const DrawerItem = ({ to, icon, text}) => (
    <ListItem
        to={to}
        component={NavLink}
        style={({ isActive }) =>
            isActive ? { color: 'white', backgroundColor: "#0a686e" } : { color: 'white'}
        }
    >
        <ListItemIcon>
            <IconButton style={{ color: "white" }}>{icon}</IconButton>
        </ListItemIcon>
        <ListItemText
            primary={<Typography>{text}</Typography>}
            // style={{ display: open ? "" : "none" }}
        />
    </ListItem>
);
export default DrawerItem

// borderBottom: '2px solid white', borderTop: '2px solid white'