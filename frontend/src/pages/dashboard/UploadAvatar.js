// React
import { useState } from "react";

// mui
import {
  Dialog,
  DialogContent,
  Stack,
  Button,
  Typography,
} from "@mui/material";

// react-avatar-edit
import Avatar from "react-avatar-edit";

const ImageUploadDialog = ({
  open,
  handleClose,
  src,
  onClose,
  onCrop,
  onSave,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2}>
        <Typography variant="h5">Update Profie Picture</Typography>
      </Stack>
      {/* Dialog Content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }} spacing={2}>
          <Avatar
            width={400}
            height={300}
            onClose={onClose}
            onCrop={onCrop}
            src={src}
          />
          <Stack direction="row" justifyContent="end">
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="outlined"
              onClick={onSave}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const UploadAvatar = ({ file, onAvatarFileHandler }) => {
  // State
  const [openDialog, setOpenDialog] = useState(false);

  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(file);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  const onSave = async () => {
    // console.log(preview);
    onAvatarFileHandler(preview);
    setOpenDialog((prev) => !prev);
  };

  return (
    <>
      <img
        style={{
          display: "block",
          margin: "0 auto",
          width: "125px",
          height: "125px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={preview}
        alt="Default Avatar"
        onClick={() => setOpenDialog((prev) => !prev)}
      />
      {openDialog && (
        <ImageUploadDialog
          open={openDialog}
          handleClose={() => setOpenDialog((prev) => !prev)}
          src={src}
          onClose={onClose}
          onCrop={onCrop}
          onSave={onSave}
        />
      )}
    </>
  );
};

export default UploadAvatar;
