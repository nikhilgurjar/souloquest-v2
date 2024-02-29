"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useEffect, useCallback, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  InputAdornment,
  TextField,
  MenuItem,
  IconButton,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
  RHFCheckbox,
  RHFMultiSelect,
} from "@/components/hook-form";
import { useSnackbar } from "@/components/snackbar";
import Collapse from "@/components/collapse";
import Iconify from "@/components/iconify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getDate, getDay } from "date-fns";
import useApi from "@/actions/useCompanyApi";

const BookingRequestForm = () => {
  const tourId = useSearchParams().get("tourId");
  const [tourDetail, setTourDetail] = useState();
  const router = useRouter();
  const api = useApi();

  console.log(tourId);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await fetch(
          `/api/company/tours/getdetails?tourId=${tourId}`
        );
        const data = await response.json();
        setTourDetail(data?.tourDetails);
      } catch (error) {
        console.error(error);
        // handle error
      }
    };
    fetchTourDetail();
  }, [tourId]);

  const NewTourSchema = Yup.object().shape({
    title: Yup.string().required("Tour title is required"),
    numPersons: Yup.number().required(),
    location: Yup.string().required("From location is required"),
    email: Yup.string().required("Traveller Email is required"),
    phoneNumber: Yup.number().required("Traveller Phone Number is required"),
    bookingDetails: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Person name is required"),
          gender: Yup.string().required("Person gender is required"),
          age: Yup.string().required("Person age is required"),
          prefix: Yup.string().required("Person prefix is required"),
        })
      )
      .default([])
      .min(1, "At least one person required"),
    comments: Yup.string(),
    tourId: Yup.string().required("Tour id is required"),
    dateOfTravel: Yup.date().required("Date of travel is required"),
    pricingOption: Yup.object().shape({
      startLocation: Yup.string().required("Start location is required"),
      endLocation: Yup.string().required("End location is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
    }),
  });

  const defaultValues = {
    title: "",
    numPersons: 0,
    location: "",
    bookingDetails: [],
    comments: "",
    tourId: tourId ?? "",
  };

  const methods = useForm({
    resolver: yupResolver(NewTourSchema),
    defaultValues,
  });

  console.log(tourDetail);

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  console.log(errors);

  const {
    fields: bookingDetailFields,
    append: bookingDetailAppend,
    remove: bookingDetailRemove,
  } = useFieldArray({
    control,
    name: "bookingDetails",
  });

  const onSubmit = async (data) => {
    try {
      //  await new Promise((resolve) => setTimeout(resolve, 500));
      const booking = await api.post("bookings/add", data);
      console.log(booking);
      enqueueSnackbar("Booking Created Successfully");
      router.push("/dashboard/bookings");
      //  push(PATH_DASHBOARD.eCommerce.list);
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tourId) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                {/* HEADING */}
                <Typography variant="subtitle1" gutterBottom>
                  Details
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Add Booking Details
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} gap={3}>
              <RHFTextField name="title" label="Tour title" />

              <RHFTextField
                name="tourId"
                label="Enter tour Id displayed on details page"
              />

              <RHFTextField
                name="numPersons"
                label="Number of travellers"
                type="number"
                min={1}
              />

              <RHFTextField name="location" label="Travellers joining from" />

              <RHFTextField
                multiple
                line={4}
                name="comments"
                label="Any comments by travellers"
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                {/* HEADING */}
                <Typography variant="subtitle1" gutterBottom>
                  Traveller Details
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {` We wont't share this until your request gets accepted. We need
                  this for quality check.`}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} gap={3}>
              <RHFTextField
                name={`email`}
                label="Traveller Email"
                type="email"
              />

              <RHFTextField
                name={`phoneNumber`}
                label="Traveller Phone Number"
                type="tel"
              />
              {bookingDetailFields.map((day, idx) => (
                <Stack key={day.id} spacing={1.5} sx={{ width: 1 }}>
                  <Stack direction="row" gap={3}>
                    <RHFSelect
                      sx={{
                        maxWidth: "100px",
                      }}
                      id={`booking-details-${idx}-prefix`}
                      name={`bookingDetails[${idx}].prefix`}
                      label="Prefix"
                      InputLabelProps={{ shrink: true }}
                    >
                      {["Mr", "Mrs", "Miss"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </RHFSelect>

                    <RHFTextField
                      sx={{}}
                      id={`booking-details-${idx}-name`}
                      name={`bookingDetails[${idx}].name`}
                      label="Traveller name"
                    />
                  </Stack>

                  <RHFTextField
                    id={`booking-details-${idx}-age`}
                    name={`bookingDetails[${idx}].age`}
                    label="Traveller Age"
                    type="number"
                  />

                  <Stack
                    sx={{ width: 1 }}
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <RHFSelect
                      fullWidth
                      name={`bookingDetails[${idx}].gender`}
                      label="Traveller Gender"
                      InputLabelProps={{ shrink: true }}
                    >
                      {["Male", "Female", "Other"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </RHFSelect>

                    <IconButton
                      size={"large"}
                      onClick={() => bookingDetailRemove(idx)}
                    >
                      <Iconify icon="mdi:delete" width={"100%"} />
                    </IconButton>
                  </Stack>
                </Stack>
              ))}
            </Stack>

            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => bookingDetailAppend({ name: "" })}
                sx={{
                  mt: 3,
                }}
              >
                Add Traveller
              </Button>
            </CardActions>
            {errors?.bookingDetails?.message && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {" "}
                {errors?.bookingDetails?.message}
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 5 }}>
            <Stack direction="row" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                {/* HEADING */}
                <Typography variant="subtitle1" gutterBottom>
                  Travel date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We will show only dates scheduled by company
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} gap={3}>
              <RHFSelect
                fullWidth
                name={"pricingOption"}
                label="Select a Pricing Option"
                InputLabelProps={{ shrink: true }}
              >
                {tourDetail?.priceOptions.map((option) => (
                  <MenuItem key={option?._id} value={option}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        {option?.startLocation} to {option?.endLocation}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        textAlign={"center"}
                      >
                        Rs. {option?.price}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </RHFSelect>

              <Controller
                name="dateOfTravel"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Travel Date"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    minDate={tourDetail?.startDate}
                    shouldDisableDate={(date) => {
                      if (tourDetail?.frequency == "daily") {
                        return true;
                      }
                      return !tourDetail?.frequencyWeekdays?.includes(
                        getDay(date)
                      );
                    }}
                  />
                )}
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Stack
        position={"sticky"}
        sx={{
          bottom: 0,
          w: 1,
          mx: 5,
          bgcolor: "gray.100",
          zIndex: 0,
          py: 3,
          px: 5,
          backdropFilter: "blur",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          direction: "row",
        }}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 3,
          }}
          type="submit"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default BookingRequestForm;
