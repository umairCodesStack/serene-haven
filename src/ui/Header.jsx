import styled from "styled-components";
import { HiOutlineBars3 } from "react-icons/hi2";
import Button from "./Button";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import Heading from "./Heading";
import Spinner from "./Spinner";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 1.2rem 3.2rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 1.6rem;
    gap: 1.2rem;
    grid-column: 1;
  }

  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    gap: 0.8rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.8rem;
  color: var(--color-grey-600);
  transition: all 0.2s;
  border-radius: var(--border-radius-sm);

  &:hover {
    color: var(--color-brand-600);
    background-color: var(--color-grey-100);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const WelcomeText = styled(Heading)`
  @media (max-width: 640px) {
    display: none;
  }
`;

const MobileWelcomeText = styled(Heading)`
  display: none;

  @media (max-width: 640px) {
    display: block;
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 15rem;
  }

  @media (max-width: 400px) {
    max-width: 10rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StyledButton = styled(Button)`
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 1.3rem;
  }
`;

function Header({ onMenuClick }) {
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { user, isLoading } = useUser();
  const fullName = user?.user_metadata?.fullName;

  function handleLogout() {
    logout();
  }

  if (isLoading) {
    return (
      <StyledHeader>
        <Spinner />
      </StyledHeader>
    );
  }

  return (
    <StyledHeader>
      <LeftSection>
        <MobileMenuButton onClick={onMenuClick} aria-label="Open menu">
          <HiOutlineBars3 />
        </MobileMenuButton>

        <UserInfo>
          <WelcomeText as="h3">Welcome Back, {fullName || "Guest"}</WelcomeText>
          <MobileWelcomeText as="h3">{fullName || "Guest"}</MobileWelcomeText>
        </UserInfo>
      </LeftSection>

      <RightSection>
        <StyledButton
          size="small"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </StyledButton>
      </RightSection>
    </StyledHeader>
  );
}

export default Header;
