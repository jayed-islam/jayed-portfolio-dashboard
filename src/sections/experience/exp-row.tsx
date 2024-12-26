import React from "react";
import { TableCell, TableRow, Button, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IExperience } from "@/types/esp";
import ExpDeleteDialog from "./delete-exp-dialgo";
import useBoolean from "@/hooks/use-boolean";
import { EditExpDialog } from "./edit-exp-dialog";

interface ExperienceRowProps {
  experience: IExperience;
}

const ExperienceRow: React.FC<ExperienceRowProps> = ({ experience }) => {
  const dialog = useBoolean();
  const deleteDialog = useBoolean();
  return (
    <TableRow hover>
      <TableCell>{experience.title}</TableCell>
      <TableCell>{experience.company}</TableCell>
      <TableCell>
        {new Date(experience.startDate).toLocaleDateString()} -{" "}
        {experience.endDate
          ? new Date(experience.endDate).toLocaleDateString()
          : "Present"}
      </TableCell>
      <TableCell>{experience.location}</TableCell>
      <TableCell>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={dialog.setTrue}
            startIcon={<Edit />}
          >
            Edit
          </Button>
          <Button
            onClick={deleteDialog.setTrue}
            variant="outlined"
            size="small"
            startIcon={<Delete />}
            color="error"
          >
            Delete
          </Button>
        </Box>
      </TableCell>
      <ExpDeleteDialog
        expId={experience._id}
        onClose={deleteDialog.setFalse}
        open={deleteDialog.value}
      />

      <EditExpDialog defaultvalues={experience} dialog={dialog} />
    </TableRow>
  );
};

export default ExperienceRow;
