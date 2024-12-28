import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const API_RRELEASE_URL = 'http://localhost:8080/api/releases';
const API_LAST_ITEM_URL = 'http://localhost:8080/api/releases/last';

function ReleaseStock() {
  const [stock, setStock] = React.useState(null);
  //const [selectedStockId, setSelectedStockId] = React.useState('');
  React.useEffect(() => {
    axios
      .get(API_LAST_ITEM_URL)
      .then((response) => {
        const product = response.data;
        setStock({
          transactionId: product.transactionId,
          rfId: product.rfid,
          releaseQuantity: product.releaseQuantity,
          releasePrice : product.releasePrice,
          time: product.timestamp,
          
        });
        console.log('Getting Payload:', product);
      })
      .catch((error) => {
        console.error('Error fetching the latest stock:', error);
      });
    }, []);

  const handleFieldChange = (field, value) => {
    setStock((prevStock) => ({
      ...prevStock,
      [field]: value,
    }));
  };

  

  const handleSubmit = () => {
      if (stock.releaseQuantity <= 0 || stock.releasePrice <= 0) {
      alert('Please provide valid count and purchasing price.');
      return;
    }

    const payload = {
      transactionId: stock.transactionId,
      rfId: stock.rfId,
      releaseQuantity: stock.releaseQuantity,
      releasePrice : stock.releasePrice,
    };
    console.log('Putting Payload:', payload);

    axios
      .put(`${API_RRELEASE_URL}/${stock.transactionId}`, payload)
      .then(() => {
        alert('Stock Released successfully!');
      })
      .catch((error) => {
        console.error('Error releasinging stock:', error);
        alert('Failed to release stock. Check the console for details.');
      });
  };

  if (!stock) {
    return <Typography>Loading stock details...</Typography>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontSize: '2.0rem',
          fontWeight: 'bold',
          color: '#1976d2',
        }}
      >
        Release Stock
      </Typography>

      <TableContainer>
        <Table stickyHeader aria-label="stock table">
          <TableHead>
            <TableRow>
            <TableCell>Transaction ID</TableCell>
              <TableCell>Stock ID</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Releasing Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{stock.transactionId}</TableCell>
              <TableCell>{stock.rfId}</TableCell>
              <TableCell>{stock.time}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value= {stock.releaseQuantity}
                  onChange={(e) => handleFieldChange('releaseQuantity', e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={stock.releasePrice}
                  onChange={(e) => handleFieldChange('releasePrice', e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Release
        </Button>
      </div>
    </Paper>
  );
}

export default ReleaseStock;