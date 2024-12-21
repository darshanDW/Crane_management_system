import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Fade
} from '@mui/material';
import {
  Build as BuildIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Add as AddIcon
} from '@mui/icons-material';
import MaintenanceForm from './MaintenanceForm';

export default function MaintenanceDashboard() {
  const [cranes, setCranes] = useState([]);
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCranes();
  }, []);

  useEffect(() => {
    if (selectedCrane) {
      fetchMaintenanceRecords(selectedCrane._id);
    }
  }, [selectedCrane]);

  const fetchCranes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/cranes`);
      setCranes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cranes:', error);
      setLoading(false);
    }
  };

  const fetchMaintenanceRecords = async (craneId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/maintenance/${craneId}`);
      setMaintenanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    if (selectedCrane) {
      fetchMaintenanceRecords(selectedCrane._id);
    }
    fetchCranes();
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        Maintenance Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Crane List
              </Typography>
              <List>
                {cranes.map((crane) => (
                  <ListItem
                    key={crane._id}
                    button
                    selected={selectedCrane?._id === crane._id}
                    onClick={() => setSelectedCrane(crane)}
                  >
                    <ListItemIcon>
                      <BuildIcon color={selectedCrane?._id === crane._id ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Crane #${crane.craneNumber}`}
                      secondary={`Type: ${crane.type}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            {selectedCrane && (
              <Fade in={true}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Maintenance History - Crane #{selectedCrane.craneNumber}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setShowForm(true)}
                    >
                      Add Record
                    </Button>
                  </Box>

                  {showForm && (
                    <Box sx={{ mb: 3 }}>
                      <MaintenanceForm
                        craneId={selectedCrane._id}
                        onSubmit={handleFormSubmit}
                      />
                    </Box>
                  )}

                  <List>
                    {maintenanceRecords.map((record, index) => (
                      <React.Fragment key={record._id}>
                        {index > 0 && <Divider />}
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={record.type}
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {record.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                                    <Typography variant="body2">{record.technician}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
                                    <Typography variant="body2">
                                      {new Date(record.date).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                </Box>
                              </>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Fade>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

