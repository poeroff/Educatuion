import { useState } from 'react';
import { Image, Box, TMainHeaderInfoTypes, Label, IAudioPlayerProps, OverlayTooltip, Input, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import boy from '../../assets/example/EM-032-01/boy.png';
import girl from '../../assets/example/EM-032-01/girl.png';

const EM03201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈의 몫을 곱셈구구로 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        그림을 보고 21÷7의 몫을 구해 보세요.
      </>
    ),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    right: 0,
    top: -5,
  };

  const [isShow, setShow] = useState<boolean>(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      audioInfo={audioInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box useFull display='flex' justifyContent='end'>
        <Image
          src={'../../assets/example/EM-032-01/MA31304_리터칭1.png'}
          alt='공원에 자전거 21대가 놓여져 있습니다.'
          width='840px'
          height='300px'
        />
        <BoySpeak>
          <OverlayTooltip type='cloud' place='top'>
            직접 묶어서 구해보니 <br />
            21÷7= <Input inputSize='x-small' width='48px' ariaLabel='21 나누기 7의 답을 입력하세요.' onChange={() => {}} /> 이에요.
          </OverlayTooltip>
        </BoySpeak>
        <GirlSpeak>
          <OverlayTooltip type='cloud' place='top'>
            곱셈구구를 <br /> 이용하여 구할 <br />수 있을까요?
          </OverlayTooltip>
        </GirlSpeak>
      </Box>
    </Container>
  );
};

const BoySpeak = styled.span`
  position: absolute;
  top: 14px;
  left: 40px;

  display: block;
  background: url(${boy}) bottom center no-repeat;
  height: 264px;
  width: 198px;
`;

const GirlSpeak = styled.span`
  position: absolute;
  top: 70px;
  right: 40px;

  display: block;
  background: url(${girl}) bottom right no-repeat;
  height: 261px;
  width: 149px;
`;
export default EM03201;
