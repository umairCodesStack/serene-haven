import styled from "styled-components";
import Button from "./Button";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import Heading from "./Heading";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function Header() {
  const { logout } = useLogout();
  const { user, isLoading } = useUser();
  const fullName = user?.user_metadata?.fullName;

  function handleLogout() {
    logout();
  }

  return (
    <StyledHeader>
      <UserInfo>
        <Heading as="h3">Welcome Back {fullName}</Heading>
      </UserInfo>
      <Button size="small" onClick={handleLogout}>
        Logout
      </Button>
    </StyledHeader>
  );
}

export default Header;
