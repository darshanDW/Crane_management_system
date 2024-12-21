import React, { useState, useEffect } from 'react';
import AdminDashboard from '../../pages/AdminDashboard';
import axios from 'axios';


import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Fade,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CraneForm from './CraneForm';

export default function CraneInventory() {
  const [cranes, setCranes] = useState([]);
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCranes();
  }, []);

  const fetchCranes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/cranes`);
      setCranes(response.data);
    } catch (error) {
      console.error('Error fetching cranes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crane?')) {
      try {
        setLoading(true);
        await axios.delete(`${import.meta.env.VITE_API_URL}api/cranes/${id}`);
        fetchCranes();
      } catch (error) {
        console.error('Error deleting crane:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedCrane(null);
    fetchCranes();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'rented':
        return 'error';
      default:
        return 'warning';
    }
  };
  return (

    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <AdminDashboard/>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        
        <Typography variant="h4" component="h2">
          Crane Inventory
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
        >
          Add New Crane
        </Button>
      </Box>

      <Fade in={showForm}>
        <Box sx={{ marginBottom: 3 }}>
          {showForm && (
            <Paper elevation={3} sx={{ padding: 3 }}>
              <CraneForm
                crane={selectedCrane}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedCrane(null);
                }}
              />
            </Paper>
          )}
        </Box>
      </Fade>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crane Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cranes.map((crane) => (
              <TableRow key={crane._id} hover>
                <TableCell>{crane.craneNumber}</TableCell>
                <TableCell>{crane.type}</TableCell>
                <TableCell>{crane.capacity} tons</TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    ${crane.hourlyRate.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    per hour
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={crane.status}
                    color={getStatusColor(crane.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedCrane(crane);
                      setShowForm(true);
                    }}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(crane._id)}
                    disabled={loading}
                    size="small"
                  >
                    {loading ? <CircularProgress size={24} /> : <DeleteIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

