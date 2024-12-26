import { IProduct } from "@/types/product";

export const trackRecentlyViewedProduct = (product: IProduct) => {
  const storedProducts = JSON.parse(
    localStorage.getItem("recentProducts") || "[]"
  );

  // Check if the product already exists in the recent products
  const existingIndex = storedProducts.findIndex(
    (p: IProduct) => p._id === product._id
  );

  // If the product exists, remove it and add it to the beginning (to make it the most recently viewed)
  if (existingIndex !== -1) {
    storedProducts.splice(existingIndex, 1);
  }

  // Add the current product to the beginning of the list
  storedProducts.unshift(product);

  // Keep only the last 10 products
  if (storedProducts.length > 10) {
    storedProducts.pop();
  }

  // Store the updated list in localStorage
  localStorage.setItem("recentProducts", JSON.stringify(storedProducts));
};
