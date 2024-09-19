import React from "react";

function Star({ totalStar = 6, active = 3 }) {
  const stars = new Array(totalStar).fill(""); // Tüm yıldızları oluştur

  const midPoint = Math.ceil(totalStar / 2); // Ortadaki noktayı bul
  const topHalf = stars.slice(0, midPoint); // İlk yarıyı al
  const botHalf = stars.slice(midPoint); // İkinci yarıyı al

  return (
    <div className="space-y-2">
      {/* İlk yarı (topHalf) */}
      <div className="flex">
        {topHalf.map((_, i) => (
          <i
            className={`fa-solid fa-star ${
              i < active ? "text-slate-900" : "text-gray-300"
            }`}
            key={i}
          ></i>
        ))}
      </div>
      {/* İkinci yarı (botHalf) */}
      <div className="flex ">
        {botHalf.map((_, i) => (
          <i
            className={`fa-solid fa-star ${
              i + topHalf.length < active ? "text-slate-900" : "text-gray-300"
            }`}
            key={i + topHalf.length} // İkinci yarıda index'i düzgün paylaşmak için ekleyin
          ></i>
        ))}
      </div>
    </div>
  );
}

export default Star;
