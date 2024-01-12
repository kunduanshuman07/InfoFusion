import React from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import PlaygroundIcon from '@mui/icons-material/SportsEsports';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import HubIcon from '@mui/icons-material/Hub';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItem, Typography, ListItemText, ListItemIcon } from '@mui/material';
const DrawerComponent = () => {
    const [drawerWidth, setDrawerWidth] = React.useState(230);
    const [open, setOpen] = React.useState(true);
    const [isQuizCollapse, setIsQuizCollapse] = React.useState(false);
    const [isDebateCollapse, setIsDebateCollapse] = React.useState(false);
    const handleDrawerOpen = () => {
        setDrawerWidth(open ? 75 : 230);
        setOpen(!open);
        setIsQuizCollapse(false);
        setIsDebateCollapse(false);
    }
    const handleQuizCollapse = () => {
        setIsQuizCollapse(!isQuizCollapse);
        setIsDebateCollapse(false);
        if(!open){
            setDrawerWidth(open ? 75 : 230);
            setOpen(true);
        }
    };
    const handleDebateCollapse = () => {
        setIsDebateCollapse(!isDebateCollapse);
        setIsQuizCollapse(false);
        if(!open){
            setDrawerWidth(open ? 75 : 230);
            setOpen(true);
        }
    };
    return (
        <Root>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: "white", transition: 'width 350ms' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', cursor: "pointer" }}>
                    <IconButton
                        className='drawer-icon'
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon width={16} height="100%" alt="menu" />
                    </IconButton>
                    <List style={{ marginTop: 10 }}>
                        <ListItem
                            to='/getting-started'
                            component={NavLink}

                            style={({ isActive }) =>
                                isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "20px", height: "38px", marginTop: "5px" } : { color: '#444444', height: "38px", marginTop: "5px", }
                            }
                            className='list-item'
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "#444444" }}><NotStartedIcon style={{ color: "#01264a" }} /></IconButton>
                            </ListItemIcon>
                            <ListItemText primary={<Typography style={{display: !open?"none": ""}}>Getting Started</Typography>} />
                        </ListItem>
                        <ListItem onClick={handleQuizCollapse} style={{marginTop: "10px", height: "38px"}} className={!isQuizCollapse && 'list-item'}>
                            <ListItemIcon>
                                <IconButton style={{ color: "#444444" }}><PlaygroundIcon style={{ color: "#01264a" }} /></IconButton>
                            </ListItemIcon>
                            <ListItemText primary={<Typography style={{display: !open?"none": ""}}>Quiz</Typography>} />
                            {open&&isQuizCollapse ? <ExpandLessIcon style={{color: "#01264a"}}/> :open? <ExpandMoreIcon style={{color: "#01264a"}} className='list-item'/>: ""}
                        </ListItem>
                        <Collapse in={isQuizCollapse} style={{marginTop: "-5px"}}>
                            <ListItem
                                to='/quiz/current-quiz'
                                component={NavLink}

                                style={({ isActive }) =>
                                    isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "30px", height: "28px" } : { color: '#444444', height: "28px"}
                                }
                                className='list-item'
                            >
                                <ListItemText primary={<Typography style={{ fontSize: "12px", textAlign: "right", fontWeight: "bold", }}>Today's Quiz</Typography>} />
                            </ListItem>
                            <ListItem
                                to='/quiz/past-quizzes'
                                component={NavLink}

                                style={({ isActive }) =>
                                    isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "20px", height: "28px" } : { color: '#444444', height: "28px", }
                                }
                                className='list-item'
                            >
                                <ListItemText primary={<Typography style={{ fontSize: "12px", textAlign: "right", fontWeight: "bold", }}>Past Quizzes</Typography>} />
                            </ListItem>
                            <ListItem
                                to='/quiz/scorecards'
                                component={NavLink}

                                style={({ isActive }) =>
                                    isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "20px", height: "28px" } : { color: '#444444', height: "28px", }
                                }
                                className='list-item'
                            >
                                <ListItemText primary={<Typography style={{ fontSize: "12px", textAlign: "right", fontWeight: "bold", }}>Scorecards</Typography>} />
                            </ListItem>
                        </Collapse>
                        <ListItem onClick={handleDebateCollapse} style={{marginTop: "15px", height: "38px"}} className={!isDebateCollapse && 'list-item'}>
                            <ListItemIcon>
                                <IconButton style={{ color: "#444444" }}><AccessibilityIcon style={{ color: "#01264a" }} /></IconButton>
                            </ListItemIcon>
                            <ListItemText primary={<Typography style={{display: !open?"none": ""}}>Debate</Typography>} />
                            {open&&isQuizCollapse ? <ExpandLessIcon style={{color: "#01264a"}}/> :open? <ExpandMoreIcon style={{color: "#01264a"}} className='list-item'/>: ""}
                        </ListItem>
                        <Collapse in={isDebateCollapse} style={{marginTop: "-5px"}}>
                            <ListItem
                                to='/debate/debate-topics'
                                component={NavLink}

                                style={({ isActive }) =>
                                    isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "20px", height: "28px" } : { color: '#444444', height: "28px", }
                                }
                                className='list-item'
                            >
                                <ListItemText primary={<Typography style={{ fontSize: "12px", textAlign: "right", fontWeight: "bold", }}>Debate Topics</Typography>} />
                            </ListItem>
                            <ListItem
                                to='/debate/debate-rooms'
                                component={NavLink}

                                style={({ isActive }) =>
                                    isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "20px", height: "28px" } : { color: '#444444', height: "28px", }
                                }
                                className='list-item'
                            >
                                <ListItemText primary={<Typography style={{ fontSize: "12px", textAlign: "right", fontWeight: "bold", }}>Active Debate Rooms</Typography>} />
                            </ListItem>
                        </Collapse>
                        <ListItem
                            to='/leaderboard'
                            component={NavLink}

                            style={({ isActive }) =>
                                isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "20px", height: "38px", marginTop: "16px" } : { color: '#444444', height: "38px", marginTop: "16px" }
                            }
                            className='list-item'
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "#444444" }}><LeaderboardIcon style={{ color: "#01264a" }} /></IconButton>
                            </ListItemIcon>
                            <ListItemText primary={<Typography style={{display: !open?"none": ""}}>Leaderboard</Typography>} />
                        </ListItem>
                        <ListItem
                            to='/connect'
                            component={NavLink}

                            style={({ isActive }) =>
                                isActive ? { color: '#444444', backgroundColor: "#d7e7fa", borderRadius: "20px", height: "38px", marginTop: "13px" } : { color: '#444444', height: "38px", marginTop: "13px" }
                            }
                            className='list-item'
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "#444444" }}><HubIcon style={{ color: "#01264a" }} /></IconButton>
                            </ListItemIcon>
                            <ListItemText primary={<Typography style={{display: !open?"none": ""}}>Connect</Typography>} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Root >
    )
}

const Root = styled.div`
.drawer-icon{
    margin-top: 15px;
    padding: 0px;
    color: #444444;
    margin-left: 22px;
    border-radius: 5px;
}
.list-item{
    &:hover{
        background-color: #f0f0f0;
        border-radius: 30px;
    }
}
`

export default DrawerComponent

