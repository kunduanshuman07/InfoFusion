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
            isActive ? { color: '#444444', backgroundColor: "#d7e7fa",  borderRadius: "10px", height: "48px"} : { color: '#444444', height: "48px",}
        }
    >
        <ListItemIcon>
            <IconButton style={{ color: "#444444" }}>{icon}</IconButton>
        </ListItemIcon>
        <ListItemText
            primary={<Typography>{text}</Typography>}
            // style={{ display: open ? "" : "none" }}
        />
    </ListItem>
);
export default DrawerItem