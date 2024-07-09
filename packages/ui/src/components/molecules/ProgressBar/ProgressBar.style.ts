import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  flex-shrink: 0;

  svg {
    z-index: 3;
    width: 36px;
    height: 36px;
    position: absolute;
  }
`;

const BarBackground = styled.div<{ timeCritical: boolean }>`
  border-radius: 16px;
  width: 100%;
  height: 20px;
  padding: 3px;
  display: flex;
  align-items: center;
  border: ${props => (props.timeCritical ? '1px solid var(--color-pink-300)' : '1px solid var(--color-grey-200)')};
  background: ${props => (props.timeCritical ? 'var(--color-pink-100)' : 'var(--color-grey-50)')};
`;

const Bar = styled.div<{ widthPercentage: number; timeCritical: boolean }>`
  border-radius: 16px;
  background: ${props => (props.timeCritical ? 'var(--color-pink-500)' : 'var(--color-blue-500)')};
  width: ${props => `${props.widthPercentage}%`};
  height: 14px;
  display: flex;
  justify-content: flex-end;
  padding: 3px;

  transition: width 1s ease;

  svg {
    z-index: 2;
    width: 8px;
    height: 8px;
  }
`;

const Style = {
  Container,
  BarBackground,
  Bar,
};
export default Style;
