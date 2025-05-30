import RegisterForm from "../components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import {useAuth} from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const {data, isLoading, isError} = useAuth();
  console.log('Auth data:', data);
  

  return (
    <div>
      {!isLoading && !isError && data ? (
        <div>
          <h1>Welcome, {data.username}!</h1>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <div>
          <h1>Please log in or register</h1>
        </div>
      )
      }
      <RegisterForm />
    </div>
  );
}

export default AuthPage;