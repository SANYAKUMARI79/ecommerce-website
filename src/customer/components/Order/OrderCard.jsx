import { Grid } from '@mui/material';
import React from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = () => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/account/order/${5}`)} className='p-5 shadow-md shadow-black hover:shadow-2xl border'>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        {/* Product Info Section */}
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://tse4.mm.bing.net/th?id=OIP.liXWbOZtrpocsJUvoCXXLAHaLH&pid=Api&P=0&h=180"
              alt="Product"
            />
            <div className="ml-5 space-y-2">
              <p>Men Slim Mid Rise Black Pant</p>
              <p className="opacity-50 text-xs font-semibold">Size: M</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid>

        {/* Price Section */}
        <Grid item xs={2}>
          <p>RS. 1099</p>
        </Grid>

        {/* Delivery Status Section */}
        <Grid item xs={4}>
          {true && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span>Delivered on March 03</span>
              </p>
              <p className="text-xs">Your item has been delivered</p>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
