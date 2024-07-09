import styled from '@emotion/styled';
import ArrowIcon from '@maidt-cntn/assets/icons/footer_next_arrow.svg';
import { SvgIcon } from '@maidt-cntn/ui';

export const FooterBtn = () => {
  const footerBtnType = 'next';
  // const handleTextButton = (type: AnswerButtonTypes) => {
  //   if (type === 'next') return '다음 문제';
  //   if (type === 'submit') return '제출하기';
  //   return '정답 확인';
  // };

  return (
    <FooterBtnContainer active>
      {/* <span>{handleTextButton('submit')}</span> */}
      <span>제출하기</span>
      {footerBtnType === 'next' && <SvgIcon src={ArrowIcon} width='20px' height='20px' />}
      {/* {footerBtnType === "next" && <ArrowIcon />} */}
    </FooterBtnContainer>
  );
};
export default FooterBtn;

const FooterBtnContainer = styled.div<{ active: boolean }>`
  position: absolute;
  right: 40px;
  background-color: ${({ active }) => (active ? 'var(--color-grey-900)' : 'var(--color-white)')};
  box-sizing: border-box;
  border: ${({ active }) => (active ? 'none' : '1px solid var(--color-grey-300)')};

  width: 152px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 24px;

  span {
    font-family: var(--font-SUIT);
    font-size: var(--font-size-16);
    line-height: 24px;
    color: ${({ active }) => (active ? 'var(--color-white)' : 'var(--color-grey-500)')};
    font-weight: var(--font-weight-bold);
  }

  svg path {
    stroke: ${({ active }) => (active ? 'var(--color-white)' : 'var(--color-grey-500)')};
    fill: ${({ active }) => (active ? 'var(--color-white)' : 'var(--color-grey-500)')};
  }
`;
