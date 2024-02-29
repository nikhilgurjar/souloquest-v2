import { useForm } from "react-hook-form";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
// components
import Iconify from "@/components/iconify";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";
import { useDispatch } from "@/redux/store";
import useApi from "@/actions/useCompanyApi";
import { setTourCompany } from "@/redux/slices/tourCompany";
import { SkeletonKanbanColumn } from "@/components/skeleton";

export default function AccountSocialLinks() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const api = useApi();

  const { company: user, loading } = useCurrentCompany();

  const defaultValues = {
    facebookLink: user?.facebookLink ?? "",
    instagramLink: user?.instagramLink ?? "",
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await api.post("updateSocial", data);
      dispatch(setTourCompany({ tourCompany: response.tourCompany }));
      enqueueSnackbar("Update success!");
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  if (loading) {
    return <SkeletonKanbanColumn />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        <RHFTextField
          name={"instagramLink"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  width={24}
                  icon="ant-design:instagram-filled"
                  color="#DF3E30"
                />
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name={"facebookLink"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify width={24} icon="eva:facebook-fill" color="#1877F2" />
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ ml: "auto" }}
        >
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
