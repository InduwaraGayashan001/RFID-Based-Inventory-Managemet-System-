import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [productProfits, setProductProfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SUMMARY_API_URL = 'http://localhost:8080/api/dashboard/summary';
  const PROFITS_API_URL = 'http://localhost:8080/api/dashboard/product-profits';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryResponse, profitsResponse] = await Promise.all([
          axios.get(SUMMARY_API_URL),
          axios.get(PROFITS_API_URL),
        ]);
        setSummary(summaryResponse.data);
        setProductProfits(profitsResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          justifyContent: 'flex-start',
          height: '100%',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h4"
            component="p"
            sx={{
              color: valueColor,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const renderProductProfitsTable = () => (
    <Table
      sx={{
        marginTop: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TableHead
        sx={{
          backgroundColor: '#1976d2',
          '& .MuiTableCell-root': {
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          },
        }}
      >
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell align="right">Units Available</TableCell>
          <TableCell align="right">Units Released</TableCell>
          <TableCell align="right">Profit (LKR)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {productProfits.map((product) => (
          <TableRow
            key={product.productId}
            sx={{
              '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
              '&:hover': { backgroundColor: '#e3f2fd' },
            }}
          >
            <TableCell sx={{ textAlign: 'center', color: '#555' }}>
              {product.productName}
            </TableCell>
            <TableCell align="center" sx={{ color: '#555' }}>
              {product.stockQuantity}
            </TableCell>
            <TableCell align="center" sx={{ color: '#555' }}>
              {product.releaseQuantity}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'green' }}>
              {product.profit.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Dashboard Header */}
      <Box
        sx={{
          padding: '10px',
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Overall Performance
        </Typography>
      </Box>

      {/* Loading or Error State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Cards Section */}
          <Grid container spacing={3} sx={{ justifyContent: 'flex-start' }}>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Products', summary.totalProducts, '#003366')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Units Available ', summary.totalStockQuantity, '#003366')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Units Released', summary.totalReleaseUnits, '#003366')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Purchase Price', `LKR ${summary.totalPurchasePrice.toLocaleString()}`, 'red')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Revenue', `LKR ${summary.totalRevenue.toLocaleString()}`, '#FFB300')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Profit', `LKR ${summary.totalProfit.toLocaleString()}`, 'green')}
            </Grid>
          </Grid>

          {/* Product Profits Table */}
          <Typography
            variant="h5"
            component="h2"
            sx={{ marginTop: '30px', fontWeight: 'bold', color: '#1976d2' }}
          >
            Product Performance
          </Typography>
          {renderProductProfitsTable()}
        </>
      )}
    </Box>
  );
}

export default Dashboard;


