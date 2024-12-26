/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  useGetSingleVendorQuery,
  useToggleFollowUnfollwVendorMutation,
} from "@/redux/reducers/vendor/vendorApi";
import { Button, Typography, Avatar, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import ShopProductCard from "../shop-product-card";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

const ShopProfileView = ({ id }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: vendorData, isLoading: isVendorLoading } =
    useGetSingleVendorQuery(id);
  const [toggleFollowUnfollow, { isLoading }] =
    useToggleFollowUnfollwVendorMutation();

  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (vendorData?.data) {
      const isUserFollowing = vendorData.data.followers?.some(
        (follower: any) => follower === user?._id
      );
      setIsFollowing(isUserFollowing);
    }
  }, [user?._id, vendorData]);

  // Handle follow/unfollow action
  const handleFollowUnfollow = async () => {
    if (!user) {
      const currentUrl = window.location.href;
      router.push(`/auth/signin?returnTo=${encodeURIComponent(currentUrl)}`);
      return;
    }

    setIsFollowing((prevState) => !prevState);
    try {
      const response = await toggleFollowUnfollow(id).unwrap();
      if (response.success) {
        toast.success(
          !isFollowing
            ? "You are now following the vendor!"
            : "You have unfollowed the vendor."
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isVendorLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-8 2xl:px-0">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {vendorData?.data?.shopName ?? "Shop"}
      </Typography>

      {/* Vendor Description Section */}
      <div className="flex items-start flex-col md:flex-row gap-5">
        <Avatar
          src={
            vendorData?.data.logo ||
            "https://via.placeholder.com/150x150?text=Shop+Logo"
          }
          alt={vendorData?.data?.shopName}
          sx={{ width: 100, height: 100, marginRight: 3 }}
        />
        <Box>
          <Typography variant="body1" paragraph>
            {vendorData?.data.description || "No description available."}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Followers: {vendorData?.data?.followers?.length}
          </Typography>
        </Box>
        {/* Follow/Unfollow Button */}
        {user?.role !== "vendor" && (
          <Button
            sx={{ marginLeft: 2 }}
            onClick={handleFollowUnfollow}
            disabled={isLoading}
            variant="contained"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>

      {/* Products Section */}
      <Typography variant="h4" fontWeight="bold" mt="3rem" mb="2rem">
        Products from {vendorData?.data?.shopName ?? "Shop"}
      </Typography>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {vendorData?.data.products?.map((product) => (
          <ShopProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ShopProfileView;
