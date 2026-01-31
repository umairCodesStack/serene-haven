import styled from "styled-components";
import {
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  margin-bottom: 4rem;
`;

const WelcomeText = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
`;

const SubText = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-500);
`;

const HeroSection = styled.div`
  background: linear-gradient(
    135deg,
    var(--color-brand-600) 0%,
    var(--color-brand-700) 100%
  );
  border-radius: var(--border-radius-lg);
  padding: 6.4rem 4.8rem;
  text-align: center;
  color: var(--color-grey-0);
  margin-bottom: 4rem;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -10%;
    width: 40rem;
    height: 40rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 30rem;
    height: 30rem;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h2`
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 1.6rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.5px;
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  opacity: 0.95;
  font-weight: 400;
  max-width: 60rem;
  margin: 0 auto;
  line-height: 1.6;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 3.2rem;
  margin-bottom: 4rem;
`;

const InfoCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  padding: 3.2rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
  }
`;

const IconWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$bgColor};
  margin: 0 auto 2rem;

  svg {
    width: 4rem;
    height: 4rem;
    color: ${(props) => props.$iconColor};
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
`;

const InfoDescription = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  line-height: 1.6;
`;

const FeatureSection = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  padding: 4rem;
  box-shadow: var(--shadow-sm);
`;

const FeatureTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 2.4rem;
  text-align: center;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2.4rem;
`;

const FeatureItem = styled.div`
  padding: 2.4rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-brand-50);
  }
`;

const FeatureItemTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
`;

const FeatureItemText = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  line-height: 1.5;
`;

function DashboardLayout() {
  const navigate = useNavigate();
  return (
    <Container>
      <WelcomeSection>
        <WelcomeText>Welcome to The Serene Haven 👋</WelcomeText>
        <SubText>Your luxury hotel management system</SubText>
      </WelcomeSection>

      <HeroSection>
        <HeroContent>
          <HeroTitle>The Serene Haven</HeroTitle>
          <HeroSubtitle>
            Experience seamless hotel management with our comprehensive
            dashboard
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <InfoGrid>
        <InfoCard
          role="button"
          onClick={() => {
            navigate("/bookings");
          }}
        >
          <IconWrapper $bgColor="#dbeafe" $iconColor="#3b82f6">
            <HiOutlineCalendar />
          </IconWrapper>
          <InfoTitle>Manage Bookings</InfoTitle>
          <InfoDescription>
            Handle reservations, check-ins, and check-outs with ease
          </InfoDescription>
        </InfoCard>

        <InfoCard
          role="button"
          onClick={() => {
            navigate("/cabins");
          }}
        >
          <IconWrapper $bgColor="#dcfce7" $iconColor="#22c55e">
            <HiOutlineHome />
          </IconWrapper>
          <InfoTitle>Track Cabins</InfoTitle>
          <InfoDescription>
            Monitor cabin availability and maintenance status
          </InfoDescription>
        </InfoCard>

        <InfoCard role="button" onClick={() => navigate("/users")}>
          <IconWrapper $bgColor="#fef3c7" $iconColor="#f59e0b">
            <HiOutlineUserGroup />
          </IconWrapper>
          <InfoTitle>User Management</InfoTitle>
          <InfoDescription>
            Add and manage staff accounts and permissions
          </InfoDescription>
        </InfoCard>
        <InfoCard role="button" onClick={() => navigate("/settings")}>
          <IconWrapper $bgColor="#f3e8ff" $iconColor="#a855f7">
            <HiOutlineCog6Tooth />
          </IconWrapper>
          <InfoTitle>System Settings</InfoTitle>
          <InfoDescription>
            Configure hotel preferences and system options
          </InfoDescription>
        </InfoCard>
      </InfoGrid>

      <FeatureSection>
        <FeatureTitle>What You Can Do</FeatureTitle>
        <FeatureGrid>
          <FeatureItem>
            <FeatureItemTitle>📅 Reservations</FeatureItemTitle>
            <FeatureItemText>Create and manage guest bookings</FeatureItemText>
          </FeatureItem>

          <FeatureItem>
            <FeatureItemTitle>🏡 Cabin Management</FeatureItemTitle>
            <FeatureItemText>
              Add, edit, and organize your cabins
            </FeatureItemText>
          </FeatureItem>

          <FeatureItem>
            <FeatureItemTitle>👥 Guest Services</FeatureItemTitle>
            <FeatureItemText>
              Maintain guest profiles and preferences
            </FeatureItemText>
          </FeatureItem>

          <FeatureItem>
            <FeatureItemTitle>⚙️ Settings</FeatureItemTitle>
            <FeatureItemText>Customize your hotel preferences</FeatureItemText>
          </FeatureItem>
        </FeatureGrid>
      </FeatureSection>
    </Container>
  );
}

export default DashboardLayout;
