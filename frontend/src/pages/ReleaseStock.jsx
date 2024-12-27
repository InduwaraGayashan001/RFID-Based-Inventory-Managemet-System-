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
const API_LAST_ITEM_URL = 'http://localhost:8080/api/stocks/last';

function ReleaseStock() {
  const [stock, setStock] = React.useState(null);
  const [productOptions, setProductOptions] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState('');


  React.useEffect(() => {
    // Fetch the latest stock item
    axios
      .get(API_LAST_ITEM_URL)
      .then((response) => {
        const product = response.data;
        setStock({
          stockId: product.rfid,
          productId: product.productId,
          count: product.quantity,
          purchasingPrice: product.stockPrice,
          
        });
      
        setSelectedProduct(product.productId); // Set the default selected product
        console.log('Selected product:', selectedProduct);
        
      })
      .catch((error) => {
        console.error('Error fetching the latest stock:', error);
      });

    // Fetch product options for dropdown
     // Fetch product options for dropdown
     axios
     .get('http://localhost:8080/api/products')
     .then((response) => {
       setProductOptions(response.data);
       console.log('Product options:', response.data);
       
     })
     .catch((error) => {
       console.error('Error fetching product options:', error);
     });
    }, []);

  const handleFieldChange = (field, value) => {
    setStock((prevStock) => ({
      ...prevStock,
      [field]: value,
    }));
  };

  

  const handleSubmit = () => {
    
    if (stock.count <= 0 || stock.purchasingPrice <= 0) {
      alert('Please provide valid count and purchasing price.');
      return;
    }

    const payload = {
      rfid: stock.stockId,
      productId: selectedProduct, // Use selected product ID
      quantity: parseInt(stock.count, 10), // Ensure numeric values
      stockPrice: parseFloat(stock.purchasingPrice), // Ensure numeric values
    };
    console.log('Payload:', payload);

    axios
      .put(`${API_BASE_URL}/${stock.stockId}`, payload)
      .then(() => {
        alert('Stock Added successfully!');
      })
      .catch((error) => {
        console.error('Error updating stock:', error);
        alert('Failed to update stock. Check the console for details.');
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
              <TableCell>Stock ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Purchasing Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{stock.stockId}</TableCell>
              <TableCell>{stock.productId}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value= {stock.count}
                  onChange={(e) => handleFieldChange('count', e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={stock.purchasingPrice}
                  onChange={(e) => handleFieldChange('purchasingPrice', e.target.value)}
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
