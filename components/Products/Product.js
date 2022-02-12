export default function Product({ product }) {
  return (
    <div className="shrink-0 snap-center grid grid-cols-2 gap-4 bg-light p-4 transition-all duration-300 hover:scale-y-110 text-sm text-white/50 sm:text-xs rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <img
        src={product.image}
        alt={product.product_name}
        className="rounded-md lg=[w-70px] lg:h-[70px]"
      />
      <div className="flex flex-col justify-evenly">
        <p className="text-white text-lg sm:text-sm">{product.product_name}</p>
        <p className="">{product.brand_name}</p>
        <p className="text-white text-lg sm:text-sm">
          {product.price === 0 ? "Free" : `$ ${product.price}`}
        </p>
      </div>
      <p>
        {product.address.city} - {product.address.state}
      </p>
      <p className="">
        Date: {new Date(product.date).toLocaleDateString().split("/").join(":")}
      </p>
      <p className="col-span-2">{product.discription}</p>
    </div>
  );
}
