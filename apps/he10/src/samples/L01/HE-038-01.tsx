import { useState } from 'react';
import {
  Box,
  Label,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  RecordButton,
  TextView,
  EStyleFontSizes,
  SimpleAudioPlayer,
  OverlayTooltip,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE03801 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '[Listen & Speak] 말하기 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 대화의 빈 칸에 들어갈 알맞은 문장을 골라 말 해보세요.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='start' height='60px'>
        <Label value={'A'} type={'paint'} background={'var(--color-blue-100)'} data-tooltip-id='click_tooltip' />
        <Box width='380px'>
          <OverlayTooltip
            id='click_tooltip'
            type='normal'
            place='right'
            padding='8px 0'
            openOnClick
            backgroundColor='var(--color-blue-100)'
            color='var(--color-black)'
            borderRadius='8px'
            isShow
          >
            <Typography size={EStyleFontSizes['X-MEDIUM']}>What do you hope for this year?</Typography>
          </OverlayTooltip>
        </Box>
        <SimpleAudioPlayer audioSrc={''} ariaLabel={'대화 듣기 버튼'} />
      </Box>
      <Box marginTop='20px'>
        <Box hAlign='end' height='68px' flexDirection='row-reverse'>
          <Label value={'B'} type={'paint'} background={'var(--color-orange-200)'} data-tooltip-id='click_tooltip1' />
          <Box width='478px'>
            <OverlayTooltip
              id='click_tooltip1'
              type='normal'
              place='left'
              padding='12px 187px'
              openOnClick
              backgroundColor='var(--color-pink-100)'
              borderRadius='8px'
              isShow
            >
              <RecordButton label='speak' />
            </OverlayTooltip>
          </Box>
        </Box>
        <Box hAlign='end' margin='12px 45px 0 0'>
          <TextView title='보기' hAlign='start'>
            <Box vAlign='flex-start'>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                Well, I already made a plan for this year.
              </Typography>
            </Box>
            <Box vAlign='flex-start'>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                Personally, I hope I'll start to learn Spanish.
              </Typography>
            </Box>
          </TextView>
        </Box>
      </Box>
    </Container>
  );
};

export default HE03801;
