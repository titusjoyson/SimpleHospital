import * as React from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function CustomPaginationActionsTable({
  title,
  headers,
  rows,
  rowsActions,
  titleSx = {},
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        p: 2,
        marginBottom: 3,
        ...titleSx,
      }}
    >
      <CardHeader sx={titleSx} title={title}></CardHeader>
      <TableContainer sx={{ p: 2, paddingBottom: 0 }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <StyledTableRow
              key={`row_header`}
              sx={{ backgroundColor: "primary" }}
            >
              {headers.map((column, idx) => (
                <StyledTableCell
                  key={`column_header_${idx}`}
                  component="th"
                  variant="head"
                  sx={{
                    backgroundColor: "background.paper",
                  }}
                >
                  {column}
                </StyledTableCell>
              ))}
              {rowsActions?.length && (
                <StyledTableCell
                  key={`column_header_${headers.length}`}
                  component="th"
                  variant="head"
                  sx={{
                    backgroundColor: "background.paper",
                    paddingLeft: 5,
                  }}
                >
                  Action
                </StyledTableCell>
              )}
            </StyledTableRow>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, rowIdx) => (
              <StyledTableRow key={`row_${rowIdx}`}>
                {row.map((column, cidx) => (
                  <StyledTableCell key={`column_${rowIdx}_${cidx}`}>
                    {column}
                  </StyledTableCell>
                ))}
                {rowsActions?.length && (
                  <StyledTableCell key={`column_${rowIdx}_${row.length}`}>
                    <CardActions>
                      {rowsActions.map((action, aidx) => (
                        <Button
                          key={`column_action_${rowIdx}_${row.length}_${aidx}`}
                          size="small"
                          variant="text"
                          onClick={() => action.onClick(rowIdx)}
                          disabled={action.disabled}
                        >
                          {action.text}
                        </Button>
                      ))}
                    </CardActions>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ paddingRight: 2 }}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        slotProps={{
          select: {
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Box>
  );
}

CustomPaginationActionsTable.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array,
  rows: PropTypes.array,
  rowsActions: PropTypes.array,
  titleSx: PropTypes.object,
};

CustomPaginationActionsTable.defaultProps = {
  headers: [],
  rows: [],
};

export default CustomPaginationActionsTable;
