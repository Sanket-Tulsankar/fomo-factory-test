import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/index';
import { getData } from '../redux/store/dataState';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



 const PriceData: React.FC =()=> {
  const dispatch: AppDispatch = useDispatch();
  const { prices, loading } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(getData());
    const interval = setInterval(() => dispatch(getData()), 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>      
    {Object.keys(prices).map(id => (
             <div key={id}>
             <h2>{id}</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices[id]?.map((price,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{price.price}</StyledTableCell>
              <StyledTableCell align="right">{price.time}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>
    ))}
</div>
  );
}

export default PriceData;


