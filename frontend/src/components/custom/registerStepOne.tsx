import React from "react";

interface RegisterStepOneProps {
  onNext: () => void;
}

const RegisterStepOne: React.FC<RegisterStepOneProps> = ({ onNext }) => {
  return (
    <div>
      <h2>Register - Step One</h2>
      <input type="text" placeholder="First Field" />
      <input type="text" placeholder="Second Field" />
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default RegisterStepOne;
