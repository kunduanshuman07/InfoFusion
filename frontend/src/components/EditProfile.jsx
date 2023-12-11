import React, { useState } from "react";
import {
    Grid,
    Divider,
    InputLabel,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";


const EditProfile = (props) => {
    // const [phone, setPhone] = useState('123-456-7890');
    // const [age, setAge] = useState('25');
    // const [gender, setGender] = useState('Male');
    // const [education, setEducation] = useState('Bachelor\'s Degree');
    // const [employment, setEmployment] = useState('Software Engineer');
    // const [city, setCity] = useState('');
    // const [state, setState] = useState('');
    // const [pincode, setPincode] = useState('');
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
                        <h4 style={{ color: "white" }}>Edit Profile</h4>
                    </Grid>
                    <Grid xs={8}></Grid>
                    <Grid xs={1}></Grid>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent style={{ padding: "20px 25px 10px 25px" }}>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <InputLabel required>Phone</InputLabel>
                            <TextField
                                name="credentialKey"
                                variant="outlined"
                                fullWidth
                                size="small"
                                disabled={props?.isEditable ? true : false}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Age</InputLabel>
                            <TextField
                                name="userName"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Gender</InputLabel>
                            <TextField
                                name="authPassphrase"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Education</InputLabel>
                            <TextField
                                name="education"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Employment</InputLabel>
                            <TextField
                                name="employment"
                                variant="outlined"
                                fullWidth
                                size="small"
                                
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>City</InputLabel>
                            <TextField
                                name="city"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>State</InputLabel>
                            <TextField
                                name="state"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Pincode</InputLabel>
                            <TextField
                                name="pincode"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid
                            item
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                style={{
                                    marginRight: "10px",
                                    textTransform: "none",
                                    width: "100px",
                                    background: "#D9D9D9",
                                    color: "#000",
                                    padding: "6px 10px 5px 10px",
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                // onClick={handleUpdate}
                                variant="contained"
                                style={{
                                    backgroundColor: "#086D67",
                                    color: "white",
                                    textTransform: "none",
                                    width: "100px",
                                    padding: "6px 10px 5px 10px",
                                }}
                            >
                                {props.isEditable ? "Update" : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;
