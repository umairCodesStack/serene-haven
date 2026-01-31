import styled from "styled-components";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

const CabinsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.6rem;
  }
`;

const HeaderRow = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 1.6rem !important;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: var(--border-radius-md);
  -webkit-overflow-scrolling: touch;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) var(--color-grey-100);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-400);
  }
`;

const FloatingAddButton = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
  }

  @media (max-width: 480px) {
    bottom: 1.6rem;
    right: 1.6rem;
  }
`;

function Cabins() {
  return (
    <CabinsContainer>
      <HeaderRow type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </HeaderRow>

      <TableWrapper>
        <CabinTable />
      </TableWrapper>

      <FloatingAddButton>
        <AddCabin />
      </FloatingAddButton>
    </CabinsContainer>
  );
}

export default Cabins;
