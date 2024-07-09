import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 0;
  border-radius: 5px;
  top: 0;
  transform: translate(25%, -30%);

  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 0 0 6px #b2b2b2;
  &::before {
    border-radius: 5px;

    background-color: white;
    display: block;
    height: 16px;
    position: absolute;
    content: '';
    transform: rotate(29deg) skew(-35deg);
    -moz-transform: rotate(29deg) skew(-35deg);
    -ms-transform: rotate(29deg) skew(-35deg);
    -o-transform: rotate(29deg) skew(-35deg);
    -webkit-transform: rotate(29deg) skew(-35deg);
    width: 20px;
    box-shadow: 0 0 6px #b2b2b2;

    left: -5px;
  }

  &::after {
    background-color: white;
    display: block;
    height: 16px;
    position: absolute;
    content: '';
    width: 25px;
    height: 30px;

    left: 0px;
  }
`;

export const Contents = styled.div`
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
