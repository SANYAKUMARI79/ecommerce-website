import React from 'react';

const AddressCard = ({ children }) => {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <div className="space-y-3">
        <p className="font-semibold">Sanya Srivastava</p>
        <p>Pune, Maharashtra, 32972</p>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>950843664</p>
        </div>
      </div>
      {children}  
    </div>
  );
}

export default AddressCard;
