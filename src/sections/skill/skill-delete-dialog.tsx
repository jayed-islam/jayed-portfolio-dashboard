/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useDeleteSkillMutation } from "@/redux/reducers/skill/skillApi";
interface SoftDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  skillId: string;
}

const SkillDeleteDialog: React.FC<SoftDeleteDialogProps> = ({
  open,
  onClose,
  skillId,
}) => {
  const [softDeleteProject, { isLoading }] = useDeleteSkillMutation();

  const handleDelete = async () => {
    try {
      const res = await softDeleteProject(skillId).unwrap();
      if (res.success) {
        toast.success(res.message);
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Delete Skill</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this Skill?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" disabled={isLoading}>
          {isLoading ? "Deleting..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SkillDeleteDialog;
