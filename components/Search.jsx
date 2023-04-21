import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import SearchCard from './SearchCard';

async function getCar(query) {
  const cars = [
    'honda',
    'Toyota',
    'Lexus',
    'Benz',
    'BMW',
    'Audi',
    'Crysler',
    'Nissan',
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        cars.filter((car) => car.toLowerCase().includes(query.toLowerCase()))
      );
    }, 500);
  });
}

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debounceValue;
}

function Search() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debounceQuery = useDebounce(query, 500);
  const controller = new AbortController();

  useEffect(() => {
    const signal = controller.signal;
    (async () => {
      setSuggestions([]);
      if (debounceQuery.length > 0) {
        const data = await getCar(debounceQuery, signal);
        setSuggestions(data);
      }
    })();
    return () => {
      controller.abort('Cancel request');
    };
  }, [debounceQuery]);

  return (
    <div className="relative">
      <div>
        <input
          type=""
          id="search"
          value={query}
          placeholder="Search..."
          className="w-96 px-3 py-2 shadow-md border ring-blue-300 focus:ring-1 outline-none rounded-md"
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="absolute top-3 right-3 text-gray-400">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </p>
      </div>
      <div className="absolute bg-slate-100 w-full z-50 top-12 rounded-sm shadow-md text-gray-700">
        {query &&
          suggestions.map((suggestion, index) => (
            <div key={index}>
              <div className="relative h-full">
                <div className="py-2 px-4 border-b bg-white overflow-y-scroll text-gray-800 cursor-pointer hover:bg-gray-100">
                  {suggestion}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
