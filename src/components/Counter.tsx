"use client";

import { atom, useAtom } from "jotai";

const countAtom = atom(0);

export default function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Jotai Counter</h2>
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setCount((c) => c - 1)}
        >
          -
        </button>
        <span className="text-2xl font-mono">{count}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
