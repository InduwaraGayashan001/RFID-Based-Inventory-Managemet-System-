import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'number', label: 'Number', minWidth: 50 },
  { id: 'stockId', label: 'Stock ID', minWidth: 150 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'count', label: 'Count', minWidth: 100 },
  { id: 'purchasingPrice', label: 'Purchasing Price', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

function AddStock() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        number: prevRows.length + 1,
        stockId: 'Auto-generated',
        productName: '',
        count: '',
        purchasingPrice: '',
      },
    ]);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleDeleteRow = () => {
    const updatedRows = rows
      .filter((_, i) => i !== confirmDelete.index)
      .map((row, i) => ({ ...row, number: i + 1 }));
    setRows(updatedRows);
    closeConfirmDelete();
  };

  const openConfirmDelete = (index) => {
    setConfirmDelete({ open: true, index });
  };

  const closeConfirmDelete = () => {
    setConfirmDelete({ open: false, index: null });
  };

  const handleSubmit = () => {
    const invalidRows = rows.filter((row) => row.count === '' || row.count <= 0);
    if (invalidRows.length > 0) {
      alert('Please ensure all rows have a valid stock count before submitting.');
      return;
    }
    console.log('Released rows:', rows);
    // Logic to submit the release stock data to the backend
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* <div style={{  padding: '16px' }}> */}
      <div >
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
        Add Stock
      </Typography>

      <TableContainer sx={{ maxHeight: 370 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.stockId}</TableCell>
                <TableCell>
                  <Select
                    value={row.productName}
                    onChange={(e) => handleRowChange(index, 'productName', e.target.value)}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Select Product</em>
                    </MenuItem>
                    <MenuItem value="Product 1">Product 1</MenuItem>
                    <MenuItem value="Product 2">Product 2</MenuItem>
                    <MenuItem value="Product 3">Product 3</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.count}
                    onChange={(e) => handleRowChange(index, 'count', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.purchasingPrice}
                    onChange={(e) => handleRowChange(index, 'purchasingPrice', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#d11a2a', color: 'white' }}
                  onClick={() => openConfirmDelete(index)}
                  startIcon={<DeleteIcon />}
                >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <Button variant="contained" onClick={handleAddRow}>
          Add Stock Item
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <Dialog
        open={confirmDelete.open}
        onClose={closeConfirmDelete}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete this stock ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRow} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </Paper>
  );
}

export default AddStock;
