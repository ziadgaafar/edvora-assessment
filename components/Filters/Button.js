export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-light flex justify-between items-center py-2 px-4 rounded-md hover:bg-light/80 hover:shadow-sm hover:shadow-light active:bg-light/60"
    >
      <p className="text-sm">{text}</p>
      <img src="arrow-down.svg" alt="Arrow Down" className="mt-1" />
    </button>
  );
}
