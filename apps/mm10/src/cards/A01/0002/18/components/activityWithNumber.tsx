import styled from 'styled-components';

const ActivityWithNumber = ({ number }: { number: number }) => {
  return (
    <Wrapper>
      <Text>활동</Text>
      <Number>{number}</Number>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 96px;
  height: 38px;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  border: 2px solid #124899;
  border-radius: 40px;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #124899;
`;

const Number = styled.p`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #124899;

  border-radius: 50%;

  font-weight: 800;
  font-size: 21px;
  line-height: 58px;
  color: var(--color-white);
`;

export default ActivityWithNumber;
