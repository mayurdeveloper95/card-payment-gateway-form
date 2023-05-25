import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import PaymentForm from "./PaymentForm";
import axios from "axios";

const FormWrapper = () => {
  const useHookForm = useForm();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    document.location.reload();
  };

  const onFormSubmit = async (data) => {
    const formData = {
      cardNo: data.payment.cardnumber,
      cvv: data.payment.cvv,
      expiryMonth: data.payment.expiry.substring(0, 2),
      expiryYear: data.payment.expiry.substring(2, 4),
      name: data.payment.accountHolderName,
    };
    await axios
      .post("https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9", {
        headers: {
          "Content-Type": "application/json",
          Origin: "https://instacred.me",
        },
        formData,
      })
      .then((response) => {
        setSuccess(response.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err.data);
        setOpen(true);
      });
  };

  let currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes();

  return (
    <FormProvider {...useHookForm}>
      <form noValidate onSubmit={useHookForm.handleSubmit(onFormSubmit)}>
        <PaymentForm />
        <Box display="flex" justifyContent="center" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      {(success?.success || error.data) && (
        <Dialog open={open} onClose={handleClose}>
          {success.data && (
            <>
              <DialogTitle>Payment Successful</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Your Payment is Successfully Completed.
                  <br />
                  Request Id is: {success.data?.requestId}
                  <br />
                  Request Date is: {datetime}
                </DialogContentText>
              </DialogContent>
            </>
          )}
          {error.data && (
            <>
              <DialogTitle>Payment Failure</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {error.data}
                  <br />
                  Request Date is: {datetime}
                </DialogContentText>
              </DialogContent>
            </>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
    </FormProvider>
  );
};

export default FormWrapper;
