import { useState } from 'react';
import { BoxWrap, Box, IQuestionProps, Label, OverlayTooltip, Image, EImageType, Typography, Input, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM03202 = () => {
  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '한 상자에 담아야 하는 곶감 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />수 모형으로 한 상자에 담아야 하는 곶감 수를 알아보세요.
      </>
    ),
  };
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box width='578px' margin='0 auto' position='relative' padding='0 75px' boxSizing='content-box'>
        <Box position='absolute' left='0' bottom='0'>
          <Image
            type={EImageType.IMG_BG}
            src='/example/leftFox.png'
            width='124px'
            height='149px'
            style={{ backgroundPosition: 'right 9px bottom 8px' }}
          />
        </Box>
        <Image type={EImageType.IMG} width='100%' src='/example/EM-032-02/MC32301-2.png' alt='십 모형 6개와 일 모형 60개의 모습입니다.' />
        <Box position='absolute' right='0' bottom='0'>
          <Image
            type={EImageType.IMG_BG}
            src='/example/rightOtter.png'
            width='124px'
            height='149px'
            style={{ backgroundPosition: 'left 5px bottom 8px' }}
          />
        </Box>
      </Box>
      <BoxWrap justifyContent='space-between'>
        <OverlayTooltip type='cloud' place='bottom' isShow>
          <Typography fontSize='var(--font-size-20)' lineHeight='36px' width='263px'>
            십 모형의 개수로 생각하면 6&#247;2 ={' '}
            <Input type='number' value={value1} onChange={e => setValue1(e.target.value)} width='48px' maxLength={1} /> 이에요.
          </Typography>
        </OverlayTooltip>

        <OverlayTooltip type='cloud' place='bottom' isShow>
          <Typography fontSize='var(--font-size-20)' lineHeight='36px' width='263px'>
            일 모형의 개수로 생각하면 60&#247;2 ={' '}
            <Input type='number' value={value2} onChange={e => setValue2(e.target.value)} width='96px' maxLength={2} /> 이에요.
          </Typography>
        </OverlayTooltip>
      </BoxWrap>
    </Container>
  );
};

export default EM03202;
