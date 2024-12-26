"use client";

import { useAppSelector } from "@/redux/hooks";
import { Button } from "@mui/material";
import React from "react";
import UpdateUserProfileDialog from "./update-user-profile";
import useBoolean from "@/hooks/use-boolean";
import UserProfilePicturePicker from "./user-profile-picture-picker";

const UserAccountView = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dialog = useBoolean();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow border space-y-8 rounded-3xl">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <UserProfilePicturePicker />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.name ?? "Unamed user"}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button onClick={dialog.setTrue}>Edit Profile</Button>
        <Button variant="outlined">Change Password</Button>
      </div>

      {/* Details Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Account Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-600">Full Name</h4>
            <p className="text-gray-800">{user?.name ?? "Unamed user"}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-600">Email</h4>
            <p className="text-gray-800">{user?.email}</p>
          </div>
        </div>
      </div>
      <UpdateUserProfileDialog dialog={dialog} />
    </div>
  );
};

export default UserAccountView;
