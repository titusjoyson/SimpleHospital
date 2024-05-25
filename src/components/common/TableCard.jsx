import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import CardHeader from "@mui/material/CardHeader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.selected,
    //   color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableCard({ title, rows, titleSx = {} }) {
  return (
    <Box
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        ...titleSx,
      }}
    >
      {title ? <CardHeader sx={titleSx} title={title}></CardHeader> : null}
      <TableContainer sx={{ padding: 2, paddingTop: 0, paddingBottom: 0 }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {rows.map((row, rowIdx) => (
              <StyledTableRow key={`row_${rowIdx}`}>
                {row.map((column, cidx) => (
                  <StyledTableCell key={`column_${rowIdx}_${cidx}`}>
                    {column.label}: {column.value}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

TableCard.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.array,
  titleSx: PropTypes.object,
};

TableCard.defaultProps = {
  rows: [],
};

export default TableCard;
