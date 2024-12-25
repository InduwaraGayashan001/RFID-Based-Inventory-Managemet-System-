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

const columns = [
  { id: 'number', label: 'Number', minWidth: 50 },
  { id: 'stockId', label: 'Stock ID', minWidth: 150 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'count', label: 'Count', minWidth: 100 },
  { id: 'purchasingPrice', label: 'Purchasing Price', minWidth: 150 },
  { id: 'delete', label: 'Delete', minWidth: 100 },
];

function AddStock() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        number: prevRows.length + 1,
        stockId: 'Auto-generated', // Replace with actual RFID reader logic
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

  const handleDeleteRow = (index) => {
    const updatedRows = rows
      .filter((_, i) => i !== index)
      .map((row, i) => ({ ...row, number: i + 1 }));
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    console.log('Submitted rows:', rows);
    // Add logic to send the rows data to the backend here
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.stockId}</TableCell>
                  <TableCell>
                    <Select
                      value={row.productName}
                      onChange={(e) =>
                        handleRowChange(index, 'productName', e.target.value)
                      }
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
                      onChange={(e) =>
                        handleRowChange(index, 'count', e.target.value)
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={row.purchasingPrice}
                      onChange={(e) =>
                        handleRowChange(index, 'purchasingPrice', e.target.value)
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteRow(index)}
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
          Add Row
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Paper>
  );
}

export default AddStock;
