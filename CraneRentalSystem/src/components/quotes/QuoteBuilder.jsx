import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Container
} from '@mui/material';
import PriceCalculator from './PriceCalculator';

export default function QuoteBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { crane } = location.state || {};

  const [formData, setFormData] = useState({
    craneType: crane?.type || '',
    capacity: crane?.capacity || '',
    rent: crane?.hourlyRate || '',
    rentalDuration: '',
    startDate: '',
    additionalServices: [],
    operatorRequired: false,
    clientInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}api/quotes`, formData);
      console.log(response.data);
      navigate(`/contracts/${response.data._id}`, { state: { craneId: crane._id } });
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('client.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        clientInfo: { ...prev.clientInfo, [field]: value }
      }));
    } else if (type === 'checkbox' && name === 'additionalServices') {
      const service = value;
      setFormData((prev) => ({
        ...prev,
        additionalServices: checked
          ? [...prev.additionalServices, service]
          : prev.additionalServices.filter((s) => s !== service)
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>
        Create Quote
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Crane Type"
          name="craneType"
          value={formData.craneType}
          InputProps={{ readOnly: true }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Capacity (tons)"
          name="capacity"
          type="number"
          value={formData.capacity}
          InputProps={{ readOnly: true }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Rent per Hour"
          name="rent"
          type="number"
          value={formData.rent}
          InputProps={{ readOnly: true }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Rental Duration (days)"
          name="rentalDuration"
          type="number"
          value={formData.rentalDuration}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="operatorRequired"
              checked={formData.operatorRequired}
              onChange={handleChange}
            />
          }
          label="Do you require an operator?"
        />
        <PriceCalculator formData={formData} />
        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
          Client Information
        </Typography>
        {['name', 'email', 'phone', 'company'].map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={`client.${field}`}
            type={field === 'email' ? 'email' : 'text'}
            value={formData.clientInfo[field]}
            onChange={handleChange}
            required={field !== 'phone'}
            margin="normal"
          />
        ))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Generate Quote
        </Button>
      </Box>
    </Container>
  );
}

