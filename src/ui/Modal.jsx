import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 1024px) {
    max-width: 95vw;
    padding: 2.8rem 3.2rem;
  }

  @media (max-width: 768px) {
    max-width: 96vw;
    max-height: 94vh;
    padding: 2.4rem 2rem;
    border-radius: var(--border-radius-md);
  }

  @media (max-width: 480px) {
    top: 0;
    left: 0;
    transform: none;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    padding: 2rem 1.6rem;
    padding-top: 5rem;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  overflow-y: auto;

  @media (max-width: 480px) {
    backdrop-filter: blur(2px);
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1.2rem;
    padding: 0.8rem;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);

    &:hover {
      background-color: var(--color-grey-100);
    }
  }

  @media (max-width: 480px) {
    top: 1.2rem;
    right: 1.2rem;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);

    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (name === openName) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [name, openName]);

  // Close on ESC key
  useEffect(() => {
    if (name !== openName) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [name, openName, close]);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close} aria-label="Close modal">
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
