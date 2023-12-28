import React from 'react'
import { Box, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Header = ({ title }) => {
    return (
        <Box style={{
            display: "flex",
            flexDirection: "row",
            color: "#086D67",
            borderBottom: "3px solid #086D67",
            paddingBottom: "10px"
        }}>
            <Typography variant='h4' style={{ borderBlock: "10px" }}>{title}</Typography>
            <TextField style={{ marginLeft: "auto" }} size='small' label='Search Topics' placeholder='Search Topics' InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton  size='small'>
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                )
            }} />
        </Box>
    )
}

export default Header