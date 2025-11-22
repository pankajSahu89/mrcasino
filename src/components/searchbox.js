import React from 'react';

const SearchBox = () => {
  return (
    <div className="sm:w-[200px] lg:w-[800px] text-md md:text-md lg:text-2xl text-black max-w-full mx-auto flex items-center bg-white  rounded-2xl shadow-md" 
    style={{
        fontFamily: 'BigNoodleTitling',
        lineHeight: '1.2',
        wordSpacing: '0.1em',
        fontWeight: '100',
        letterSpacing: '0.05em',
      }}
      >
      
      <input
        type="text"
        placeholder="Find over 1000 casinos"
        className="flex-1 basis-[70%] p-4 text-lg border-none outline-none rounded-l-2xl"
      />

      
      <button className="basis-[30%] bg-red-600 text-white p-5 mt-0 rounded-r-2xl hover:bg-red-700">
        Search
      </button>
    </div>
  );
};

export default SearchBox;
