import Head from "next/head";
import axios from "axios";
import ProductsCarousel from "../components/Products/ProductsCarousel";
import Filters from "../components/Filters/Filters";
import { useEffect, useState } from "react";

export default function Home({ products, productNames, cities, states }) {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [productNamesFilter, setProductNamesFilter] = useState("all");
  const [statesFilter, setStatesFilter] = useState("all");
  const [citiesFilter, setCitiesFilter] = useState("all");
  const [state, setState] = useState({
    productNames,
    cities,
    states,
  });

  useEffect(() => {
    if (productNamesFilter !== "all") {
      setState((prev) => ({ ...prev, productNames: [productNamesFilter] }));
      return;
    }
    setState((prev) => ({ ...prev, productNames }));
  }, [productNamesFilter]);

  return (
    <>
      <Head>
        <title>Edvora</title>
        <meta name="description" content="Edvora Assessment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex p-12 lg:p-0 lg:py-12 lg:pr-12 text-white lg:space-x-12 relative">
        <div
          className={`w-full min-h-full fixed top-0 right-0 bg-black/90 ${
            showBackdrop ? "z-10 opacity-100" : "-z-10 opacity-0"
          }`}
        >
          <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <div
              onClick={() => setShowBackdrop((prev) => !prev)}
              className="px-4 py-2 bg-dark rounded shadow cursor-pointer active:scale-95"
            >
              X
            </div>
            <div className="w-1/2 max-w-sm">
              <Filters
                productNames={productNames}
                states={states}
                cities={cities}
                setProductNamesFilter={setProductNamesFilter}
                setStatesFilter={setStatesFilter}
                setCitiesFilter={setCitiesFilter}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:w-1/4 lg:flex lg:flex-col">
          <Filters
            productNames={productNames}
            states={states}
            cities={cities}
            setProductNamesFilter={setProductNamesFilter}
            setStatesFilter={setStatesFilter}
            setCitiesFilter={setCitiesFilter}
          />
        </div>
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center">
            <h1 className="text-white/90 text-4xl font-bold mb-4">Edvora</h1>
            <div
              onClick={() => setShowBackdrop((prev) => !prev)}
              className="lg:hidden p-4 space-y-2 bg-dark rounded shadow cursor-pointer active:scale-95"
            >
              <span className="block w-8 h-1 bg-white/90"></span>
              <span className="block w-8 h-1 bg-white/90"></span>
              <span className="block w-8 h-1 bg-white/90"></span>
            </div>
          </div>
          <h2 className="text-white/50 text-2xl">Products</h2>
          {state.productNames.map((name) => (
            <ProductsCarousel
              key={name}
              statesFilter={statesFilter}
              citiesFilter={citiesFilter}
              products={products.filter(
                (product) => product.product_name === name
              )}
              name={name}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("https://assessment-edvora.herokuapp.com/");
  const products = await res.data;
  let productNames = [];
  let states = [];
  let cities = [];

  products.forEach((product) => {
    if (productNames.includes(product.product_name)) return;
    productNames.push(product.product_name);
  });

  products.forEach((product) => {
    if (states.includes(product.address.state)) return;
    states.push(product.address.state);
  });

  products.forEach((product) => {
    if (cities.includes(product.address.city)) return;
    cities.push(product.address.city);
  });

  return {
    props: {
      products,
      productNames,
      states,
      cities,
    },
  };
}
