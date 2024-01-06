import React from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import TrendingIcon from '@mui/icons-material/Whatshot';
import PersonalizedIcon from '@mui/icons-material/PersonalVideo';
import PlaygroundIcon from '@mui/icons-material/SportsEsports';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DrawerItem from './DrawerItem';
import styled from "styled-components"
const DrawerComponent = () => {
    const [drawerWidth, setDrawerWidth] = React.useState(230);
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setDrawerWidth(open ? 75 : 220);
        setOpen(!open);
    }
    return (
        <Root>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: "#063d40", boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)", transition: 'width 250ms' },
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
                    <List style={{ marginTop: 15}}>
                        <DrawerItem to="/" icon={<TrendingIcon width={16} height="100%" open={open} />} text="Trending" />
                        <DrawerItem to="/personalized" icon={<PersonalizedIcon width={16} height="100%" open={open} />} text="Personalized" />
                        <DrawerItem to="/playground" icon={<PlaygroundIcon width={16} height="100%" open={open} />} text="Playground" />
                        <DrawerItem to="/debate" icon={<QuestionAnswerIcon width={16} height="100%" open={open} />} text="Debate" />
                        <DrawerItem to="/your-opinion" icon={<AccessibilityIcon width={16} height="100%" open={open} />} text="Opinion ?" />
                        <DrawerItem to="/fact-check" icon={<FactCheckIcon width={16} height="100%" open={open} />} text="Fact Check" />
                    </List>
                </Box>
            </Drawer>
        </Root>
    )
}

const Root = styled.div`
.drawer-icon{
    margin-top: 15px;
    padding: 0px;
    color:white;
    margin-left: 22px;
    border: 2px solid #edfeff;
    border-radius: 5px;
}
`

export default DrawerComponent

