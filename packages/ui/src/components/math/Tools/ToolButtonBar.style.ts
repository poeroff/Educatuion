import styled from 'styled-components';

export namespace StyleToolButtonBar {
  export const ToolButtonBarContainer = styled.div`
    position: absolute;
    top: 490px;
    left: 20px;

    display: flex;
    gap: 5px;
    align-items: center;

    width: auto;
    height: 50px;
    padding: 5px;
    border-radius: 50px;
    background-color: #232426;
  `;

  export const Button = styled.button`
    font-family: SUIT;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;

    display: flex;
    gap: 4px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    box-sizing: border-box;

    &:hover {
      font-weight: 900;
    }
  `;

  export const DeleteButton = styled(Button)`
    display: flex;
    gap: 4px;
    width: 72px;
    background-color: #ff3b4b;
    color: white;
  `;
}

export default StyleToolButtonBar;
