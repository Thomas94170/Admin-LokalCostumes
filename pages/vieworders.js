import React from "react";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Vieworders() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchReference, setSearchReference] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5400/order");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("message : " + error);
      }
    }
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchReferenceChange = (event) => {
    setSearchReference(event.target.value);
  };

  const filteredItems = data.filter((item) =>
    item.reference.toLowerCase().includes(searchReference.toLowerCase())
  );
  const searchItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const currentItems = searchReference
    ? searchItems.slice(indexOfFirstItem, indexOfLastItem)
    : data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Information sur les commandes
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Id client
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Référence
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Prix
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 1 ? "bg-gray-100" : ""}
                >
                  <td className="px-4 py-2 text-sm leading-5 text-gray-900">
                    {item.userId}
                  </td>
                  <td className="px-4 py-2 text-sm leading-5 text-gray-900">
                    {item.reference}
                  </td>
                  <td className="px-4 py-2 text-sm leading-5 text-gray-900">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 text-sm leading-5 text-gray-900">
                    {item.prix}€
                  </td>
                </tr>
              ))}
              {searchItems.length === 0 && searchReference && (
                <tr>
                  <td colSpan="4">
                    <p>Référence inconnue</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-medium">
                {" "}
                {Math.min(indexOfLastItem, data.length)}
              </span>{" "}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {Array.from({ length: totalPages }, (_, index) => (
                <a
                  key={index}
                  href="#"
                  className={`relative inline-flex items-center ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  } px-4 py-2 text-sm font-semibold`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              ))}
              {/* Next Page Button */}
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
      <br />
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Recherche par Référence
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="reference"
                id="reference"
                autocomplete="reference"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Référence"
                value={searchReference}
                onChange={handleSearchReferenceChange}
              />
            </div>
          </div>
        </div>
      </div>
      <br />

      <Link href="/dashboard">Retour</Link>
    </>
  );
}
