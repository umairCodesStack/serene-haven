import { useState } from "react";
import styled from "styled-components";
import { useSignup } from "./useSignup";

const StyledSignupForm = styled.form`
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

const SignupButton = styled.button`
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

const SuccessMessage = styled.span`
  display: block;
  color: var(--color-green-700);
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
  padding: 1.2rem;
  background-color: var(--color-green-100);
  border-radius: var(--border-radius-sm);
  text-align: center;
`;

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signup, isLoading: isSigningUp } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (fullName.trim().length < 3) {
      setError("Full name must be at least 3 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulate signup
    setIsLoading(true);

    // Add your signup logic here
    signup({ email, password, fullName });
    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Account created successfully!");

      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 1500);
  }

  return (
    <StyledSignupForm onSubmit={handleSubmit}>
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <FormGroup>
        <Label htmlFor="fullName">Full name</Label>
        <StyledInput
          type="text"
          id="fullName"
          autoComplete="name"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email address</Label>
        <StyledInput
          type="email"
          id="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password (min 8 characters)</Label>
        <StyledInput
          type="password"
          id="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <StyledInput
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SignupButton type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </SignupButton>
    </StyledSignupForm>
  );
}

export default SignupForm;
