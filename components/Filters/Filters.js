import { useEffect, useState } from "react";
import Button from "./Button";
import Menu from "./Menu";

export default function Filters({
  productNames,
  states,
  cities,
  setProductNamesFilter,
  setCitiesFilter,
  setStatesFilter,
}) {
  return (
    <div className="bg-dark p-8 rounded-2xl">
      <h2 className="text-white/50 text-2xl">Filters</h2>
      <div className="w-full h-0.5 bg-[#CBCBCB]/50 mt-2 mb-3"></div>
      <div className="flex flex-col mt-8 space-y-4">
        <Menu
          buttonText="Products"
          items={productNames}
          setFilter={setProductNamesFilter}
        />
        <Menu buttonText="State" items={states} setFilter={setStatesFilter} />
        <Menu buttonText="City" items={cities} setFilter={setCitiesFilter} />
      </div>
    </div>
  );
}
