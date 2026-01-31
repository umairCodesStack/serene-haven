import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 768px) {
        padding: 2rem 2.4rem;
      }

      @media (max-width: 480px) {
        padding: 1.6rem 1.6rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      max-width: 100%;

      @media (max-width: 900px) {
        width: 70rem;
      }

      @media (max-width: 768px) {
        width: 100%;
        padding: 2rem 1.6rem;
      }

      @media (max-width: 480px) {
        padding: 1.6rem 1.2rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem; /* Slightly larger on mobile for better readability */
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
