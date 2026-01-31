import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  color: var(--color-grey-700);

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  @media (max-width: 640px) {
    width: 100%;
    font-size: 1.3rem;
    padding: 0.8rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.8rem 1rem;
  }
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
