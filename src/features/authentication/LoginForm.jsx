import { useState } from "react";
import styled from "styled-components";
import loginApi from "../../services/apiAuth";
import { useLogin } from "./useLogin";

const StyledLoginForm = styled.form`
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
  padding: 3.2rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 2.4rem;

  &:last-of-type {
    margin-bottom: 3.2rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1.4rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-0);
  background-color: var(--color-brand-600);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-700);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: var(--color-grey-400);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  color: var(--color-red-700);
  font-size: 1.4rem;
  margin-top: 0.6rem;
`;

function LoginForm() {
  const [email, setEmail] = useState("admin@serene-haven.com");
  const [password, setPassword] = useState("Umair@5297");
  //const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    // Reset error
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    login({ email, password });

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate login
    //setIsLoading(isLoading);

    // Add your login logic here
    setTimeout(() => {
      //setIsLoading(false);
    }, 1000);
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email address</Label>
        <StyledInput
          type="email"
          id="email"
          autoComplete="username"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <StyledInput
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <LoginButton type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </LoginButton>
    </StyledLoginForm>
  );
}

export default LoginForm;
