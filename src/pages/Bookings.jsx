import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import { useState } from "react";
import BookingForm from "../features/bookings/BookingForm";

function Bookings() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
      <Row>
        <Button
          variation="primary"
          role="button"
          onClick={() => setShowForm((showForm) => !showForm)}
        >
          Add New Booking
        </Button>
        {showForm && <BookingForm setShowForm={setShowForm} />}
      </Row>
    </>
  );
}

export default Bookings;
