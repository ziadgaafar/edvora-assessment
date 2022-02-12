import { useEffect, useState } from "react";
import Button from "./Button";

export default function Menu({ buttonText, items, setFilter }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(buttonText);

  useEffect(() => {
    setFilter(selected === buttonText ? "all" : selected);
  }, [selected]);

  return (
    <div className="relative">
      <Button text={selected} onClick={() => setOpen((prev) => !prev)} />
      <div
        className={`border-dark border-2 rounded-br-xl rounded-bl-xl absolute w-full top-full z-10 flex flex-col items-center overflow-y-auto py-2 transition-all duration-300 ${
          open ? "opacity-100 h-32" : "opacity-0 h-0"
        } bg-light`}
      >
        <button
          onClick={() => {
            setSelected(buttonText);
            setOpen(false);
          }}
          className="p-2 w-full hover:bg-dark/60 active:bg-dark/50"
        >
          All
        </button>
        {items.map((item) => (
          <button
            className="p-2 w-full hover:bg-dark/60 active:bg-dark/50"
            key={item}
            onClick={() => {
              setSelected(item);
              setOpen(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
