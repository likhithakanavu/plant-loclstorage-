import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Update({ setOpen, selectedId, data, setData }) {
    const [update, setUpdate] = useState({});
    
    useEffect(() => {
      if (data) {
        const updatedData = data.find((e) => e.p_id === selectedId);
        if (updatedData) {
          setUpdate(updatedData); // Set the selected data for updating
        }
      }
    }, [selectedId, data]);
  


    const handleChange = (e) => {
      setUpdate({ ...update, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      const updatedItems = data.map((item) =>
        item.p_id === update.p_id ? update : item
      );
      setData(updatedItems);
      localStorage.setItem("Plant", JSON.stringify(updatedItems));
      setOpen(false); // Close the modal after updating
    };
  
    return (
      <Box sx={style}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Update form
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              value={update?.name || ''}
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
              value={update?.availability || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              value={update?.price || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              multiline
              rows={4}
              value={update?.description || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image URL"
              type="text"
              value={update?.image || ''}
              onChange={handleChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
  
