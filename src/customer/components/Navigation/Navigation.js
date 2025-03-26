import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { navigation } from "./navigationData"; // Your navigation data

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  // Handle user menu open and close
  const handleUserClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  return (
    <div className="bg-white pb-10">
      {/* Mobile Menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Company and Store Links */}
                <div className="px-4 pb-6">
                  <ul className="space-y-4">
                    {navigation.pages.map((page) => (
                      <li key={page.name}>
                        <Link to={page.id} className="block text-gray-500 hover:text-gray-900">
                          {page.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Categories */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>

                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        {/* Sections like Clothing, Accessories for Men and Women */}
                        <div className="space-y-8">
                          {category.sections.map((section) => (
                            <div key={section.id}>
                              <p className="font-medium text-gray-900">{section.name}</p>
                              <ul className="mt-6 flex flex-col space-y-6">
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <Link
                                      to={item.href || `/${category.id}/${section.id}/${item.id}`}
                                      className="-m-2 block p-2 text-gray-500"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Navigation */}
      <header className="relative bg-white">
        <nav className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/ddkso1wxi/image/upload/v1675919455/Logo/Copy_of_Zosh_Academy_nblljp.png"
                  alt="Shopwithzosh"
                  className="h-8 w-8 mr-2"
                />
              </Link>

              {/* Company and Store Links (On same level as Men/Women) */}
              <div className="ml-10 flex space-x-6">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.id}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>

              {/* Categories (Men/Women) */}
              <div className="ml-10 flex space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="relative">
                    <Popover.Button className="text-gray-700 hover:text-gray-900">
                      {category.name}
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 w-56 mt-3 transform px-4">
                      <div className="space-y-6 bg-white py-4 shadow-lg">
                        {/* Men and Women Categories */}
                        {category.name === "Men" || category.name === "Women" ? (
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="object-cover object-center"
                                  />
                                </div>
                                <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                  {item.name}
                                </Link>
                                <p aria-hidden="true" className="mt-1">Shop now</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Company and Store Sections
                          category.sections.map((section) => (
                            <div key={section.name}>
                              <p className="font-medium text-gray-900">{section.name}</p>
                              <ul className="mt-4 space-y-4">
                                {section.items.map((item) => (
                                  <li key={item.name} className="text-sm">
                                    <Link to={item.href || `/${category.id}/${section.id}/${item.id}`} className="text-gray-500 hover:text-gray-900">
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        )}
                      </div>
                    </Popover.Panel>
                  </Popover>
                ))}
              </div>

              {/* Search and Cart */}
              <div className="ml-auto flex items-center space-x-6">
                {/* Cart Icon */}
                <div className="relative">
                  <ShoppingBagIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => navigate("/cart")} />
                  {/* Cart Count (Add logic to update count dynamically) */}
                  <span className="absolute top-0 right-0 rounded-full bg-indigo-600 text-white text-xs px-1.5">
                    3
                  </span>
                </div>

                {/* User Avatar & Menu */}
                <Avatar sx={{ bgcolor: deepPurple[500], color: "white", cursor: "pointer" }} onClick={handleUserClick}>
                  S
                </Avatar>
                <Menu id="basic-menu" anchorEl={anchorEl} open={openUserMenu} onClose={handleCloseUserMenu}>
                  <MenuItem>My Orders</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </Menu>

                {/* Search Icon */}
                <p onClick={() => navigate("/products/search")} className="p-2 text-gray-400 hover:text-gray-500">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </p>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
