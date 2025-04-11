import React from "react";

interface RegisterStepTwoProps {
  onBack: () => void;
}

const RegisterStepTwo: React.FC<RegisterStepTwoProps> = ({ onBack }) => {
  return (
    <div>
      <h2>Register - Step Two</h2>
      <input type="text" placeholder="Third Field" />
      <input type="text" placeholder="Fourth Field" />
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default RegisterStepTwo;
