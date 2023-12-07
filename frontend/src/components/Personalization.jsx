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
import { countries } from "../utils/Countries";
import { newsCategories } from "../utils/newsCategories";


const AddCredentialKey = (props) => {

    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");

    const handleAddPreferrences = () => {
        const prefUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=63ad2b1e940942df92a9bec4373642e3`;
        console.log(prefUrl);
        props.setPersonalizedUrl(prefUrl);
        props.setOpenModal(false);
    }

    return (
        <Dialog open={true} onClose={() => props.setOpenModal(false)}>
            <DialogTitle
                sx={{
                    backgroundColor: "#086D67",
                    borderRadius: " 4px 4px 0 0",
                    fontSize: "16px",
                }}
            >
                <Grid container>
                    <Grid xs={18}>
                        <h3 style={{ color: "white" }}>Add your preferrences</h3>
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent >
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={18}>
                            <InputLabel>Country</InputLabel>
                            <TextField
                                name="country"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={country}
                                onChange={(e) =>{ console.log(e.target); setCountry(e.target.value)}}
                                select
                            >
                                {countries.map((option) => {
                                    return (
                                        <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
                                    )
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={18}>
                            <InputLabel required>Category</InputLabel>
                            <TextField
                                name="category"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={category}
                                onChange={(e) =>{ console.log(e.target); setCategory(e.target.value)}}
                                select
                            >
                                {newsCategories.map((category) => {
                                    return (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    )
                                })}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        style={{
                            marginTop: "25px",
                            marginLeft: "auto",
                        }}
                    >
                        <Button
                            onClick={handleAddPreferrences}
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "#086D67", textTransform: "none", width: "100px" }}
                        >
                            Add
                        </Button>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCredentialKey;

