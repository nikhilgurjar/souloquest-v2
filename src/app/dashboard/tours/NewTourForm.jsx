"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useEffect, useCallback } from "react";
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
import useApi from "@/actions/useCompanyApi";
import { TOUR_CATEGORIES } from "@/utils/siteConfig";
import { useRouter } from "next/navigation";
import { handleUplaod } from "@/utils/firebaseFileUpload";

const RECURRENCE_FREQUENCY = ["daily", "weekly"];
const WEEKLY_FREQUENCY = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const NewTourForm = ({ isEdit, currentTour }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const api = useApi();

  const NewTourSchema = Yup.object().shape({
    title: Yup.string().required("Tour title is required"),
    maxParticipants: Yup.number()
      .required("Maximum participants is required")
      .integer("Maximum participants must be an integer")
      .positive("Maximum participants must be positive"),
    startDate: Yup.date().required("From date is required"),
    priceOptions: Yup.array()
      .of(
        Yup.object().shape({
          startLocation: Yup.string().required("Start location is required"),
          endLocation: Yup.string().required("End location is required"),
          price: Yup.number()
            .required("Price is required")
            .positive("Price must be positive"),
        })
      )
      .min(1, "A tour template must have at least one price option"),

    itenary: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required(),
          description: Yup.string(),
        })
      )
      .min(1, "A tour must have at least one day in the itinerary"),
    usedTourTemplate: Yup.boolean().default(false),
    recurrence: Yup.boolean().optional(),
    frequency: Yup.string()
      .default("None")
      .when("recurrence", {
        is: (enable) => enable,
        then: () =>
          Yup.string()
            .required("Frequency is required for recurring tours")
            .oneOf(["daily", "weekly", "monthly"]),
        otherwise: () => Yup.string().nullable(),
      }),
    frequencyWeekdays: Yup.array()
      .default([])
      .when("frequency", {
        is: (frequency) => frequency === "weekly",
        then: () =>
          Yup.array()
            .of(Yup.number())
            .min(1, "Select at least one weekday for weekly frequency"),
        otherwise: () => Yup.array().nullable(),
      }),
    frequencyDates: Yup.array()
      .default([])
      .when("frequency", {
        is: (frequency) => frequency === "monthly",
        then: () =>
          Yup.array()
            .of(Yup.date())
            .min(1, "Select at least one date for monthly frequency"),
        otherwise: () => Yup.array().nullable(),
      }),
    tourTemplate: Yup.string().nullable(),
    overview: Yup.string().nullable(),
    included: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
        })
      )
      .default([]),
    categories: Yup.array()
      .of(Yup.string().required())
      .default([])
      .max(3, "Maximum 3 categories allowed"),
    destinations: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
        })
      )
      .default([])
      .min(1, "minimum 1 destination is required"),
    notIncluded: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
        })
      )
      .default([]),
    hightlights: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
        })
      )
      .default([]),
    images: Yup.array()
      .min(1, "Images is required")
      .max(3, "maximum 3 images are allowed"),
  });
  const defaultValues = useMemo(
    () => ({
      title: currentTour?.title || "",
      images: currentTour?.images || [],
      maxParticipants: currentTour?.maxParticipants || 0,
      startDate: currentTour?.startDate || "",
      priceOptions: currentTour?.priceOptions || [],
      itenary: currentTour?.itenary || [],
      usedTourTemplate: currentTour?.usedTourTemplate || false,
      recurrence: currentTour?.recurrence || false,
      frequency: currentTour?.frequency || "None",
      frequencyWeekdays: currentTour?.frequencyWeekdays || [],
      frequencyDates: currentTour?.frequencyDates || [],
      tourTemplate: currentTour?.tourTemplate || "",
      overview: currentTour?.overview || "",
      included: currentTour?.included?.map((elem) => ({ name: elem })) || [],
      categories: currentTour?.categories || [],
      destinations:
        currentTour?.destinations?.map((elem) => ({ name: elem })) || [],
      notIncluded:
        currentTour?.notIncluded?.map((elem) => ({ name: elem })) || [],
      hightlights:
        currentTour?.hightlights?.map((elem) => ({ name: elem })) || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTour]
  );
  const methods = useForm({
    resolver: yupResolver(NewTourSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();
  const {
    fields: destinationFields,
    append: destinationappend,
    remove: destinationRemove,
  } = useFieldArray({
    control,
    name: "destinations",
  });
  const {
    fields: priceFields,
    append: priceappend,
    remove: priceRemove,
  } = useFieldArray({
    control,
    name: "priceOptions",
  });

  const {
    fields: itenaryFields,
    append: itenaryAppend,
    remove: itenaryRemove,
  } = useFieldArray({
    control,
    name: "itenary",
  });

  const {
    fields: includedFields,
    append: includedAppend,
    remove: includedRemove,
  } = useFieldArray({
    control,
    name: "included",
  });

  const {
    fields: notIncludedFields,
    append: notIncludedAppend,
    remove: notIncludedRemove,
  } = useFieldArray({
    control,
    name: "notIncluded",
  });

  const {
    fields: hieghlightsFields,
    append: heighlightsAppend,
    remove: hieghlightsRemove,
  } = useFieldArray({
    control,
    name: "hightlights",
  });

  useEffect(() => {
    if (isEdit && currentTour) {
      reset(defaultValues);
    }
    if (currentTour) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const onSubmit = async (data) => {
    try {
      console.log("Data");
      console.log(data);
      const imageUrls = [];
      for (let file of data?.images) {
        imageUrls.push(await handleUplaod(file));
      }
      const result = await Promise.all(imageUrls);
      console.log("result:::::::::::::::::::::::;");
      console.log(result);
      data.images = result;

      if (isEdit) {
        await api.post("tours/update", { ...data, id: currentTour?._id });
      } else {
        await api.post("tours/add", data);
      }
      reset();
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      router.push("/dashboard/tours/mytours");
      //  push(PATH_DASHBOARD.eCommerce.list);
      // console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue("images", [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  console.log(values);
  const handleRemoveFile = (inputFile) => {
    const filtered =
      values.images && values.images?.filter((file) => file !== inputFile);
    setValue("images", filtered);
  };
  const handleRemoveAllFiles = () => {
    setValue("images", []);
  };

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
                  Title, short description, image...
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} gap={3}>
              <RHFTextField name="title" label="Tour title" />

              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Tour Overview
                </Typography>

                <RHFEditor simple name="overview" />
              </Stack>

              <Controller
                name="startDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Start Date"
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
                  />
                )}
              />

              <RHFTextField
                name="maxParticipants"
                label="Max Bookings Allowed"
                type="number"
                min={1}
              />

              <RHFCheckbox
                name="recurrence"
                label="If this is a recurring tour?"
              />

              {!!values.recurrence && (
                <RHFSelect
                  fullWidth
                  name="frequency"
                  label="Select a frequency"
                  InputLabelProps={{ shrink: true }}
                >
                  {RECURRENCE_FREQUENCY.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}

              {!!values.recurrence && values.frequency == "weekly" && (
                <RHFMultiSelect
                  chip
                  checkbox
                  name="frequencyWeekdays"
                  label="Weekly Frequency Days"
                  options={WEEKLY_FREQUENCY}
                />
              )}

              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Cover images (max 3)
                </Typography>

                <RHFUpload
                  multiple
                  thumbnail
                  name="images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={() => console.log("ON UPLOAD")}
                />
              </Stack>
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
                  Destinations
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We need this to make index easier!! Treat it as tags in
                  instagram.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack
              spacing={1}
              gap={1}
              divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
            >
              {destinationFields.map((destination, idx) => (
                <Stack
                  key={destination.id}
                  spacing={1.5}
                  sx={{ width: 1 }}
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <RHFTextField
                    size="small"
                    id={`destination-${destination.id}`}
                    name={`destinations[${idx}].name`}
                    label="Destination Name"
                  />
                  <IconButton
                    size={"large"}
                    onClick={() => destinationRemove(idx)}
                  >
                    <Iconify icon="mdi:delete" width={"100%"} />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => destinationappend({ name: "" })}
                sx={{
                  mt: 3,
                }}
              >
                Add Destination
              </Button>
            </CardActions>
            {errors?.destinations?.message && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {" "}
                {errors?.destination?.message}
              </Typography>
            )}
            <Divider flexItem sx={{ borderStyle: "dashed", my: 3 }} />
            <RHFMultiSelect
              chip
              sx={{
                width: "100%",
              }}
              checkbox
              name="categories"
              label="Select Top 3 Categories"
              options={TOUR_CATEGORIES}
            />
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
                  Itenary
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Add information related to tour days
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack
              spacing={3}
              gap={3}
              divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
            >
              {itenaryFields.map((day, idx) => (
                <Stack key={day.id} spacing={1.5} sx={{ width: 1 }}>
                  <Collapse
                    sx={{
                      px: 3,
                    }}
                    header={
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        sx={{
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                          width: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "text.secondary" }}
                        >
                          Day {idx + 1}
                        </Typography>
                        <IconButton onClick={() => itenaryRemove(idx)}>
                          <Iconify icon="mdi:delete" width={"100%"} />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <RHFTextField
                      id={`itenary-day-${idx}-title`}
                      name={`itenary[${idx}].title`}
                      label="Day Title"
                    />

                    <Stack spacing={1} mt={3}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        Day description
                      </Typography>

                      <RHFEditor
                        id={`itenary-day-${idx}-description`}
                        name={`itenary[${idx}].description`}
                      />
                    </Stack>
                  </Collapse>
                </Stack>
              ))}
            </Stack>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => itenaryAppend({ title: "", description: "" })}
                sx={{
                  mt: 3,
                }}
              >
                Add Day
              </Button>
            </CardActions>
            {errors?.itenary?.message && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {" "}
                {errors?.itenary?.message}
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
                  Pricing Options
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Add different pricing options
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack
              spacing={3}
              gap={3}
              divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
            >
              {priceFields.map((priceOption, idx) => (
                <Stack key={priceOption.id} spacing={1.5} sx={{ width: 1 }}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    gap={2}
                    spacing={2}
                    sx={{ width: 1 }}
                  >
                    <RHFTextField
                      name={`priceOptions[${idx}].startLocation`}
                      label="Start Location"
                      InputLabelProps={{ shrink: true }}
                    />

                    <IconButton
                      sx={{
                        mt: { xs: 0, md: 2 },
                        pb: { xs: 0, md: 1 },
                      }}
                    >
                      <Iconify
                        icon="eva:repeat-outline"
                        width={{ xs: 20, md: 30 }}
                      />
                    </IconButton>
                    <RHFTextField
                      name={`priceOptions[${idx}].endLocation`}
                      label="End Location"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={2}
                    spacing={2}
                    sx={{ width: 1 }}
                  >
                    <RHFTextField
                      name={`priceOptions[${idx}].price`}
                      label="Price"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                    <IconButton
                      onClick={() => priceRemove(idx)}
                      sx={{ color: "text.secondary" }}
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
                onClick={() =>
                  priceappend({ startLocation: "", endLocation: "", price: 0 })
                }
                sx={{
                  mt: 3,
                }}
              >
                Add Pricing Option
              </Button>
            </CardActions>
            {errors?.priceOptions?.message && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {" "}
                {errors?.priceOptions?.message}
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
                  Additional Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Additional Information user may want to know about
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={0.5} gap={0.5}>
              {includedFields.map((inclusion, idx) => (
                <Stack
                  key={inclusion.id}
                  spacing={1.5}
                  sx={{ width: 1 }}
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <RHFTextField
                    size="small"
                    id={`included-${inclusion.id}`}
                    name={`included[${idx}].name`}
                    label="Inclusion..."
                  />
                  <IconButton
                    size={"large"}
                    onClick={() => includedRemove(idx)}
                  >
                    <Iconify icon="mdi:delete" width={"100%"} />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => includedAppend({ title: "" })}
                sx={{
                  mt: 3,
                }}
              >
                Add Inclusion
              </Button>
            </CardActions>

            {errors?.included?.message && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {" "}
                {errors?.included?.message}
              </Typography>
            )}
            <Divider flexItem sx={{ borderStyle: "dashed", my: 3 }} />

            <Stack spacing={0.5} gap={0.5}>
              {notIncludedFields.map((notIncluded, idx) => (
                <Stack
                  key={notIncluded.id}
                  spacing={1.5}
                  sx={{ width: 1 }}
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <RHFTextField
                    size="small"
                    id={`notIncluded-${notIncluded.id}`}
                    name={`notIncluded[${idx}].name`}
                    label="Non Inclusions..."
                  />
                  <IconButton
                    size={"large"}
                    onClick={() => notIncludedRemove(idx)}
                  >
                    <Iconify icon="mdi:delete" width={"100%"} />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => notIncludedAppend({ title: "" })}
                sx={{
                  mt: 3,
                }}
              >
                Add Non Inclusions
              </Button>
            </CardActions>
            {errors?.notIncluded?.message && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {" "}
                {errors?.notIncluded?.message}
              </Typography>
            )}
            <Divider flexItem sx={{ borderStyle: "dashed", my: 3 }} />

            <Stack spacing={0.5} gap={0.5}>
              {hieghlightsFields.map((highlight, idx) => (
                <Stack
                  key={highlight.id}
                  spacing={1.5}
                  sx={{ width: 1 }}
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <RHFTextField
                    size="small"
                    id={`highlights-${highlight.id}`}
                    name={`hightlights[${idx}].name`}
                    label="Heighlight..."
                  />
                  <IconButton
                    size={"large"}
                    onClick={() => hieghlightsRemove(idx)}
                  >
                    <Iconify icon="mdi:delete" width={"100%"} />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => heighlightsAppend({ title: "" })}
                sx={{
                  mt: 3,
                }}
              >
                Add HeighLight
              </Button>
            </CardActions>
            {errors?.hightlights?.message && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {" "}
                {errors?.hightlights?.message}
              </Typography>
            )}
            <Typography variant="body2">
              Dont add destinations in highlights, try to add main heightlights
              here.
            </Typography>
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
          loading={isSubmitting}
          type="submit"
        >
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default NewTourForm;
