import styled from 'styled-components';

export namespace StyleTime {
  export const StopWatchContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: end;
    width: fit-content;
    gap: 4px;
  `;

  export const CloseButton = styled.button`
    width: 68px;
    height: 32px;
    border-radius: 100px;
    padding: 4px 20px;
    background-color: var(--color-grey-50);
    font-family: 'SUIT';
    font-weight: var(--font-weight-bold);
    font-size: 16px;
    line-height: 24px;
    color: var(--color-grey-700);
  `;

  export const TimeModal = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 44px;
    gap: 8px;
    height: 160px;
    width: 260px;
    border-radius: 8px;
    background-color: var(--color-white);
    box-shadow: 0px 0px 16px 0px #0000001f;
  `;

  export const ToggleContainer = styled.button`
    display: inline-block;
    position: absolute;
    cursor: pointer;
    top: 4px;
    left: 4px;
  `;

  export const ToggleWrapper = styled.div`
    position: relative;
    width: 82px;
    height: 20px;
    border-radius: 5px;
    background-color: #e0e2e6;
    transition: all 0.2s ease;
  `;

  export const ToggleText = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 6px;
    gap: 8px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    span {
      font-size: 10px;
      font-family: SUIT;
      font-weight: 600;
      color: #6a6d73;
      &.selected {
        color: black;
      }
    }
  `;

  export const ToggleCircleWrapper = styled.div`
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    left: 2px;
    width: 43px;
    height: 16px;
    border-radius: 4px;

    background-color: white;
    transition: all 0.25s ease;
    &.timer {
      width: 35px;
      left: 45px;
    }
  `;
}

export default StyleTime;
