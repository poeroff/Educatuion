import styled from '@emotion/styled';
import { useState } from 'react';

import { Box, ConnectLine, Dialog, EStyleButtonTypes, Typography } from '@maidt-cntn/ui';
import { DialogContainer, HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

// HM-009-04 에서 [맞춤카드] -> 오답일 경우에 나오는 모달 템플릿입니다.
// 카드 번호 : C-HM1-010202-E-08-01
// SB : 34번 슬라이드 참고
// > https://docs.google.com/presentation/d/1f86TdcsyW2zi058ilT-HqpiUWUpDWiZqR8ijgHNS_BE/edit#slide=id.g2e534fa46ca_1_21298

const HMM03701 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBenefit',
  };

  return (
    <HContainer
      headerInfo={null}
      useLinkLabel
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
      submitBtnColor={EStyleButtonTypes.SECONDARY}
      onSubmit={() => {}}
      vAlign='flex-start'
    >
      <Typography>맞춤 카드 모달 템플릿 (맞춤 학습하기 버튼을 눌러 보세요.)</Typography>
      <Dialog
        isShow={isShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setShow(false);
        }}
        onConfirm={() => {
          setShow(false);
        }}
      >
        <DialogContainer
          headerInfo={headerInfo}
          submitLabel='채점하기'
          submitBtnColor={EStyleButtonTypes.YELLOW}
          submitDisabled={false}
          onSubmit={() => {}}
          bodyId={`targetContainer`}
        >
          <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)' lineHeight='48px'>
            <Box display='inline-flex'>
              <Box width='6px' height='28px' background='var(--color-h-math-primary-normal)' borderRadius='3px' margin='8px 8px 8px 0' />
              <Typography
                useGap={false}
                fontSize='var(--font-size-30)'
                lineHeight='48px'
                weight={'var(--font-weight-bold)'}
                color='var(--color-h-math-primary-normal)'
              >
                문제4 &nbsp;
              </Typography>
            </Box>
            다음 다항식과 그 인수를 선으로 연결하시오
          </Typography>
          <Box width={660} margin='24px auto 0 auto'>
            <ConnectLineContainer direction='vertical'>
              <ConnectLineSide sideId='left'>
                <ConnectLineItem content={<MathExpression equation={`\\(x^3 - 4x^2 + 3x + 2\\)`} />} itemId='A' ariaLabel='x^3 - 4x^2 + 3x + 2' />
                <ConnectLineItem content={<MathExpression equation={`\\(2x^3 - x^2 + x + 4\\)`} />} itemId='B' ariaLabel='2x^3 - x^2 + x + 4' />
              </ConnectLineSide>
              <ConnectLineSide sideId='right'>
                <ConnectLineItem content={<MathExpression equation={`\\(x + 1\\)`} />} itemId='1' ariaLabel='x + 1' />
                <ConnectLineItem content={<MathExpression equation={`\\(x + 1\\)`} />} itemId='2' ariaLabel='x + 1' />
              </ConnectLineSide>
            </ConnectLineContainer>
          </Box>
        </DialogContainer>
      </Dialog>
    </HContainer>
  );
};

const ConnectLineContainer = styled(ConnectLine)``;

const ConnectLineSide = styled(ConnectLine.Side)``;

const ConnectLineItem = styled(ConnectLine.Item)`
  button {
    height: 50px;
    padding: 4px 12px;
    text-align: left;
  }
  > div {
    background-color: var(--color-grey-600);
  }
`;

export default HMM03701;
