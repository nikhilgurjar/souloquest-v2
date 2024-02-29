"use client";
import { useState, useCallback, useEffect } from "react";
// @mui
import { useTheme, alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
// routes
import { usePathname, useRouter } from "next/navigation";
// hooks
import { useBoolean } from "@/hooks/useBoolean";
// utils
import { fTimestamp } from "@/utils/formatTime";
// components
import Label from "@/components/label";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";

import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "@/components/table";
//
import InvoiceTableRow from "./components/invoiceTableRow";
import InvoiceTableToolbar from "./components/bookingTableToolbar";
import InvoiceTableFiltersResult from "./components/invoiceTableFilterResult";
import useApi from "@/actions/useCompanyApi";
import { useSnackbar } from "@/components/snackbar";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "tourId", label: "Tour", width: 116 },
  { id: "pricingOption", label: "Pickup-Drop" },
  { id: "numPersons", label: "Travellers", width: 120, align: "center" },
  { id: "totalAmount", label: "Price", width: 140 },
  { id: "status", label: "Status", width: 110 },
  { id: "", width: 88 },
];

const defaultFilters = {
  title: "",
  tour: "",
  status: "all",
  dateOfTravel: null,
};

// ----------------------------------------------------------------------

export default function BookingsList({ bookings, fetchBookings }) {
  const theme = useTheme();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const [statusFilter, setStatusFilter] = useState(null);
  const pathName = usePathname();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: "createDate" });

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    setTableData(bookings);
  }, [bookings]);
  const dataFiltered = applyFilter({
    inputData: tableData ?? [],
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const acceptBookings = async () => {
    try {
      await api.post("bookings/status", {
        bookingIds: table.selected,
        status: "accepted",
      });
      enqueueSnackbar("Booking accepted successfully");
      await fetchBookings();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error while accepting bookings", { variant: "error" });
    }
  };

  const rejectBookings = async () => {
    try {
      await api.post("bookings/status", {
        bookingIds: table.selected,
        status: "rejected",
      });
      enqueueSnackbar("Booking rejected successfully");
      await fetchBookings();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error while rejecting bookings", { variant: "error" });
    }
  };

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.title || filters.status !== "all" || !!filters.startDate;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getInvoiceLength = (status) =>
    tableData.filter((item) => item.status === status).length;

  const TABS = [
    { value: "all", label: "All", color: "default", count: tableData.length },
    {
      value: "accepted",
      label: "Accepted",
      color: "success",
      count: getInvoiceLength("accepted"),
    },
    {
      value: "pending",
      label: "Pending",
      color: "warning",
      count: getInvoiceLength("pending"),
    },
    {
      value: "rejected",
      label: "Rejected",
      color: "error",
      count: getInvoiceLength("overdue"),
    },
  ];

  const handleFilters = useCallback(
    (title, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [title]: value,
      }));
    },
    [table]
  );

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.invoice.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(`/dashboard/bookings/${id}`);
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      setStatusFilter(newValue);
      handleFilters("status", newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setStatusFilter(null);
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={"lg"}>
        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${alpha(
                theme.palette.grey[500],
                0.08
              )}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === "all" || tab.value === filters.status) &&
                        "filled") ||
                      "soft"
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <InvoiceTableToolbar filters={filters} onFilters={handleFilters} />

          {canReset && (
            <InvoiceTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => {
                    return row._id;
                  })
                )
              }
              action={
                <Stack
                  direction="row"
                  display={
                    pathName === "/dashboard/bookings/requested"
                      ? "none"
                      : "flex"
                  }
                >
                  {/* <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip> */}

                  <Tooltip title="Accept">
                    <IconButton color="primary" onClick={acceptBookings}>
                      <Iconify icon="material-symbols-light:check-box" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Reject">
                    <IconButton
                      color="error"
                      onClick={rejectBookings}
                      size={"30px"}
                    >
                      <Iconify icon="ic:baseline-cancel" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table
                size={table.dense ? "small" : "medium"}
                sx={{ minWidth: 800 }}
              >
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <InvoiceTableRow
                        key={row._id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        onViewRow={() => handleViewRow(row._id)}
                        onEditRow={() => handleEditRow(row._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      tableData.length
                    )}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { title, status, startDate } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (title) {
    inputData = inputData?.filter(
      (invoice) =>
        invoice.tourCompany?.name
          ?.toLowerCase()
          .indexOf(title.toLowerCase()) !== -1 ||
        invoice.title.toLowerCase().indexOf(title.toLowerCase()) !== -1 ||
        invoice.location.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
  }

  if (status !== "all") {
    inputData = inputData.filter((invoice) => invoice.status === status);
  }

  if (startDate) {
    inputData = inputData.filter(
      (invoice) => fTimestamp(invoice.tourDate) >= fTimestamp(startDate)
    );
  }

  return inputData;
}
