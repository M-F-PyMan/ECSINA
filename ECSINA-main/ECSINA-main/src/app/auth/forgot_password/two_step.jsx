"use client";

import CodeVerificationForm from "@/components/auth/otpform";

const TwoStepPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CodeVerificationForm phoneNumber="09331234567" onBack={() => window.history.back()} />
    </div>
  );
};

export default TwoStepPage;
