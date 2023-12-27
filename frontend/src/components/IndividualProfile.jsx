import React, { useState } from "react";
import {
    Grid,
    Divider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import { CloseOutlined } from "@mui/icons-material";
const IndividualProfile = (props) => {
    const handleClose = () => {
        props.onCloseModal(false);
    }
    return (
        <Dialog open={true} onClose={props.onCloseModal}>
            <DialogTitle
                sx={{
                    backgroundColor: "#086D67",
                    borderRadius: " 4px 4px 0 0",
                    fontSize: "16px",
                }}
            >
                <Grid container>
                    <Grid xs={8}>
                        <h4 style={{ color: "white" }}>Anshuman Kundu</h4>
                        <CloseOutlined onClick={handleClose}/>
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent style={{ padding: "20px 25px 10px 25px" }}>
                
            </DialogContent>
        </Dialog>
    );
};

export default IndividualProfile;
