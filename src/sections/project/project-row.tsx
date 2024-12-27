import useBoolean from "@/hooks/use-boolean";
import { Button, TableCell, TableRow } from "@mui/material";
import Image from "next/image";
import React from "react";
import { IProject } from "@/types/projects";
import { UpdateProjectView } from "./project-edit-dialog";
import SoftDeleteDialog from "./project-delete-dialog";

interface Props {
  project: IProject;
}

const ProjectRow = ({ project }: Props) => {
  const editDialog = useBoolean();
  const deleteDialog = useBoolean();

  return (
    <>
      <TableRow key={project._id}>
        <TableCell>{project.title}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Image
              src={project.image}
              alt="Project image"
              height={500}
              width={500}
              className="h-12 w-auto rounded-sm border p-1"
            />
          </div>
        </TableCell>
        <TableCell>
          <h2 className="line-clamp-2 overflow-ellipsis">
            {project.description}
          </h2>
        </TableCell>

        <TableCell>{project.technologies.join(", ")}</TableCell>
        <TableCell>
          <div className="flex flex-col gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Live URL
              </a>
            )}
            {project.frontendRepoUrl && (
              <a
                href={project.frontendRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Frontend Repo
              </a>
            )}
            {project.backendRepoUrl && (
              <a
                href={project.backendRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Backend Repo
              </a>
            )}
          </div>
        </TableCell>
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
      <UpdateProjectView dialog={editDialog} initialValues={project} />
      <SoftDeleteDialog
        onClose={deleteDialog.setFalse}
        open={deleteDialog.value}
        projectId={project._id}
      />
    </>
  );
};

export default ProjectRow;
