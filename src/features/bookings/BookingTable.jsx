import styled from "styled-components";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

const TableContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

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

  @media (max-width: 768px) {
    /* Show scroll hint on mobile */
    &::after {
      content: "← Scroll →";
      position: sticky;
      right: 1rem;
      float: right;
      margin-top: -4rem;
      font-size: 1.2rem;
      color: var(--color-grey-400);
      background-color: rgba(255, 255, 255, 0.9);
      padding: 0.4rem 0.8rem;
      border-radius: var(--border-radius-sm);
      pointer-events: none;
      opacity: 0.8;
      z-index: 10;
      box-shadow: var(--shadow-sm);
    }
  }
`;

const TableWrapper = styled.div`
  @media (max-width: 768px) {
    min-width: 900px; /* Force horizontal scroll */
  }

  @media (max-width: 480px) {
    min-width: 800px; /* Slightly smaller on very small screens */
  }
`;

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <TableContainer>
        <TableWrapper>
          <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
            <Table.Header>
              <div>Cabin</div>
              <div>Guest</div>
              <div>Dates</div>
              <div>Status</div>
              <div>Amount</div>
              <div></div>
            </Table.Header>

            <Table.Body
              data={bookings}
              render={(booking) => (
                <BookingRow key={booking.id} booking={booking} />
              )}
            />

            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          </Table>
        </TableWrapper>
      </TableContainer>
    </Menus>
  );
}

export default BookingTable;
