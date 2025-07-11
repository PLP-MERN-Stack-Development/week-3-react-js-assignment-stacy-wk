import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;