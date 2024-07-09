import styled from '@emotion/styled';

export const EvaluationModalContainer = styled.div`
  position: absolute;
  width: 500px;
  height: 400px;
  background-color: white;
  border: 1px solid black;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 30px;
  padding-right: 0px;
  border-radius: 20px;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: red;
`;

export const Title = styled.div`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  padding-right: 10px;
`;

export const EvaluationResult = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: scroll;
`;

export const CloseButton = styled.button`
  position: absolute;
  height: 30px;
  right: 20px;
  top: 25px;
  bottom: 0;
  background-color: white;
  border: none;
  font-size: 16px;
`;
