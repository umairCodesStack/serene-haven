import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 20rem 1fr;
    gap: 1.6rem;
    padding: 1rem 0;

    &:has(button) {
      gap: 1rem;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 1.2rem 0;

    &:has(button) {
      flex-direction: column-reverse;
      gap: 1rem;

      button {
        width: 100%;
      }
    }
  }
`;

const Label = styled.label`
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 640px) {
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 640px) {
    font-size: 1.3rem;
    margin-top: 0.4rem;
    display: block;
    grid-column: 1;
  }
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
