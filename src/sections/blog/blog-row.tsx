import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IBlog } from "@/types/blog";
import useBoolean from "@/hooks/use-boolean";
import { BlogEditDialog } from "./blog-edit-dialog";
import BlogDeleteDialog from "./blog-delete-dialog";
import Image from "next/image";

interface BlogRowProps {
  blog: IBlog;
}

const BlogRow: React.FC<BlogRowProps> = ({ blog }) => {
  const dialog = useBoolean();
  const deleteDialog = useBoolean();
  return (
    <>
      <TableRow>
        <TableCell>{blog.title}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Image
              src={blog.banner}
              alt="Project image"
              height={500}
              width={500}
              className="h-12 w-auto rounded-sm border p-1"
            />
          </div>
        </TableCell>
        <TableCell>{blog.description}</TableCell>
        <TableCell>{blog.tags.join(", ")}</TableCell>
        {/* <TableCell>{blog.isPublished ? "Yes" : "No"}</TableCell> */}
        <TableCell>
          <IconButton color="primary" onClick={dialog.setTrue}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={deleteDialog.setTrue}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <BlogEditDialog initialValues={blog} dialog={dialog} />
      <BlogDeleteDialog
        blogId={blog._id}
        onClose={deleteDialog.setFalse}
        open={deleteDialog.value}
      />
    </>
  );
};

export default BlogRow;
