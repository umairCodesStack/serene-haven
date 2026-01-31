import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import CabinTable from "../features/cabins/CabinTable";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 52rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  padding: 2rem;

  @media (max-width: 56rem) {
    grid-template-columns: 1fr;
    max-width: 52rem;
    padding: 2rem 1.6rem;
  }
`;

const FormContainer = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4.8rem 4rem;
  box-shadow: var(--shadow-md);

  @media (max-width: 56rem) {
    padding: 3.2rem 2.4rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HeadingContainer = styled.div`
  text-align: center;
`;

function Login() {
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormContainer>
        <HeadingContainer>
          <Heading as="h1">Log in to your account</Heading>
        </HeadingContainer>
        <LoginForm />
        <Button
          size="medium"
          type=""
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create New Account
        </Button>
      </FormContainer>
    </LoginLayout>
  );
}

export default Login;
