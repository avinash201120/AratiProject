"use client";

interface Box {
  id: number;
  color: string;
  text: string;
}

const boxes: Box[] = [
  { id: 1, color: "#26b7b4", text: "Eco-Solidarity Neighbors" },
  { id: 2, color: "#26b7b4", text: "Eco-Responsible Markets" },
  { id: 3, color: "#26b7b4", text: "Local Promotions" },
  { id: 4, color: "#26b7b4", text: "An Approved Platform" },
];

export function BoxSection() {
  return (
    <div className="container mx-auto mt-4 flex justify-around gap-4 px-4">
      {boxes.map((box) => (
        <div
          key={box.id}
          className="bg-white text-[#26b7b4] p-4 rounded-md border-2 border-[#26b7b4] flex flex-col items-center justify-center text-center shadow-md w-1/4"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#26b7b4] text-white text-lg font-bold mb-2">
            {box.id}
          </div>
          <div className="text-sm">{box.text}</div>
        </div>
      ))}
    </div>
  );
}
