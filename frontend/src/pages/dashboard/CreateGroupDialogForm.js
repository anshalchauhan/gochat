// MUI
import { Button, Stack } from "@mui/material";

// React-hook-form, Yup, @hookform/resolvers
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Hook Form
import FormProvider from "../../components/hook-form";
import { RHFTextField } from "../../components/hook-form";
import { RHFAutocomplete } from "../../components/hook-form";

const MEMBERS = ["Name 1", "Name 2", "Name 3"];

const CreateGroupDialogForm = ({ onClose }) => {
  // React Hook Form
  // Object schema for validation
  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have at least 2 members"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  // yup resolver will make the object schema readable for the React hook form
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  // Methods to handle form
  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      console.log(data);
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="title" label="Title" />
        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="end"
        >
          <Button onClick={onClose} variant="contained">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default CreateGroupDialogForm;
