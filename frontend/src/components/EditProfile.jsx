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
import axios from "axios";
const educationOptions = [
    {
        value: "Below High School",
        label: "Below High School",
    },
    {
        value: "High School",
        label: "High School",
    },
    {
        value: "Undergraduate",
        label: "Undergraduate",
    },
    {
        value: "Graduate",
        label: "Graduate",
    },
];
const employmentOptions = [
    {
        value: "Unemployed",
        label: "Unemployed",
    },
    {
        value: "Selfemployed",
        label: "Selfemployed",
    },
    {
        value: "Employed",
        label: "Employed",
    },
];
const EditProfile = (props) => {
    const [phone, setPhone] = useState(props.values.phone);
    const [age, setAge] = useState(props.values.age);
    const [gender, setGender] = useState(props.values.gender);
    const [education, setEducation] = useState(props.values.education);
    const [employment, setEmployment] = useState(props.values.employment);
    const [city, setCity] = useState(props.values.city);
    const [state, setState] = useState(props.values.state);
    const [pincode, setPincode] = useState(props.values.pincode);
    const handleClose = () => {
        props.onCloseModal(false);
    }
    const handleUpdate = async () => {
        const updatedData = {
           id: props.values._id, phone, age, gender, education, employment, city, state, pincode
        }
        const {data, status} = await axios.patch('http://localhost:3000/user/update-profile', updatedData); 
        if(status===200){
            localStorage.setItem("user", JSON.stringify(data.updatedUser));
            handleClose();
        }
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
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent style={{ padding: "20px 25px 10px 25px" }}>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <InputLabel required>Phone</InputLabel>
                            <TextField
                                name="phone"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Age</InputLabel>
                            <TextField
                                name="age"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Gender</InputLabel>
                            <TextField
                                name="gender"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Education</InputLabel>
                            <TextField
                                name="education"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={education}
                                select
                                onChange={(e) => setEducation(e.target.value)}
                            >
                                {educationOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Employment</InputLabel>
                            <TextField
                                name="employment"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={employment}
                                select
                                onChange={(e) => setEmployment(e.target.value)}
                            >
                                {employmentOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>City</InputLabel>
                            <TextField
                                name="city"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>State</InputLabel>
                            <TextField
                                name="state"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel required>Pincode</InputLabel>
                            <TextField
                                name="pincode"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
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
                                onClick={handleUpdate}
                                variant="contained"
                                style={{
                                    backgroundColor: "#086D67",
                                    color: "white",
                                    textTransform: "none",
                                    width: "100px",
                                    padding: "6px 10px 5px 10px",
                                }}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;