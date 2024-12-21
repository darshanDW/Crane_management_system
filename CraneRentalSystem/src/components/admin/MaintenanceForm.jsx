import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Grid
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

export default function MaintenanceForm({ craneId, onSubmit }) {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    date: '',
    technician: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}api/maintenance`, {
        ...formData,
        craneId
      });
      onSubmit();
    } catch (error) {
      console.error('Error creating maintenance record:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Maintenance Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Technician"
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Add Maintenance Record
        </Button>
      </Box>
    </Box>
  );
}

