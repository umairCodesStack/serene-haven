import { useState } from "react";
import styled from "styled-components";
import { useAvailableCabins } from "../cabins/useAvailableCabins";
import { createGuest } from "../../services/apiGuest";
import toast from "react-hot-toast";
import { useCreateBooking } from "./useCreateBooking";

const StyledBookingForm = styled.form`
  width: 100%;
  padding: 2.4rem 0;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3.2rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StepNumber = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.6rem;
  background-color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "var(--color-grey-300)"};
  color: ${(props) =>
    props.$active ? "var(--color-grey-0)" : "var(--color-grey-600)"};
  transition: all 0.3s;
`;

const StepLabel = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) =>
    props.$active ? "var(--color-grey-900)" : "var(--color-grey-500)"};
`;

const StepDivider = styled.div`
  width: 4rem;
  height: 2px;
  background-color: var(--color-grey-300);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
`;

const StyledInput = styled.input`
  padding: 1rem 1.4rem;
  font-size: 1.4rem;
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
`;

const StyledSelect = styled.select`
  padding: 1rem 1.4rem;
  font-size: 1.4rem;
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
`;

const StyledTextarea = styled.textarea`
  padding: 1rem 1.4rem;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  resize: vertical;
  min-height: 10rem;
  font-family: inherit;
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
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.4rem;
`;

const CheckboxInput = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 2.4rem;
  grid-column: 1 / -1;
`;

