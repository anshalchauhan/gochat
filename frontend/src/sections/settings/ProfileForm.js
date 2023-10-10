// React-hook-form, Yup, @hookform/resolvers
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Hook Form
import FormProvider from "../../components/hook-form";
import { RHFTextField } from "../../components/hook-form";

// MUI
import { Alert, Stack, Button } from "@mui/material";

// React Redux
import { useDispatch, useSelector } from "react-redux";

// Redux
import { fetchS3Url, openSnackBar } from "../../store";
import { updateMe } from "../../store";

import UploadAvatar from "../../pages/dashboard/UploadAvatar";

// Using in RegisterForm as well
// Button style
export const loginButton = {
  bgcolor: "text.primary",
  color: (theme) =>
    theme.palette.mode === "light" ? "common.white" : "grey.800",
  "&:hover": {
    bgcolor: "text.primary",
    color: (theme) =>
      theme.palette.mode === "light" ? "common.white" : "grey.800",
  },
};

const ProfileForm = () => {
  // React-Redux
  const dispatch = useDispatch();
  const { avatar } = useSelector((state) => state.user.user);

  //
  let file = avatar;
  const onAvatarFileHandler = (data) => {
    file = data;
  };

  // React Hook Form
  // Object schema for validation
  const ProfileSchema = Yup.object().shape({
    nickName: Yup.string(),
    about: Yup.string().required("About is required"),
  });

  const defaultValues = {
    nickName: "",
    about: "",
  };

  // yup resolver will make the object schema readable for the React hook form
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // Methods to handle form
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // console.log(avatar);

  const onSubmit = async (data) => {
    dispatch(fetchS3Url(file))
      .unwrap()
      .then((res) => {
        console.log(res);
        dispatch(
          updateMe({
            nickName: data?.nickName,
            about: data?.about,
            avatar: res?.data.split("?")[0],
          })
        )
          .unwrap()
          .then(() => {
            dispatch(
              openSnackBar({
                severity: "success",
                message: "User Profile Updated Successfully!",
              })
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          {/* <RHFUploadAvatar name="avatar" />
           */}
          <UploadAvatar file={file} onAvatarFileHandler={onAvatarFileHandler} />
          <RHFTextField
            name="nickName"
            label="Nick Name"
            helperText="This name is visible to your contacts"
          />
          <RHFTextField multiline rows={4} name="about" label="About" />
        </Stack>
        <Stack direction="row" justifyContent="end">
          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
