// Function to filter products based on various filter criteria
export function filterProducts(products, filters) {
  return products.filter((product) => {
    let isMatch = true;

    // Filter by color
    if (filters.color && filters.color.length > 0) {
      isMatch = isMatch && filters.color.includes(product.color);
    }

    // Filter by category
    if (filters.category && filters.category.length > 0) {
      isMatch = isMatch && filters.category.includes(product.category);
    }

    // Filter by size
    if (filters.size && filters.size.length > 0) {
      isMatch = isMatch && filters.size.includes(product.size);
    }

    // Filter by price range
    if (filters.price && filters.price.length > 0) {
      isMatch = isMatch && filters.price.some((range) => isPriceInRange(product.price, range));
    }

    // Filter by discount
    if (filters.discount && filters.discount.length > 0) {
      isMatch = isMatch && filters.discount.some((minDiscount) => product.discount >= minDiscount);
    }

    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      isMatch = isMatch && filters.availability.includes(product.availability);
    }

    return isMatch;
  });
}

// Function to check if the product's price falls within the specified range
function isPriceInRange(price, range) {
  switch (range) {
    case 'under500':
      return price < 500;
    case '500-1000':
      return price >= 500 && price <= 1000;
    case '1000-1500':
      return price >= 1000 && price <= 1500;
    case 'above1500':
      return price > 1500;
    default:
      return true;
  }
}

// Function to get available filters from the product data
export function getAvailableFilters(products) {
  const colors = [...new Set(products.map((product) => product.color))];
  const categories = [...new Set(products.map((product) => product.category))];
  const sizes = [...new Set(products.map((product) => product.size))];

  // Price filters (using range arrays for better clarity)
  const priceRanges = [
    { label: 'Under 500', range: [0, 499] },
    { label: '500-1000', range: [500, 1000] },
    { label: '1000-1500', range: [1000, 1500] },
    { label: 'Above 1500', range: [1500, Infinity] },
  ];

  // Discount filters (based on predefined discount percentages)
  const discountOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80]; // No discount, 10%+, 20%+, etc.

  // Availability options (in-stock or out-of-stock)
  const availabilityOptions = ['in-stock', 'out-of-stock'];

  return {
    colors,
    categories,
    sizes,
    priceRanges,
    discountOptions,
    availabilityOptions,
  };
}
