import React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { ContentType } from "../../common/const";

function DataCard({
  headerText,
  dataList = [],
  formButtonConfig,
  width = 650,
  padding = 2
}) {
  return (
    <Box
      component="div"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        p: padding,
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ paddingLeft: 2 }}>
        <CardHeader title={headerText} sx={{ textDecoration: "underline" }} />
      </Box>
      <CardContent>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {dataList.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell align="right">
                    {row.valueType === ContentType.IMAGE ? (
                      <Box
                        component="img"
                        src="/barcode.png"
                        alt="Barcode"
                        sx={{
                          verticalAlign: "middle",
                          maxHeight: 180,
                          maxWidth: 350,
                        }}
                      />
                    ) : (
                      row.value
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {formButtonConfig?.length ? (
          <CardActions>
            {formButtonConfig?.map((button) => {
              return (
                <Button
                  key={button.text}
                  type={button.type}
                  variant="outlined"
                  color="secondary"
                  onClick={button.onClick}
                  disabled={button.disabled}
                >
                  {button.text}
                </Button>
              );
            })}
          </CardActions>
        ) : null}
      </CardContent>
    </Box>
  );
}

DataCard.propTypes = {
  headerText: PropTypes.text,
  dataList: PropTypes.array,
  formButtonConfig: PropTypes.array,
  width: PropTypes.number,
  padding: PropTypes.number
};

export default DataCard;
