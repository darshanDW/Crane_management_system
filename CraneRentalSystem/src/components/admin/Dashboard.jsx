import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Fade
} from '@mui/material';
import {
  Description as DescriptionIcon,
  PendingActions as PendingActionsIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingContracts: 0,
    signedContracts: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [quotes, contracts] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}api/quotes`),
          axios.get(`${import.meta.env.VITE_API_URL}api/contracts`)
        ]);

        const totalQuotes = quotes.data.length;
        const pendingContracts = contracts.data.filter(c => c.status === 'draft').length;
        const signedContracts = contracts.data.filter(c => c.status === 'signed').length;
        const revenue = quotes.data.reduce((sum, quote) => sum + quote.totalPrice, 0);

        setStats({ totalQuotes, pendingContracts, signedContracts, revenue });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <Fade in={!loading} timeout={800}>
      <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="p" fontWeight="bold">
          {typeof value === 'number' && title === 'Total Revenue' ? `$${value.toLocaleString()}` : value}
        </Typography>
      </Paper>
    </Fade>
  );

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Quotes"
              value={stats.totalQuotes}
              icon={<DescriptionIcon fontSize="large" color="primary" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Contracts"
              value={stats.pendingContracts}
              icon={<PendingActionsIcon fontSize="large" color="warning" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Signed Contracts"
              value={stats.signedContracts}
              icon={<AssignmentTurnedInIcon fontSize="large" color="success" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value={stats.revenue}
              icon={<AttachMoneyIcon fontSize="large" color="secondary" />}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

