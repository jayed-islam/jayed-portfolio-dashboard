import useBoolean from "@/hooks/use-boolean";
import { paths } from "@/layouts/paths";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addProduct,
  ICartItem,
  replaceCart,
  toggleCart,
} from "@/redux/reducers/cart/cartSlice";
import VendorConflictModal from "@/sections/cart/view/vendor-confllict-on-cart-dialog";
import { IProduct } from "@/types/product";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: IProduct;
}

const ShopProductCard = ({ product }: Props) => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const conflictDilaog = useBoolean();

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ICartItem
  ) => {
    event.stopPropagation();
    if (cart.vendorId && cart.vendorId !== product.vendorId) {
      conflictDilaog.setTrue();
    } else {
      dispatch(addProduct(product));
      dispatch(toggleCart());
    }
  };

  const handleReplaceCart = (product: ICartItem) => {
    dispatch(replaceCart(product));
    conflictDilaog.setFalse();
  };

  const cartItem: ICartItem = {
    image: product?.images[0] as string,
    name: product?.name as string,
    price: product?.price as number,
    productId: product?._id as string,
    quantity: 1,
    total: product?.price as number,
    vendorId:
      typeof product?.vendor === "object"
        ? (product?.vendor?._id as string)
        : (product?.vendor as string),
  };

  return (
    <div className="bg-white shadow border rounded-3xl flex flex-col items-center justify-center">
      <Link href={`${paths.product.root}/${product._id}`}>
        <div className="relative w-full md:h-48 h-40 lg:h-56 bg-gray-100 rounded-3xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            height={500}
            width={500}
          />
        </div>
      </Link>

      <div className="flex flex-col items-center justify-center p-3">
        <Link href={`${paths.product.root}/${product._id}`}>
          <h3 className="text-md font-semibold line-clamp-1 overflow-ellipsis text-center">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={(event) => handleAddToCart(event, cartItem)}
          sx={{ marginTop: 2 }}
        >
          Add to Cart
        </Button>
      </div>
      <VendorConflictModal
        onReplaceCart={() => handleReplaceCart(cartItem)}
        onCancel={conflictDilaog.setFalse}
        open={conflictDilaog.value}
      />
    </div>
  );
};

export default ShopProductCard;
