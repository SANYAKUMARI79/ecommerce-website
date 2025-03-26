import React, { useEffect, useState } from "react";
import MainCarosel from "../../components/homeCarosel/MainCarosel";
import HomeSectionCarosel from "../../components/HomeSectionCarosel/HomeSectionCarosel";
import API_BASE_URL from "../../../config/api"; // Import backend URL

const HomePage = () => {
  const [products, setProducts] = useState([]); // Store fetched products

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`) // Fetch from backend API
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <MainCarosel />

      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        {products.length > 0 ? (
          <>
            <HomeSectionCarosel data={products} sectionName={"Men's Kurta"} />
            <HomeSectionCarosel data={products} sectionName={"Men's Shoes"} />
            <HomeSectionCarosel data={products} sectionName={"Men's Shirts"} />
            <HomeSectionCarosel data={products} sectionName={"Women's Saree"} />
            <HomeSectionCarosel data={products} sectionName={"Women's Dress"} />
          </>
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
