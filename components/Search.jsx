import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import searchIcon from '../public/search.png';
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

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        cars.filter((car) => car.toLowerCase().includes(query.toLowerCase()))
      );
    }, 1000);
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
  const debounceValue = useDebounce(query, 500);

  useEffect(() => {
    (async () => {
      setSuggestions([]);
      if (debounceValue.length > 0) {
        const data = await getCar(debounceValue);
        setSuggestions(data);
      }
    })();
  }, [debounceValue]);

  return (
    <div className="relative">
      <div>
        <input
          type="input"
          id="search"
          value={query}
          placeholder="Search..."
          className="w-96 px-3 py-2 border ring-blue-300 focus:ring-1 outline-none rounded-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="absolute top-3 right-3">
          <Image src={searchIcon} alt="search icon" width={20} height={20} />
        </p>
      </div>
      <div className="absolute bg-slate-100 w-52 z-50 top-14 rounded-sm shadow-md">
        {query &&
          suggestions.map((suggestion, index) => (
            <div key={index}>
              <div className="relative h-full">
                <div className="py-2 px-4 border-b bg-slate-50 overflow-y-scroll text-gray-500 cursor-pointer hover:bg-slate-200 hover:text-white">
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
