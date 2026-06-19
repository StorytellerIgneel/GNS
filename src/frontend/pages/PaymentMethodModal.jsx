import { useState } from "react";
import PaymentOption from "../Payment/PaymentOption";
import paymentMethods from "../Payment/paymentMethods";
import PaymentModal from "./PaymentModal";
import Modal from "../include/Modal/Modal";

function PaymentMethodModal() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [ccFormValid, setCcFormValid] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleCreditCardInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const newErrors = validateCreditCardForm({
      ...formData,
      [name]: value,
    });
    setErrors(newErrors);

    setCcFormValid(Object.keys(newErrors).length === 0);
  };

  const validateCreditCardForm = (data) => {
    const errors = {};
    if (!data.cardNumber.trim()) {
      errors.cardNumber = "Credit card number is required";
    } else if (!ccNumberFormat(data.cardNumber)) {
      errors.cardNumber = "Invalid credit card number";
    }
    if (!data.expiration.trim()) {
      errors.expiration = "Expiry date is required";
    } else if (!ccExpiresFormat(data.expiration)) {
      errors.expiration = "Invalid expiry date";
    }
    if (!data.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!ccCVVFormat(data.cvv)) {
      errors.cvv = "Invalid CVV";
    }
    return errors;
  };

  const ccNumberFormat = (input) => {
    const ccNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/; // handle Visa Card Numbers only
    return ccNumber.test(input);
  };

  const ccExpiresFormat = (input) => {
    const ccExpires = /^(0[1-9]|1[0-2])\/[0-9]{2}$/; // handle valid date
    return ccExpires.test(input);
  };

  const ccCVVFormat = (input) => {
    const ccCVV = /^\d{3}$/; // handle 3 digits
    return ccCVV.test(input);
  };

  const handleSubmit = (event) => {
    if (selectedPaymentMethod === "Credit Card") {
      const newErrors = validateCreditCardForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log("Form submitted successfully");
      } else {
        event.preventDefault();
        console.log("Form contains errors");
      }
    }
  };

  const handleSubmitMethodClick = () => {
    setPaymentOpen(true);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="flex items-center">
        <div className="relative flex items-center justify-center pr-4">
          <span className="absolute font-bold text-white">1</span>
          <div className="h-8 w-8 rounded-full bg-black"></div>
        </div>
        <p className="text-lg font-bold">Select payment method</p>
      </div>
      <form
        method="post"
        className="m-auto flex w-[80%] flex-col items-center space-y-3 p-5"
        onSubmit={handleSubmit}
      >
        {paymentMethods.map((method) => (
          <PaymentOption
            key={method.id}
            id={method.id}
            value={method.value}
            imageSrc={method.imageSrc}
            altText={method.altText}
            labelText={method.labelText}
            checked={selectedPaymentMethod === method.value}
            onChange={handlePaymentMethodChange}
            showCreditCardForm={selectedPaymentMethod === "Credit Card"}
            cardNumber={formData.cardNumber}
            expiration={formData.expiration}
            cvv={formData.cvv}
            onCreditCardInputChange={handleCreditCardInputChange}
            errors={errors}
          />
        ))}
        <input
          type="button"
          className="button w-[30%] self-end bg-red-600 hover:bg-red-800 disabled:bg-gray-500"
          disabled={
            (selectedPaymentMethod === "Credit Card" && !ccFormValid) ||
            selectedPaymentMethod === ""
          }
          value="Continue"
          onClick={handleSubmitMethodClick}
        />
      </form>
      <Modal open={paymentOpen} onClose={() => setPaymentOpen(false)}>
        <PaymentModal selcetedPaymentMethod={selectedPaymentMethod} />
      </Modal>
    </div>
  );
}

export default PaymentMethodModal;
