import React from "react";

const HomeSectionCard = ({ imageUrl, brand, title }) => {
  console.log("Image URL:", imageUrl); 
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border">
      <div className="h-[13rem] w-[10rem]">
        <img className="object-cover object-top w-full h-full" src={imageUrl|| "https://via.placeholder.com/150"} alt={title} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{brand}</h3>
        <p className="mt-2 text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
