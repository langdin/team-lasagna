import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { authService } from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #d3d3d3",
    padding: "10px",
    margin: "0 0 10px 0",
    borderRadius: "5px",
  },
}));

const CardInfoElement = () => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    setLoad(true);
    setError("");
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    try {
      const card = elements.getElement(CardElement);
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: card,
      });
      if (result.error) {
        // Show error to your customer.
        setLoad(false);
        setError(result.error.message);
        return;
      }
      const profileId = JSON.parse(localStorage.getItem("profile"))._id;
      const method = await axios.post(
        "http://localhost:3001/payment/method/add",
        {
          profile_id: profileId,
          payment_method_id: result.paymentMethod.id,
        },
        authService.authHeader()
      );
      setLoad(false);
      if (method.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setLoad(false);
      setError("Error! Unable to add card. Please check card ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.card}>
        <CardElement />
      </div>
      <Button
        variant="outlined"
        disabled={!stripe || !elements}
        color="primary"
        onClick={handleSubmit}
      >
        Save
      </Button>
      {load && (
        <Alert severity="info" style={{ marginTop: "10px" }}>
          Loading...
        </Alert>
      )}
      {error !== "" && (
        <Alert severity="error" style={{ marginTop: "10px" }}>
          {error}
        </Alert>
      )}
      {success && <Redirect to="/payment" />}
    </form>
  );
};

export default CardInfoElement;
