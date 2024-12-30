import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api/dashboard/summary';

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setSummary(response.data);
      } catch (err) {
        setError('Failed to load dashboard summary');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const renderCard = (title, value, valueColor) => (
    <Card
      sx={{
        minWidth: 200,
        maxWidth: 300,
        backgroundColor: '#e3f2fd',
        boxShadow: 3,
        margin: '10px',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Keep the title at the top
          height: '100%', // Ensure the content fills the card height
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center', // Center the title horizontally
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            flexGrow: 1, // Fill available space
          }}
        >
          <Typography
            variant="h4"
            component="p"
            sx={{
              color: valueColor, // Use dynamic color for the value
              fontWeight: 'bold', // Make the value bold
              textAlign: 'center', // Ensure the text is centered horizontally
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: 'flex-start' }}>
          <Grid item xs={12} sm={4}>
            {renderCard('Total Products', summary.totalProducts, '#003366')}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderCard('Total Available Units', summary.totalStockQuantity, '#003366')}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderCard('Total Units Released', summary.totalReleaseUnits, '#003366')}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderCard(
              'Total Purchase Price',
              `LKR ${summary.totalPurchasePrice.toLocaleString()}`,
              'red' // Red color for purchase price
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderCard(
              'Total Revenue',
              `LKR ${summary.totalRevenue.toLocaleString()}`,
              '#FFB300' // Yellow color for revenue
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderCard(
              'Total Profit',
              `LKR ${summary.totalProfit.toLocaleString()}`,
              'green' // Green color for profit
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;

