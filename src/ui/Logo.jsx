import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const LogoIcon = styled.svg`
  width: 6rem;
  height: 6rem;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin: 0;
  letter-spacing: -0.5px;
`;

const LogoSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-grey-500);
  letter-spacing: 2px;
  margin: 0;
  font-style: italic;
`;

function Logo() {
  return (
    <StyledLogo>
      <LogoContainer>
        <LogoIcon
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle border */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
          />

          {/* Roof */}
          <path
            d="M 25 50 L 50 25 L 75 50"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* House body */}
          <rect
            x="35"
            y="50"
            width="30"
            height="22"
            fill="#3b82f6"
            opacity="0.2"
            rx="2"
          />

          {/* Door */}
          <rect x="44" y="58" width="12" height="14" fill="#3b82f6" rx="1" />

          {/* Windows */}
          <circle cx="40" cy="60" r="2.5" fill="#f59e0b" />
          <circle cx="60" cy="60" r="2.5" fill="#f59e0b" />
        </LogoIcon>

        <LogoText>
          <LogoTitle>Serene Haven</LogoTitle>
          <LogoSubtitle>Your Peaceful Retreat</LogoSubtitle>
        </LogoText>
      </LogoContainer>
    </StyledLogo>
  );
}

export default Logo;
