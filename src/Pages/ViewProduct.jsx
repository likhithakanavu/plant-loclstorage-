import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Logo from '../Assets/logoplant.jpg';
import Update from '../Component/ProductUpdate/Update';
import Modal from '@mui/material/Modal';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ViewProduct() {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]); // Initialize with an empty array
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteid, setDeleteid] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setDeleteid(id);
  }; 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    const idd = deleteid;
    const updatedData = data.filter((e) => e.p_id !== idd);
    setData(updatedData);
    await localStorage.setItem('Plant', JSON.stringify(updatedData));
    setDeleteid(null);
    setDialogOpen(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('Plant'));
    if (storedData) {
      setData(storedData); // Set data only if it's not null
    }
  }, []);

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to clear local storage and reset state
  const handleClear = () => {
    localStorage.removeItem('Plant'); // Clear the specific item from localStorage
    setData([]); // Reset the data state to an empty array
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }}>
        {data.length === 0 ? (
          <Typography variant="h6" style={{ margin: 'auto' }}>
            No Data
          </Typography>
        ) : (
          data.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <CardMedia
                      component="img"
                      image={Logo}
                      alt="avatar"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  }
                  action={
                    <>
                      <IconButton aria-label="settings" onClick={(event) => handleMenuClick(event, card.p_id)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        {/* <MenuItem onClick={handleUpdate}>Update</MenuItem> */}
                        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                      </Menu>
                    </>
                  }
                  title={card.name}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={card.image}
                  alt={card.title}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: '4px',
                    margin: '10px',
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Availability: {card.availability}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹ {card.price}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{card.description}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this item?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to delete this item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <>
          <Update data={data} setData={setData} setOpen={setOpen} selectedId={deleteid} />
        </>
      </Modal>

      {/* Clear Button to clear localStorage and reset data */}
      <Button variant="contained" color="secondary" onClick={handleClear} fullWidth sx={{ mt: 2 }}>
        Clear All Data
      </Button>
    </>
  );
}
