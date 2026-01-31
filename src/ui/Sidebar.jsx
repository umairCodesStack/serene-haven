import styled from "styled-components";
import { HiOutlineXMark } from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 1024px) {
    padding: 2.4rem 1.6rem;
    gap: 2.4rem;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 28rem;
    z-index: 1000;
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${(props) => (props.$isOpen ? "var(--shadow-lg)" : "none")};
    padding: 2rem 1.6rem;
    overflow-y: auto;
  }

  @media (max-width: 480px) {
    width: 75%;
    max-width: 30rem;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -1.6rem;

  @media (min-width: 769px) {
    justify-content: center;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.8rem;
    color: var(--color-grey-600);
    transition: all 0.2s;
    border-radius: var(--border-radius-sm);

    &:hover {
      color: var(--color-grey-900);
      background-color: var(--color-grey-100);
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />

      <StyledSidebar $isOpen={isOpen}>
        <SidebarHeader>
          <Logo />
          <CloseButton onClick={onClose} aria-label="Close menu">
            <HiOutlineXMark />
          </CloseButton>
        </SidebarHeader>

        <MainNav onNavigate={onClose} />

        {/* Uncomment if you need the uploader */}
        {/* <Uploader /> */}
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
