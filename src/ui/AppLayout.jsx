import { Outlet } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 1024px) {
    grid-template-columns: 20rem 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    padding: 3rem 3.2rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.6rem 3rem;
    grid-column: 1;
  }

  @media (max-width: 480px) {
    padding: 1.6rem 1.2rem 2.4rem;
  }

  /* Smooth scrolling */
  scroll-behavior: smooth;

  /* Hide scrollbar for cleaner look (optional) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-400);
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    gap: 2.4rem;
  }

  @media (max-width: 480px) {
    gap: 1.6rem;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <StyledAppLayout>
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
