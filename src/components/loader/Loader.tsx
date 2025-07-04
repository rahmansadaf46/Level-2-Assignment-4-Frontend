import React from 'react';
import logo from'@/assets/loading.png';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center ">
      <img
        src={logo}
        alt="Loading"
        className="w-80"
      />
    </div>
  );
};

export default Loader;