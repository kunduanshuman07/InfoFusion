import { Box, IconButton, Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import AppBarComponent from "../components/AppBarComponent";
import EditProfileComponent from "../components/EditProfileComponent";
const EditProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Root>
            <AppBarComponent />
            <EditProfileComponent />
        </Root>
    )
}
const Root = styled.div`
`
export default EditProfilePage