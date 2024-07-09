import styled from '@emotion/styled';

const SmallTimerContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 1000;
  border: 1px solid var(--color-grey-200);
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  justify-content: space-between;
  padding: 0 16px;
  border-radius: 25px;
  background-color: #ffffff;
  width: 119px;
  height: 28px;
  position: relative;
`;

const Text = styled.p`
  color: var(--color-grey-700);
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  line-height: 20px;
`;
const Times = styled.p`
  color: var(--color-grey-900);
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  line-height: 20px;
`;

const Style = {
  SmallTimerContainer,
  Text,
  Times,
};

export default Style;
