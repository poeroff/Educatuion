import styled from '@emotion/styled';

namespace StyleLoading {
  export const Wrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  `;

  export const LoadingAni = styled.div`
    display: flex;
    justify-content: center;
    padding: 25px 30px 20px 30px;
    gap: 10px;
  `;

  export const LoadingMessage = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
    font-size: 18px;
    color: #47494d;
  `;
}

export default StyleLoading;
