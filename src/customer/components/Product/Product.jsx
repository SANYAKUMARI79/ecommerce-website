import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { mens_kurta } from '../../../data/mens_kurta';
import ProductCard from './ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

const subCategories = [
  { name: 'Men', href: '#' },
  { name: 'Women', href: '#' },
  { name: 'Kids', href: '#' },
];

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    id: 'discount',
    name: 'Discount',
    options: [
      { value: '10', label: '10%' },
      { value: '20', label: '20%' },
      { value: '30', label: '30%' },
    ],
  },
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { value: 'inStock', label: 'In Stock' },
      { value: 'outOfStock', label: 'Out of Stock' },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    color: '',
    size: '',
    price: '',
    discount: '',
    availability: '',
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Handle filter changes and update URL
  const handleFilterChange = (e, filterId) => {
    const { value } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));

    // Update the query params
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set(filterId, value);
    } else {
      searchParams.delete(filterId);
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Corrected event handler for radio button filter change
  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value); // Fixed the typo from e.terget to e.target
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Filter products based on the selected filters in the URL
  const filteredProducts = mens_kurta.filter((product) => {
    let matches = true;
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('color') && queryParams.get('color') !== product.color) {
      matches = false;
    }
    if (queryParams.has('size') && queryParams.get('size') !== product.size) {
      matches = false;
    }
    if (queryParams.has('price')) {
      const priceFilter = queryParams.get('price');
      if (priceFilter === 'low' && product.price > 50) {
        matches = false;
      } else if (priceFilter === 'high' && product.price <= 50) {
        matches = false;
      }
    }
    if (queryParams.has('discount') && queryParams.get('discount') !== product.discount) {
      matches = false;
    }
    if (queryParams.has('availability') && queryParams.get('availability') !== product.availability) {
      matches = false;
    }

    return matches;
  });

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative mx-auto px-4 sm:px-6 lg:px-20 flex size-full transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            <div className="flex items-center justify-between px-20">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href} className="block px-2 py-3">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>

              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <input
                              value={option.value}
                              id={`${section.id}-${option.value}`} // Fixed the template literal syntax
                              name={section.id}
                              type="radio"
                              checked={selectedFilters[section.id] === option.value}
                              onChange={(e) => handleRadioFilterChange(e, section.id)} // Corrected the function name
                              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                          </div>
                          <label
                            htmlFor={`${section.id}-${option.value}`} // Fixed the template literal syntax
                            className="min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <a
                        href={option.href}
                        className={classNames(
                          option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                          'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                        )}
                      >
                        {option.name}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
              <span className="sr-only">View grid</span>
              <Squares2X2Icon aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <input
                              value={option.value}
                              id={`${section.id}-${option.value}`} // Fixed the template literal syntax
                              name={section.id}
                              type="radio"
                              checked={selectedFilters[section.id] === option.value}
                              onChange={(e) => handleRadioFilterChange(e, section.id)} // Corrected the function name
                              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                          </div>
                          <label
                            htmlFor={`${section.id}-${option.value}`} // Fixed the template literal syntax
                            className="min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
