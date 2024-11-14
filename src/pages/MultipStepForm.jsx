import React, { useState } from "react";
import StepOne from "../Components/MultiStepForm/StepOne";
import StepTwo from "./StepTwo";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState({
    company_name: "",
    company_avatar: "",
    company_description: "",
    remote: "",
    company_location: "",
    company_type: "",
    industry_type: "",
    business_nature: "",
  });

  // Function to go to the next step
  const nextStep = () => setStep(step + 1);

  return (
    <div className="multi-step-form">
      {/* <StepTwo /> */}
      {step === 1 && (
        <StepOne
          companyData={companyData}
          setCompanyData={setCompanyData}
          onSuccess={nextStep} // Function to move to next step
        />
      )}
      {step === 2 && <StepTwo />}
    </div>
  );
};

export default MultiStepForm;
