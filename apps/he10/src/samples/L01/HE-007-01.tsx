import { Box, TMainHeaderInfoTypes, Dialog, ChipButton, EChipButtonType, List, BoxWrap, Question, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IData {
  contents: string;
  value: boolean | undefined;
}

const HE00701 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Check T (true) or F (false) according to the dialogue.',
  };

  const [list, setList] = useState<IData[]>([
    {
      contents: '(1) The boy won the dance competition.',
      value: undefined,
    },
    {
      contents: '(2) The girl performed a dance at the school festival last year.',
      value: undefined,
    },
    {
      contents: '(3) The speakers fell so thankful to their team members.',
      value: undefined,
    },
  ]);

  const handleChangeValue = (value: boolean, index?: number) => {
    setList(data => data?.map((val, idx) => (idx === index ? { ...val, value: value } : val)));
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    right: 10,
    top: 10,
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <List data={list}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull>
            <Box whiteSpace='nowrap'>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.TRUE}
                  isActive={value?.value === true}
                  size={'48px'}
                  onClick={() => handleChangeValue(true, index - 1)}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.FALSE}
                  isActive={value?.value === false}
                  size={'48px'}
                  onClick={() => handleChangeValue(false, index - 1)}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE00701;
