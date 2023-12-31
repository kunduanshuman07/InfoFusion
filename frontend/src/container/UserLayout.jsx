import React from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TrendingIcon from '@mui/icons-material/Whatshot';
import PersonalizedIcon from '@mui/icons-material/PersonalVideo';
import PlaygroundIcon from '@mui/icons-material/SportsEsports';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AppBarComponent from '../components/AppBar'
import TrendingPage from '../pages/TrendingPage';
import styled from "styled-components";
import PersonalizedPage from '../pages/PersonalizedPage';
import PlaygroundPage from "../pages/PlaygroundPage";
import FactcheckPage from "../pages/FactcheckPage";
import OverallLeaderboard from '../pages/OverallLeaderboard';
import HelpSupport from '../pages/HelpSupport';
import ScoreCardPage from '../pages/ScoreCardPage';
import { useModal } from '../context/ModalContext';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DebatePage from '../pages/DebatePage';
import OpinionPage from '../pages/OpinionPage';
import SettingsPage from "../pages/SettingsPage";

const UserLayout = () => {
    const { isModalOpen } = useModal();
    const [drawerWidth, setDrawerWidth] = React.useState(230);
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setDrawerWidth(open ? 75 : 220);
        setOpen(!open);
    }
    return (
        <Root style={{ filter: isModalOpen ? 'blur(5px)' : 'none', }} >
            <AppBarComponent />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: "#086D67", color: "white", transition: 'width 250ms' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', cursor: "pointer" }}>
                    <IconButton
                        style={{ marginTop: 15, padding: 0, color: 'white', marginLeft: 22, border: "2px solid white", borderRadius: 5 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon width={16} height="100%" alt="menu" />
                    </IconButton>
                    <List style={{ marginTop: 15 }}>
                        <ListItem
                            to="/"
                            component={NavLink}
                            style={({ isActive }) =>
                                (isActive ? { color: 'white', borderRight: '9px solid white' } : { color: 'white' })}
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "white" }}>
                                    <TrendingIcon
                                        width={16}
                                        height="100%"
                                    />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography>
                                        Trending
                                    </Typography>
                                }
                                style={{ display: open ? "" : "none" }}
                            />
                        </ListItem>
                        <ListItem
                            to="/personalized"
                            component={NavLink}
                            style={({ isActive }) =>
                                (isActive ? { color: 'white', borderRight: '9px solid white' } : { color: 'white' })}
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "white" }}>
                                    <PersonalizedIcon
                                        width={16}
                                        height="100%"
                                    />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography>
                                        Personalized
                                    </Typography>
                                }
                                style={{ display: open ? "" : "none" }}
                            />
                        </ListItem>
                        <ListItem
                            to="/playground"
                            component={NavLink}
                            style={({ isActive }) =>
                                (isActive ? { color: 'white', borderRight: '9px solid white' } : { color: 'white' })}
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "white" }}>
                                    <PlaygroundIcon
                                        width={16}
                                        height="100%"
                                    />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography>
                                        Playground
                                    </Typography>
                                }
                                style={{ display: open ? "" : "none" }}
                            />
                        </ListItem>
                        <ListItem
                            to="/debate"
                            component={NavLink}
                            style={({ isActive }) =>
                                (isActive ? { color: 'white', borderRight: '9px solid white' } : { color: 'white' })}
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "white" }}>
                                    <QuestionAnswerIcon
                                        width={16}
                                        height="100%"
                                    />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography>
                                        Debate
                                    </Typography>
                                }
                                style={{ display: open ? "" : "none" }}
                            />
                        </ListItem>
                        <ListItem
                            to="/your-opinion"
                            component={NavLink}
                            style={({ isActive }) =>
                                (isActive ? { color: 'white', borderRight: '9px solid white' } : { color: 'white' })}
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "white" }}>
                                    <AccessibilityIcon
                                        width={16}
                                        height="100%"
                                    />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography>
                                        Opinion ?
                                    </Typography>
                                }
                                style={{ display: open ? "" : "none" }}
                            />
                        </ListItem>
                        <ListItem
                            to="/fact-check"
                            component={NavLink}
                            style={({ isActive }) =>
                                (isActive ? { color: 'white', borderRight: '9px solid white' } : { color: 'white' })}
                        >
                            <ListItemIcon>
                                <IconButton style={{ color: "white" }}>
                                    <FactCheckIcon
                                        width={16}
                                        height="100%"
                                    />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography>
                                        Fact Check
                                    </Typography>
                                }
                                style={{ display: open ? "" : "none" }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <main style={{ width: "100%" }}>
                <div className='content'>
                    <Routes>
                        <Route path="/" element={<TrendingPage />} />
                        <Route path="/personalized" element={<PersonalizedPage />} />
                        <Route path="/debate" element={<DebatePage />} />
                        <Route path="/your-opinion" element={<OpinionPage />} />
                        <Route path="/playground" element={<PlaygroundPage />} />
                        <Route path="/fact-check" element={<FactcheckPage />} />
                        <Route path="/leaderboard" element={<OverallLeaderboard />} />
                        <Route path='/help-support' element={<HelpSupport />} />
                        <Route path='/settings' element={<SettingsPage />} />
                        <Route path='/score-cards' element={<ScoreCardPage />} />
                    </Routes>
                </div>
            </main>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    .content{
        flexGrow: 1.5;
        padding: 80px;
        overflowX: auto;
        overflowY: hidden;
    }
`;
export default UserLayout

