import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard"; // Adjust path if necessary

const DeliveryAddressForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("Zip"),
      mobile: data.get("PhoneNumber"),
    };
    console.log("address", address);
  };

  return (
    <div>
      <Grid container spacing={4}>
        {/* Left Side: Address List */}
        <Grid
          item
          xs={12}
          md={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            <AddressCard>
              <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }} size="large" variant="contained">
                Deliver here
              </Button>
            </AddressCard>
          </div>
        </Grid>

        {/* Right Side: Address Form */}
        <Grid item xs={12} md={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField required id="firstName" name="firstName" label="First Name" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="lastName" name="lastName" label="Last Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="city" name="city" label="City" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="state" name="state" label="State" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="Zip" name="Zip" label="Zip Code" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id="PhoneNumber" name="PhoneNumber" label="Phone Number" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }} size="large" variant="contained" type="submit">
                    Deliver here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
