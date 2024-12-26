const ProductCardShimmer = () => {
  return (
    <div className="bg-white shadow border rounded-3xl flex flex-col items-center justify-center animate-pulse">
      <div className="relative w-full md:h-48 h-40 lg:h-56 bg-gray-200 rounded-3xl"></div>

      <div className="flex flex-col items-center justify-center p-3 w-full">
        <div className="w-3/4 h-4 bg-gray-200 rounded mt-3"></div>

        <div className="w-1/2 h-3 bg-gray-200 rounded mt-2"></div>

        <div className="w-2/3 h-8 bg-gray-300 rounded-3xl mt-4"></div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
