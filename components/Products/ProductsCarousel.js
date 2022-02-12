import { useEffect, useRef, useState } from "react";
import Product from "./Product";

export default function ProductsCarousel({
  products,
  name,
  citiesFilter,
  statesFilter,
}) {
  const [productsState, setProductsState] = useState(products);
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    setProductsState(
      products.filter((product) => {
        if (citiesFilter === "all" && statesFilter === "all") return true;
        if (citiesFilter === "all" && statesFilter !== "all")
          return product.address.state === statesFilter;
        if (citiesFilter !== "all" && statesFilter === "all")
          return product.address.city === citiesFilter;
        return (
          product.address.state === statesFilter &&
          product.address.city === citiesFilter
        );
      })
    );
  }, [citiesFilter, statesFilter]);

  return (
    <>
      {productsState.length > 0 && (
        <div className="mt-4 relative">
          <h2 className="text-white text-xl">{name}</h2>
          <div className="w-full h-0.5 bg-[#CBCBCB]/50 mt-2 mb-3"></div>
          <div
            ref={ref}
            className="products border-2 border-dark bg-dark rounded-2xl p-5 flex scroll-smooth overflow-x-auto snap-x gap-x-4"
          >
            {productsState.map((product) => (
              <Product key={product.date} product={product} />
            ))}
          </div>
          <img
            alt="Arrow Right"
            src="/arrow-right.svg"
            onClick={() => scroll(250)}
            className="w-12 h-12 active:scale-90 cursor-pointer absolute top-[50%] -right-12"
          />
          <img
            alt="Arrow Right"
            src="/arrow-right.svg"
            onClick={() => scroll(-250)}
            className="w-12 h-12 active:scale-90 cursor-pointer absolute top-[50%] -left-12 rotate-180"
          />
        </div>
      )}
    </>
  );
}
