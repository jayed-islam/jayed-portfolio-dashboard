"use client";

import ProductCard from "@/layouts/common/product-card";
import ProductCardShimmer from "@/layouts/common/product-shimmer-card";
import { useGetFlashSaleProductsQuery } from "@/redux/reducers/product/projectApi";
import { Typography } from "@mui/material";
import React from "react";

const FlashSaleProductListView = () => {
  const { data: flashSaleProducts, isFetching } =
    useGetFlashSaleProductsQuery();
  return (
    <section className="px-5 2xl:px-0 max-w-5xl mx-auto py-11">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Flash Sale</h2>
        <p className="text-gray-600 text-lg">
          Grab these exclusive deals before they&lsquo;re gone!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isFetching ? (
          // Loading shimmer effect
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardShimmer key={index} />
          ))
        ) : flashSaleProducts?.data?.length === 0 ? (
          // No products message
          <Typography variant="h6" color="textSecondary" align="center">
            No products found
          </Typography>
        ) : (
          // Product cards
          flashSaleProducts?.data?.map((product, idx) => (
            <ProductCard product={product} key={idx} />
          ))
        )}
      </div>
    </section>
  );
};

export default FlashSaleProductListView;
