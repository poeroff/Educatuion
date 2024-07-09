import styled from 'styled-components';
import ToolButtonStyle from '../ToolButtonBar.style';

export interface ICompassStyle {}

namespace StyleCompass {
  export const CanvasContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  `;

  export const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
  `;

  export const ClearButton = styled(ToolButtonStyle.Button)`
    border: 1px solid black;
    width: 80px;
    background-color: white;
  `;

  export const SelectButton = styled(ToolButtonStyle.Button)`
    width: 104px;
    color: white;
    border: 1px solid #b0b6c0;
  `;
}

export default StyleCompass;
