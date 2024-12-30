import styled from 'styled-components';

const Card = ({ title, bgColor, textColor, children }) => {
  return (
    <CardContainer $bgColor={bgColor}>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-md);
  background-color: ${(props) => props.$bgColor || 'var(--color-grey-0)'};
  color: ${(props) => props.$textColor || 'var(--color-grey-100)'};
  box-shadow: var(--shadow-lg);
  padding: 2rem;
  box-sizing: border-box;
  width: 100%;
  margin: 2rem;
`;

const CardTitle = styled.h1`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
