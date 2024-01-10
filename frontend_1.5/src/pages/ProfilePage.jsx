import { Box, IconButton, Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import AppBarComponent from "../components/AppBarComponent";
import ProfileDashboard from '../components/ProfileDashboard';
const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Root>
            <AppBarComponent />
            <ProfileDashboard/>
        </Root>
    )
}
const Root = styled.div`
`
export default ProfilePage