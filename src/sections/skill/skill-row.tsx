import useBoolean from "@/hooks/use-boolean";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import { ISkill } from "@/types/skill";
import { EditSkillDialog } from "./skill-edit-dialog";
import SkillDeleteDialog from "./skill-delete-dialog";

interface Props {
  skill: ISkill;
}

const SkillRow = ({ skill }: Props) => {
  const editDialog = useBoolean();
  const deleteDialog = useBoolean();

  return (
    <>
      <TableRow key={skill._id}>
        <TableCell>{skill.name}</TableCell>
        <TableCell>{skill.description}</TableCell>
        <TableCell>
          <img src={skill.logo} alt={skill.name} width={40} height={40} />
        </TableCell>
        <TableCell>{skill.level}</TableCell>
        <TableCell>{skill.category}</TableCell>
        <TableCell>
          <div className="flex gap-3">
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={deleteDialog.setTrue}
            >
              Delete
            </Button>
            <Button
              onClick={editDialog.setTrue}
              size="small"
              color="success"
              variant="outlined"
            >
              Edit
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <EditSkillDialog dialog={editDialog} intValues={skill} />
      <SkillDeleteDialog
        onClose={deleteDialog.setFalse}
        open={deleteDialog.value}
        skillId={skill._id}
      />
    </>
  );
};

export default SkillRow;
