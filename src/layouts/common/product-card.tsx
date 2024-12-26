import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="bg-white shadow border rounded-3xl flex flex-col items-center justify-center"
    >
      <div className="relative w-full md:h-48 h-40 lg:h-56 bg-gray-100 rounded-3xl overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          height={500}
          width={500}
        />
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        <h3 className="text-md font-semibold line-clamp-1 overflow-ellipsis text-center">
          {product.name}
        </h3>
        <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
        <Link
          href={`/products/${product._id}`}
          className="inline-block mt-3 bg-gray-600 text-white py-1 px-4 rounded-3xl hover:bg-gray-700 transition-colors text-xs md:text-sm"
        >
          View Details
        </Link>
      </div>
    </Link>
  );
};

export default ProductCard;
