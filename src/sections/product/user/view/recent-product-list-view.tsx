"use client";

import ProductCard from "@/layouts/common/product-card";
import { IProduct } from "@/types/product";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const RecentProductsView = () => {
  const [recentProducts, setRecentProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // Retrieve the last 10 viewed products from localStorage
    const storedProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    setRecentProducts(storedProducts);
  }, []);

  return (
    <section className="px-5 2xl:px-0 max-w-5xl mx-auto py-11">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Recent Viewed Product</h2>
        <p className="text-gray-600 text-lg">
          Grab these exclusive deals before they&lsquo;re gone!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recentProducts?.length === 0 ? (
          // No products message
          <Typography variant="h6" color="textSecondary" align="center">
            No products found
          </Typography>
        ) : (
          // Product cards
          recentProducts?.map((product, idx) => (
            <ProductCard product={product} key={idx} />
          ))
        )}
      </div>
    </section>
  );
};

export default RecentProductsView;
