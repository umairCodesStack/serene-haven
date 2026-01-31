import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 0.6rem;
    padding: 0.6rem;
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  cursor: pointer;
  white-space: nowrap;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:disabled {
    cursor: default;
  }

  @media (max-width: 640px) {
    flex: 1;
    font-size: 1.3rem;
    padding: 0.6rem 1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.8rem 0.6rem;
    min-width: calc(50% - 0.3rem);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
