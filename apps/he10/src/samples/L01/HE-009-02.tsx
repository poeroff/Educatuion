import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  RecordButton,
  Typography,
  EStyleFontSizes,
  IQuestionProps,
  OverlayTooltip,
  SimpleAudioPlayer,
} from '@maidt-cntn/ui';
import { Container, PlayButton } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
}

const HE00902 = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [radioState, setRadioState] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'YourTurn (Step2)',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write your answer in the blank and do a role-play.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      content: <>Jenny. you seem a bit down. What's wrong?</>,
    },
    {
      type: 'B',
      content: <>No. I'm worried it might harm our friendship.</>,
    },
    {
      type: 'A',
      content: <>I understand how you feel. Have you considered discussing your concerns with him openly?</>,
    },
    {
      type: 'B',
      content: <>Well, my band's getting ready for the school festival, but Rory, that guitarist is always late. I'm really stressed out.</>,
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        console.log('submit 이벤트');
      }}
      useExtend
    >
      <Box vAlign='center' marginBottom={8} justifyContent='space-between'>
        <>
          <Box whiteSpace={'nowrap'}>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>나의 역할 선택하기 </Typography>
          </Box>
          <BoxWrap boxGap={8} marginLeft={8}>
            <Box>
              <PlayButton label='A' color='skyblue' isActive={'A' === radioState} onClick={() => setRadioState('A')} />
            </Box>
            <Box>
              <PlayButton label='B' color='beige' isActive={'B' === radioState} onClick={() => setRadioState('B')} />
            </Box>
          </BoxWrap>
        </>
        <RecordButton label={'start'} data-tooltip-id='click_tooltip' onClick={() => setIsOpen(!isOpen)} />
        <OverlayTooltip
          id='click_tooltip'
          type='normal'
          padding='16px'
          openOnClick
          backgroundColor='var(--color-white)'
          color='var(--color-black)'
          isShadow
        >
          {isOpen && (
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              역할을 선택하세요.
            </Typography>
          )}
        </OverlayTooltip>
      </Box>
      <Scroll tabIndex={0}>
        <Box useFull>
          <List<IListenAndAnswer>
            data={data}
            gap={20}
            row={({ value, index = 1 }) => (
              <Box vAlign='flex-start'>
                <Box padding='8px 0' marginRight={8} vAlign='center'>
                  <Label
                    value={value?.type}
                    type={'paint'}
                    size={'x-small'}
                    background={index % 2 === 0 ? 'var(--color-yellow-100)' : 'var(--color-blue-100)'}
                  />
                </Box>
                <Box flex={1}>
                  <Typography>{value?.content}</Typography>
                </Box>
                <Box width='120px' hAlign='flex-end'>
                  {isStart && <SimpleAudioPlayer audioSrc={''} />}
                </Box>
              </Box>
            )}
          />
        </Box>
      </Scroll>
    </Container>
  );
};

export default HE00902;
