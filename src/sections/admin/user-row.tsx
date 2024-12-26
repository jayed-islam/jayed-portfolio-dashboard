import { IUser } from "@/types/user";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import UpdateUserStatusDialog from "./update-user-status";
import useBoolean from "@/hooks/use-boolean";

interface Props {
  user: IUser;
}

const UserRow = ({ user }: Props) => {
  const dialog = useBoolean();
  return (
    <>
      <TableRow key={user._id}>
        <TableCell>{user._id}</TableCell>
        <TableCell>
          {user.role === "vendor" ? user.vendor.shopName : user.name ?? "N/A"}
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          {user.role === "customer"
            ? user.status
            : user.vendor.isBlacklisted
            ? "Block Listed"
            : "Unblocked"}
        </TableCell>
        <TableCell>
          <Button onClick={dialog.setTrue} size="small">
            Update Status
          </Button>
        </TableCell>
      </TableRow>
      <UpdateUserStatusDialog dialog={dialog} user={user} />
    </>
  );
};

export default UserRow;
