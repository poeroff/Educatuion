import styled from '@emotion/styled';
import backgroundImg from '../../../assets/images/receipt.jpg';
import backgroundImg2 from '../../../assets/images/receipt2.jpg';
import Typography from '../../../components/atoms/Typography/Typography';

namespace StyleReceipt {
  export const BackgroundWrap = styled.div<{ isNoLine?: boolean }>`
    min-height: 390px;
    width: 920px;
    margin-top: 10px;

    ${({ isNoLine }) =>
      isNoLine
        ? `
      background: url('${backgroundImg2}') center center no-repeat;
      `
        : `
    background: url('${backgroundImg}') center center no-repeat;
    `}

    background-size: 100%;
  `;

  export const Content = styled.div`
    padding-left: 20px;
  `;

  export const TextWrap = styled.div`
    display: flex;
  `;

  export const ContentText = styled(Typography)`
    font-size: 24px !important;
  `;
}

export default StyleReceipt;
