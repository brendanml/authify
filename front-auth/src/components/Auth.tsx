type AuthFormType = 'login' | 'register';

interface AuthFormChangerProps {
  formType: AuthFormType;
  setFormType: (type: AuthFormType) => void;
}

import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

import { useState } from "react";

const AuthFormChanger = ({ formType, setFormType }: AuthFormChangerProps) => {
  return (
    <div className="text-center text-sm mt-4">
    {
      formType === 'login' ? (
        <div>
          Don't have an account?
        <a className="ml-2" onClick={() => setFormType('register')}>Sign up</a>
        </div>
      ) : (
        <div>
          Already have an account?
        <a className="ml-2" onClick={() => setFormType('login')}>Log in</a>
        </div>
      )
    }
    </div>
  );
}


const Auth = () => {
  const [formType, setFormType] = useState<AuthFormType>('login');
  return (
<div className="space-y-8 shadow-md p-6 w-full max-w-md mx-auto rounded-lg bg-[var(--color-secondary-background)]">
    {
      formType === 'login' ? 
      
      <LoginForm /> : <RegisterForm />
    }
    <AuthFormChanger formType={formType} setFormType={setFormType} />
</div>
  )
}

export default Auth;
