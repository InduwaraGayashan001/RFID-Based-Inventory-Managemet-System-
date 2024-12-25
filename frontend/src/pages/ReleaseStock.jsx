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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import SaveIcon from '@mui/icons-material/Save';

const columns = [
  { id: 'number', label: 'Number', minWidth: 50 },
  { id: 'stockId', label: 'Stock ID', minWidth: 150 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'releaseCount', label: 'Release Count', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

function ReleaseStock() {
  const [rows, setRows] = React.useState([
    { number: 1, stockId: 'RFID123', productName: 'Product 1', releaseCount: '' },
    { number: 2, stockId: 'RFID124', productName: 'Product 2', releaseCount: '' },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [editIndex, setEditIndex] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        number: prevRows.length + 1,
        stockId: 'Auto-generated',
        productName: '',
        releaseCount: '0', // Default release count
      },
    ]);
  };

  const handleAddRowOnEnter = (index) => {
    if (index === rows.length - 1) {
      handleAddRow();
    }
  };

  const handleDeleteRow = () => {
    const updatedRows = rows
      .filter((_, i) => i !== confirmDelete.index)
      .map((row, i) => ({ ...row, number: i + 1 }));
    setRows(updatedRows);
    setConfirmDelete({ open: false, index: null });
  };

  // const handleEdit = (index) => {
  //   setEditIndex(index);
  // };

  // const handleSave = () => {
  //   setEditIndex(null);
  // };

  // const handleCancelEdit = () => {
  //   setEditIndex(null);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openConfirmDelete = (index) => {
    setConfirmDelete({ open: true, index });
  };

  const closeConfirmDelete = () => {
    setConfirmDelete({ open: false, index: null });
  };

  const handleSubmit = () => {
    const invalidRows = rows.filter((row) => row.releaseCount === '' || row.releaseCount <= 0);
    if (invalidRows.length > 0) {
      alert('Please ensure all rows have a valid release count before submitting.');
      return;
    }
    console.log('Released rows:', rows);
    // Logic to submit the release stock data to the backend
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* <div style={{ padding: '16px' }}> */}
      <div >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: '2.0rem',
            fontWeight: 'bold',
            color: '#1976d2', // Primary color for heading
          }}
        >
          Release Stock
        </Typography>
      </div>

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddRowOnEnter(index)}
                >
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.stockId}</TableCell>
                  <TableCell>
                    {/* {editIndex === index ? (
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
                    ) : ( */}
                      {row.productName}
                    {/* )} */}
                  </TableCell>
                  
                  <TableCell>
                  {/* {editIndex === index ? (
                    <TextField
                      type="number"
                      value={row.releaseCount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0) {
                          handleRowChange(index, 'releaseCount', value);
                        }
                      }}
                      fullWidth
                      placeholder="Enter Release Count"
                    />
                  ) : ( */}
                    <>
                      
                      <TextField
                        type="number"
                        value={row.releaseCount || ''}
                        onChange={(e) => handleRowChange(index, 'releaseCount', e.target.value)}
                        placeholder="Add Release Count"
                        size="small"
                        style={{ marginLeft: '8px' }}
                      />
                    </>
                  {/* )} */}
                </TableCell>

                  {/* <TableCell>
                    {editIndex === index ? (
                      <>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                          Save
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="contained" onClick={() => handleEdit(index)}>
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => openConfirmDelete(index)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell> */}

                  <TableCell>
                    {/* {editIndex === index ? (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#24A0ED',
                            color: 'white',
                            marginRight: '8px',
                          }}
                          onClick={handleSave}
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#d11a2a',
                            color: 'white',
                          }}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : ( */}
                      <>
                        {/* <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#24A0ED',
                            color: 'white',
                            marginRight: '8px',
                          }}
                          onClick={() => handleEdit(index)}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button> */}
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#d11a2a',
                            color: 'white',
                          }}
                          onClick={() => openConfirmDelete(index)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </>
                    {/* )} */}
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
          Add Item
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Release
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
            Are you sure you want to delete this item?
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
    </Paper>
  );
}

export default ReleaseStock;
