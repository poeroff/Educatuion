import { useState } from 'react';
import styled from '@emotion/styled';

import { Box, ConnectLine, EStyleFontSizes, IQuestionProps, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const direction = 'horizontal';

const EM03501 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [clickedButtons, setClickedButtons] = useState<number[]>([]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    size: 'large',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <Box vAlign='center'>
          <Label type='icon' size='small' value={1} marginRight={8} />
          에서 알게 된 점을 살펴보세요.
        </Box>
      </>
    ),
  };

  const handleClick = (index: number) => {
    setClickedButtons(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box vAlign='flex-start'>
        <Box height={'60px'} display='flex' alignItems='center'>
          <Label value='ㄴ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={20} />
        </Box>
        <Typography useGap={false} size={EStyleFontSizes.LARGE}>
          ‘하루’, ‘먹는 시간 간격’, ‘먹을 수 있는 횟수’는 나눗셈식에서 각각 무엇을 나타내는지 이어 보세요.
        </Typography>
      </Box>
      <Box useFull marginTop='24px'>
        <ConnectLine direction={direction} useFull useItemFull>
          <ConnectLineSide sideId='left'>
            <ConnectLineItem content={<>하루</>} itemId='A' />
            <ConnectLineItem content={<>먹는 시간 간격</>} itemId='B' />
            <ConnectLineItem content={<>먹을 수 있는 횟수</>} itemId='C' />
          </ConnectLineSide>
          <ConnectLineSide sideId='right' bgColor='var(--color-grey-50)'>
            <ConnectLineItem content={<>나누는 수</>} itemId='1' />
            <ConnectLineItem content={<>나누어지는 수</>} itemId='2' />
            <ConnectLineItem content={<>몫</>} itemId='3' />
          </ConnectLineSide>
        </ConnectLine>
      </Box>
    </Container>
  );
};

const ConnectLineSide = styled(ConnectLine.Side)``;

const ConnectLineItem = styled(ConnectLine.Item)``;

export default EM03501;
