import styled from '@emotion/styled';

const Container = styled.div<{ width: string; height: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const ToolBar = styled.div`
  display: grid;
  width: 100%;
  height: fit-content;
  justify-content: end;
`;

const DrawingArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DrawingImage = styled.img`
  position: absolute;
  z-index: 1;
  pointer-events: none;
`;

const BackgroundImage = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const Style = {
  Container,
  DrawingImage,
  BackgroundImage,
  ToolBar,
  DrawingArea,
};
export default Style;
