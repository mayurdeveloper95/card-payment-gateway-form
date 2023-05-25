import React, { useEffect } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { useFormContext } from "react-hook-form";
import { TextField, InputAdornment, Grid, Container } from "@mui/material";

const CreditCardForm = () => {
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext();

  const validation = (name, e) => {
    setValue(name, e.target.value, false);
    trigger(name);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <TextField
            {...getCardNumberProps({
              onChange: validation,
            })}
            {...register("payment.cardnumber", {
              maxLength: {
                value: 16,
                message: "Card number must be a 16 digit number",
              },
              required: "Enter a card number",
            })}
            inputRef={getCardNumberProps({ register }).ref}
            fullWidth
            type="tel"
            label="Credit/Debit card number"
            name="payment.cardnumber"
            variant="filled"
            error={
              (erroredInputs.cardNumber && touchedInputs.cardNumber) ||
              !!errors?.payment?.cardnumber?.message
            }
            helperText={
              (erroredInputs.cardNumber && touchedInputs.cardNumber) ||
              errors?.payment?.cardnumber?.message
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <svg {...getCardImageProps({ images })} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            {...getExpiryDateProps({
              onChange: validation,
            })}
            {...register("payment.expiry", {
              required: "Enter an expiry date",
            })}
            inputRef={getExpiryDateProps().ref}
            fullWidth
            type="tel"
            label="Expiry date"
            name="payment.expiry"
            variant="filled"
            error={
              (erroredInputs.expiryDate && touchedInputs.expiryDate) ||
              !!errors?.payment?.expiry?.message
            }
            helperText={
              (erroredInputs.expiryDate && touchedInputs.expiryDate) ||
              errors?.payment?.expiry?.message
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...getCVCProps({
              onChange: validation,
            })}
            {...register("payment.cvv", {
              required: "Enter a CVV",
            })}
            inputRef={getCVCProps().ref}
            fullWidth
            type="tel"
            label="CVV"
            name="payment.cvv"
            variant="filled"
            error={
              (erroredInputs.cvc && touchedInputs.cvc) ||
              !!errors?.payment?.ccv?.message
            }
            helperText={
              (erroredInputs.cvc && touchedInputs.cvc) ||
              errors?.payment?.ccv?.message
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("payment.accountHolderName", {
              onChange: validation.bind(null, "payment.accountHolderName"),
              required: "Name required",
            })}
            fullWidth
            variant="filled"
            type="text"
            label="Name on Card"
            placeholder="Name on Card"
            name="payment.accountHolderName"
            error={!!errors.payment?.accountHolderName?.message}
            helperText={errors.payment?.accountHolderName?.message}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreditCardForm;