const Button = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: var(--border-radius-sm);
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &.primary {
    background-color: var(--color-brand-600);
    color: var(--color-grey-0);

    &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
    }
  }

  &.secondary {
    background-color: var(--color-grey-0);
    color: var(--color-grey-600);
    border: 1px solid var(--color-grey-300);

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
    }
  }

  &:disabled {
    background-color: var(--color-grey-400);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.span`
  color: var(--color-red-700);
  font-size: 1.2rem;
  margin-top: 0.4rem;
`;

function BookingForm({ onCloseModal }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [guestId, setGuestId] = useState(null);
  const [isCreatingGuest, setIsCreatingGuest] = useState(false);

  // Guest fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [nationality, setNationality] = useState("");
  const [countryFlag, setCountryFlag] = useState("");

  // Booking fields
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [cabinId, setCabinId] = useState("");
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [observations, setObservations] = useState("");

  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const { availableCabins, isLoading: isLoadingCabins } = useAvailableCabins(
    startDate,
    endDate,
  );
  const { createBooking, isLoading: isCreatingBooking } = useCreateBooking();

  // Calculate booking details
  const selectedCabin = availableCabins?.find(
    (cabin) => cabin.id === Number(cabinId),
  );

  const numNights =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const cabinPrice = selectedCabin ? selectedCabin.regularPrice * numNights : 0;
  const breakfastPrice = hasBreakfast ? 15 * numGuests * numNights : 0;
  const extrasPrice = breakfastPrice;
  const totalPrice = cabinPrice + extrasPrice;

  async function handleNextStep(e) {
    e.preventDefault();
    setError("");

    // Validate guest information
    if (!fullName || !email || !nationalID || !nationality) {
      setError("Please fill in all required guest fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Create guest
    setIsCreatingGuest(true);
    try {
      const data = await createGuest({
        fullName,
        email,
        nationalID,
        nationality,
        countryFlag: countryFlag || "",
      });

      // Save guest ID for booking creation
      setGuestId(data[0].id);

      // Show success message
      toast.success("Guest created successfully!");

      // Move to next step
      setCurrentStep(2);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create guest");
      toast.error("Failed to create guest");
    } finally {
      setIsCreatingGuest(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate booking information
    if (!startDate || !endDate || !cabinId) {
      setError("Please fill in all required booking fields");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError("Check-out date must be after check-in date");
      return;
    }

    if (numGuests < 1) {
      setError("Number of guests must be at least 1");
      return;
    }

    if (selectedCabin && numGuests > selectedCabin.maxCapacity) {
      setError(
        `This cabin can accommodate maximum ${selectedCabin.maxCapacity} guests`,
      );
      return;
    }

    const bookingData = {
      startDate,
      endDate,
      numNights,
      numGuests: Number(numGuests),
      cabinId: Number(cabinId),
      guestId,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status: "unconfirmed",
      hasBreakfast,
      isPaid,
      observations: observations || "",
    };

    // Create booking using the hook
    createBooking(bookingData, {
      onSuccess: () => {
        // Close form AND reset on success
        onCloseModal?.();
        // Reset all form fields
        setCurrentStep(1);
        setGuestId(null);
        setFullName("");
        setEmail("");
        setNationalID("");
        setNationality("");
        setCountryFlag("");
        setStartDate("");
        setEndDate("");
        setNumGuests(1);
        setCabinId("");
        setHasBreakfast(false);
        setIsPaid(false);
        setObservations("");
        setError("");
      },
    });
  }

  function handleBack() {
    setCurrentStep(1);
    setError("");
  }

  function handleCancel() {
    onCloseModal?.();
  }

  const isLoading = isCreatingGuest || isCreatingBooking || isLoadingCabins;

  return (
    <>
      <StepIndicator>
        <Step>
          <StepNumber $active={currentStep === 1}>1</StepNumber>
          <StepLabel $active={currentStep === 1}>Guest Info</StepLabel>
        </Step>
        <StepDivider />
        <Step>
          <StepNumber $active={currentStep === 2}>2</StepNumber>
          <StepLabel $active={currentStep === 2}>Booking Details</StepLabel>
        </Step>
      </StepIndicator>

      {/* STEP 1: Guest Information */}
      {currentStep === 1 && (
        <StyledBookingForm onSubmit={handleNextStep}>
          <FormGrid>
            <FormGroup className="full-width">
              <Label htmlFor="fullName">
                Full Name{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledInput
                type="text"
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isCreatingGuest}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                Email Address{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledInput
                type="email"
                id="email"
                placeholder="guest@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isCreatingGuest}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nationalID">
                National ID{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledInput
                type="text"
                id="nationalID"
                placeholder="12345678"
                value={nationalID}
                onChange={(e) => setNationalID(e.target.value)}
                disabled={isCreatingGuest}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nationality">
                Nationality{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledInput
                type="text"
                id="nationality"
                placeholder="United States"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                disabled={isCreatingGuest}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="countryFlag">Country Flag (emoji or URL)</Label>
              <StyledInput
                type="text"
                id="countryFlag"
                placeholder="🇺🇸"
                value={countryFlag}
                onChange={(e) => setCountryFlag(e.target.value)}
                disabled={isCreatingGuest}
              />
            </FormGroup>

            {error && (
              <FormGroup className="full-width">
                <ErrorMessage>{error}</ErrorMessage>
              </FormGroup>
            )}

            <ButtonGroup>
              <Button
                type="button"
                className="secondary"
                onClick={handleCancel}
                disabled={isCreatingGuest}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="primary"
                disabled={isCreatingGuest}
              >
                {isCreatingGuest
                  ? "Creating guest..."
                  : "Next: Booking Details"}
              </Button>
            </ButtonGroup>
          </FormGrid>
        </StyledBookingForm>
      )}

      {/* STEP 2: Booking Details */}
      {currentStep === 2 && (
        <StyledBookingForm onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="startDate">
                Check-in Date{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledInput
                type="date"
                id="startDate"
                min={today}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={isCreatingBooking}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="endDate">
                Check-out Date{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledInput
                type="date"
                id="endDate"
                min={startDate || today}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isCreatingBooking}
              />
            </FormGroup>

            <FormGroup className="full-width">
              <Label htmlFor="cabinId">
                Select Cabin{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledSelect
                id="cabinId"
                value={cabinId}
                onChange={(e) => setCabinId(e.target.value)}
                disabled={isLoadingCabins || isCreatingBooking}
              >
                <option value="">
                  {isLoadingCabins
                    ? "Loading cabins..."
                    : startDate && endDate
                      ? "Choose an available cabin..."
                      : "Select dates first..."}
                </option>
                {availableCabins?.map((cabin) => (
                  <option key={cabin.id} value={cabin.id}>
                    {cabin.name} - Max {cabin.maxCapacity} guests - $
                    {cabin.regularPrice}/night
                  </option>
                ))}
              </StyledSelect>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="numGuests">
                Number of Guests{" "}
                <span style={{ color: "var(--color-red-700)" }}>*</span>
              </Label>
              <StyledInput
                type="number"
                id="numGuests"
                min="1"
                max={selectedCabin?.maxCapacity || 10}
                value={numGuests}
                onChange={(e) => setNumGuests(e.target.value)}
                disabled={isCreatingBooking}
              />
            </FormGroup>

            <FormGroup>
              <CheckboxGroup>
                <CheckboxInput
                  type="checkbox"
                  id="hasBreakfast"
                  checked={hasBreakfast}
                  onChange={(e) => setHasBreakfast(e.target.checked)}
                  disabled={isCreatingBooking}
                />
                <CheckboxLabel htmlFor="hasBreakfast">
                  Include breakfast ($15/person/night)
                </CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>

            <FormGroup>
              <CheckboxGroup>
                <CheckboxInput
                  type="checkbox"
                  id="isPaid"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  disabled={isCreatingBooking}
                />
                <CheckboxLabel htmlFor="isPaid">Payment received</CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>

            <FormGroup className="full-width">
              <Label htmlFor="observations">
                Observations / Special Requests
              </Label>
              <StyledTextarea
                id="observations"
                placeholder="Any special requests or observations..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                disabled={isCreatingBooking}
              />
            </FormGroup>

            {/* Price Summary */}
            {selectedCabin && numNights > 0 && (
              <FormGroup className="full-width">
                <div
                  style={{
                    padding: "1.6rem",
                    backgroundColor: "var(--color-brand-100)",
                    borderRadius: "var(--border-radius-sm)",
                    border: "1px solid var(--color-brand-200)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.8rem",
                      fontSize: "1.4rem",
                    }}
                  >
                    <span>
                      Cabin ({numNights} night{numNights !== 1 ? "s" : ""})
                    </span>
                    <span>${cabinPrice.toFixed(2)}</span>
                  </div>
                  {hasBreakfast && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.8rem",
                        fontSize: "1.4rem",
                      }}
                    >
                      <span>
                        Breakfast ({numGuests} guest{numGuests !== 1 ? "s" : ""}{" "}
                        × {numNights} night{numNights !== 1 ? "s" : ""})
                      </span>
                      <span>${breakfastPrice.toFixed(2)}</span>
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "0.8rem",
                      borderTop: "2px solid var(--color-brand-300)",
                      fontWeight: 600,
                      fontSize: "1.6rem",
                    }}
                  >
                    <span>Total Price</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </FormGroup>
            )}

            {error && (
              <FormGroup className="full-width">
                <ErrorMessage>{error}</ErrorMessage>
              </FormGroup>
            )}

            <ButtonGroup>
              <Button
                type="button"
                className="secondary"
                onClick={handleBack}
                disabled={isCreatingBooking}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="primary"
                disabled={isCreatingBooking}
              >
                {isCreatingBooking ? "Creating booking..." : "Create Booking"}
              </Button>
            </ButtonGroup>
          </FormGrid>
        </StyledBookingForm>
      )}
    </>
  );
}

export default BookingForm;
