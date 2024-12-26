/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
  Pagination,
} from "@mui/material";
import { useGetAllProductListQuery } from "@/redux/reducers/product/projectApi";
import { useGetCategoriesQuery } from "@/redux/reducers/category/categoryApi";
import ProductCard from "@/layouts/common/product-card";
import ProductCardShimmer from "@/layouts/common/product-shimmer-card";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";

const getPriceRange = (key: string) => {
  switch (key) {
    case "1-50":
      return { minPrice: 1, maxPrice: 50 };
    case "50-100":
      return { minPrice: 50, maxPrice: 100 };
    case "100-200":
      return { minPrice: 100, maxPrice: 200 };
    case "200-500":
      return { minPrice: 200, maxPrice: 500 };
    case "500-1000":
      return { minPrice: 500, maxPrice: 1000 };
    case "1000+":
      return { minPrice: 1000, maxPrice: Number.MAX_SAFE_INTEGER };
    case "all":
    default:
      return { minPrice: 0, maxPrice: Number.MAX_SAFE_INTEGER };
  }
};

const ProductListView = () => {
  const { user } = useAppSelector((state) => state.auth);
  // const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "";
  const querySearchTerm = searchParams.get("search") || "";
  const [category, setCategory] = useState(queryCategory);
  const [searchTerm, setSearchTerm] = useState(querySearchTerm);
  const [priceRangeKey, setPriceRangeKey] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();

  const { data: productsData, isFetching: isProductsLoading } =
    useGetAllProductListQuery({
      category,
      limit,
      page,
      searchTerm,
      ...getPriceRange(priceRangeKey),
      ...(user?._id && { userId: user._id }),
    });

  const priceRangeOptions = [
    { label: "All Prices", value: "all" },
    { label: "1 to 50", value: "1-50" },
    { label: "50 to 100", value: "50-100" },
    { label: "100 to 200", value: "100-200" },
    { label: "200 to 500", value: "200-500" },
    { label: "500 to 1000", value: "500-1000" },
    { label: "1000 and above", value: "1000+" },
  ];

  const totalPages = productsData?.data?.pagination.totalPages;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="px-5 2xl:px-0 max-w-5xl mx-auto py-11">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Explore Products</h2>
        <p className="text-gray-600 text-lg">
          Grab these exclusive deals before they&lsquo;re gone!
        </p>
      </div>

      {/* Filters Section */}
      <Paper sx={{ padding: 2, marginBottom: 4, borderRadius: "0.75rem" }}>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          {/* Search Bar */}
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1, minWidth: "200px" }}
          />

          {/* Category Filter */}
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            size="small"
            sx={{ flex: 1, minWidth: "200px", borderRadius: "0.75rem" }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categoryData?.data?.map((item) => (
              <MenuItem value={item._id} key={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          {/* Price Range Filter */}
          <Select
            value={priceRangeKey}
            onChange={(e) => setPriceRangeKey(e.target.value)}
            displayEmpty
            size="small"
            sx={{ flex: 1, minWidth: "200px", borderRadius: "0.75rem" }}
          >
            {priceRangeOptions.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Paper>

      {/* Products Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isProductsLoading ? (
          // Loading shimmer effect
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardShimmer key={index} />
          ))
        ) : productsData?.data?.products?.length === 0 ? (
          // No products message
          <Typography variant="h6" color="textSecondary" align="center">
            No products found
          </Typography>
        ) : (
          // Product cards
          productsData?.data?.products?.map((product, idx) => (
            <ProductCard product={product} key={idx} />
          ))
        )}
      </div>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default ProductListView;
