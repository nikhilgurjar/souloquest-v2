import * as Yup from "yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// hooks
// utils
import { fData } from "@/utils/formatNumber";
// assets
import Iconify from "@/components/iconify";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from "@/components/hook-form";
import { SkeletonKanbanColumn } from "@/components/skeleton";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";
import useApi from "@/actions/useCompanyApi";
import { setTourCompany } from "@/redux/slices/tourCompany";
import { useDispatch } from "@/redux/store";
import { handleUplaod } from "@/utils/firebaseFileUpload";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const { company: user, loading } = useCurrentCompany();
  const dispatch = useDispatch();
  const api = useApi();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10,12}$/, "Invalid phone number format (10-12 digits)"),
    address: Yup.string()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters long"),
    about: Yup.string().required("About is required"),
  });

  const defaultValues = {
    name: user?.name ?? "",
    address: user?.address ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    about: user?.about || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await api.post("updateProfile", data);
      dispatch(setTourCompany({ tourCompany: response.tourCompany }));
      enqueueSnackbar("Update success!");
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const downloadUrl = await handleUplaod(file);
        setValue("profilePic", downloadUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  if (loading) {
    return <SkeletonKanbanColumn />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: "center" }}>
            <RHFUploadAvatar
              name="profilePic"
              maxSize={1000000}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.disabled",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="name" label="Enter Name" disabled />
              <RHFTextField
                name="email"
                label="Email address"
                type="email"
                disabled
              />
              <RHFTextField
                name="phoneNumber"
                label="Company contact"
                type="tel"
              />
              <RHFTextField
                name="address"
                label="Company Address"
                type="tel"
                multiline
                rows={4}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
