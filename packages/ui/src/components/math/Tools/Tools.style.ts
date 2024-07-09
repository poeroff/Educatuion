import styled from 'styled-components';

export namespace StyleTools {
  export const ToolsContainer = styled.section`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
  `;

  export const ToolsWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
  `;

  export const ButtonWrapper = styled.div`
    display: flex;
    gap: 5px;
    position: absolute;
    top: 607px;
    left: 0;
  `;
}

export default StyleTools;
