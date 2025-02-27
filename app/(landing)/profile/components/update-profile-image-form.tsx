"use client";

import FileUpload from "@/components/FileUpload";
import { useAuthGuard } from "@/lib/auth/use-auth";
import httpClient from "@/lib/httpClient";
import { Avatar, InputLabel } from "@mantine/core";
import { useSnackbar } from "notistack";
import React from "react";

export default function UpdateProfileImageForm() {
  const { user, mutate } = useAuthGuard({ middleware: "auth" });
  const { enqueueSnackbar } = useSnackbar();
  const handleLogoChange = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    httpClient.patch(`/api/users/${user?.id}/profile-picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        enqueueSnackbar('Profile picture updated successfully', { variant: 'success' });
        mutate();
      })
      .catch((error) => {
        enqueueSnackbar('Failed to update profile picture', { variant: 'error' });

      });
  };

  return (
    <div className="flex gap-4 flex-col">
      <InputLabel>Logo</InputLabel>
      <FileUpload
        onFileSelect={(file) => handleLogoChange(file)}
        allowedTypes={["image/png", "image/jpg", "image/jpeg"]}
        onValidationError={(err) => {
          enqueueSnackbar(err, { variant: 'error' });
        }}
      >
        <Avatar name={user?.firstName} src={user?.profileImageUrl} color="initials"></Avatar>
      </FileUpload>
    </div>
  );
}
