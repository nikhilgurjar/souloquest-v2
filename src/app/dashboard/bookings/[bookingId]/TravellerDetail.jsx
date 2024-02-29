import { format } from "date-fns";
// @mui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import ListItemText from "@mui/material/ListItemText";
import TableContainer from "@mui/material/TableContainer";
// components
import Label from "@/components/label";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";
import { TableHeadCustom } from "@/components/table";

export default function TravellerDetails({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData?.map((row) => (
                <TravellerDetailsRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

function TravellerDetailsRow({ row }) {
  return (
    <>
      <TableRow>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          {row.prefix} {". "} {row.name}
        </TableCell>
        <TableCell>{row?.gender}</TableCell>
        <TableCell>{row?.age}</TableCell>
      </TableRow>
    </>
  );
}
