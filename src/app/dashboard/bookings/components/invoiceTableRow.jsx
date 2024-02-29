// @mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
// hooks
import { useBoolean } from "@/hooks/useBoolean";
// utils
import { fCurrency } from "@/utils/formatNumber";
// components
import Label from "@/components/label";
import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { shortDateLabel } from "@/components/custom-date-range-picker";
import { format, getDate } from "date-fns";

export default function InvoiceTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
}) {
  const {
    tourId,
    tourCompany,
    numPersons,
    status,
    pricingOption,
    dateOfTravel,
  } = row;

  // const shortLabel = shortDateLabel(startDate, endDate);

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Box
          onClick={onViewRow}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {<TableCell>{tourId}</TableCell>}
        </Box>
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <ListItemText
          primary={`${pricingOption.startLocation}-${pricingOption.endLocation}`}
          secondary={pricingOption.price}
          primaryTypographyProps={{ typography: "body2" }}
          secondaryTypographyProps={{
            component: "span",
            color: "text.disabled",
          }}
        />
      </TableCell>

      <TableCell align="center"> {numPersons} </TableCell>

      <TableCell> {fCurrency(pricingOption?.price * numPersons)} </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === "accepted" && "success") ||
            (status === "pending" && "warning") ||
            (status === "rejected" && "error") ||
            "default"
          }
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
        <IconButton
          color={collapse.value ? "inherit" : "default"}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: "action.hover",
            }),
          }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        {status === "accepted" && (
          <IconButton
            color={popover.open ? "inherit" : "default"}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: "none" }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: "background.neutral" }}
        >
          <Stack
            component={Paper}
            sx={{ m: 1.5, p: (theme) => theme.spacing(4) }}
          >
            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
            >
              {[
                {
                  label: "Date Range Selected",
                  value: format(dateOfTravel, "dd-MMM-yy"),
                  icon: <Iconify icon="solar:calendar-date-bold" />,
                },
                {
                  label: "Tour Company",
                  value: tourCompany?.name,
                  icon: <Iconify icon="solar:user-rounded-bold" />,
                },
              ].map((item) => (
                <Stack key={item.label} spacing={1.5} direction="row">
                  {item.icon}
                  <ListItemText
                    primary={item.label}
                    secondary={item.value}
                    primaryTypographyProps={{
                      typography: "body2",
                      color: "text.secondary",
                      mb: 0.5,
                    }}
                    secondaryTypographyProps={{
                      typography: "subtitle2",
                      color: "text.primary",
                      component: "span",
                    }}
                  />
                </Stack>
              ))}
            </Box>
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
      </CustomPopover>
    </>
  );
}
