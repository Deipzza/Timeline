import React from 'react';

const Header = ({ title }) => {
  return (
    <>
      <div className="grid place-items-center">
        <h1 className="text-5xl m-10 font-bold">{title}</h1>
      </div>
    </>
  );
}

export default Header;