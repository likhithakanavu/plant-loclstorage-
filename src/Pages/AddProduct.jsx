import React, { useState } from 'react';
import { Container, CssBaseline, Box, TextField, Button, Typography } from '@mui/material';

export default function AddProduct() {

  let initialValue;
  if (localStorage.getItem("Plant") === null) {
    initialValue = [];
  } else {
    initialValue = JSON.parse(localStorage.getItem("Plant"));
  }
  const [value, setValue] = useState(initialValue);


  const [insert, setInsert] = useState({});

  const handleChange = (e) => {
    setInsert({
      ...insert,
      [e.target.name]: e.target.value
    });
  };

  console.log(value ,"value state")
  console.log(insert ,"insert state")


  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlantId = value.length === 0 ? 1 : value[value.length - 1].p_id + 1;
    const details = {
      p_id: newPlantId,
      ...insert 
    };
    const updatedValue = [...value, details]; // Corrected line
    setValue(updatedValue); // Update the state with the new array
 
    localStorage.setItem("Plant", JSON.stringify(updatedValue)); // Store the updated array in localStorage
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        marginTop: 20,
        marginBottom: "50px",
        background: "linear-gradient(180deg, #fde1ff, #e1ffea 80%)",
        padding: "20px",
        borderRadius: "10px",
        width: "1000px"
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Inserting form
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal" 
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            autoComplete="text"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="availability"
            label="Availability"
            type="number"
            onChange={handleChange}
            autoComplete="tel"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            onChange={handleChange}
            label="Price"
            type="number"
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            onChange={handleChange}
            label="Description"
            type="text"
            multiline
            rows={4}
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
             label="image Link"
            fullWidth
            name="image"
            onChange={handleChange}
            type="text"
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
