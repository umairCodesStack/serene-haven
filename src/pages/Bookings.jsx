import styled from "styled-components";
import { HiPlus } from "react-icons/hi2";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import BookingForm from "../features/bookings/BookingForm";
import Modal from "../ui/Modal";

const BookingsContainer = styled.div`
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

  @media (max-width: 768px) {
    margin: 0 -1.6rem;
    padding: 0 1.6rem;
  }

  @media (max-width: 480px) {
    margin: 0 -1.2rem;
    padding: 0 1.2rem;
  }

  /* Hide scrollbar but keep functionality */
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) var(--color-grey-100);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 4px;
  }
`;

const FloatingButton = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;

    button {
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.5rem;
      padding: 1.4rem 2.4rem;

      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }

  @media (max-width: 480px) {
    bottom: 1.6rem;
    right: 1.6rem;

    button {
      width: 5.6rem;
      height: 5.6rem;
      border-radius: 50%;
      padding: 0;
      justify-content: center;

      span {
        display: none;
      }

      svg {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
`;

function Bookings() {
  return (
    <BookingsContainer>
      <HeaderRow type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </HeaderRow>

      <TableWrapper>
        <BookingTable />
      </TableWrapper>

      <Modal>
        <FloatingButton>
          <Modal.Open opens="booking-form">
            <Button variation="primary">
              <HiPlus />
              <span>Add New Booking</span>
            </Button>
          </Modal.Open>
        </FloatingButton>
        <Modal.Window name="booking-form">
          <BookingForm />
        </Modal.Window>
      </Modal>
    </BookingsContainer>
  );
}

export default Bookings;
