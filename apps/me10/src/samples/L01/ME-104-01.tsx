import { useState } from 'react';
import styled from '@emotion/styled';

import { TMainHeaderInfoTypes, Typography, IAudioPlayerProps, IQuestionProps, Box } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME10401 = () => {
  const [isShow, setShow] = useState(false);
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const [clickedButtons, setClickedButtons] = useState<number[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listen More',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '1.',
    text: (
      <>
        <Typography useGap={false} lineHeight='50px' color='var(--color-yellow-700)' weight='var(--font-weight-extraBold)'>
          Listen Again and Match
        </Typography>
        &nbsp;What do Dylan and Yuna like?
      </>
    ),
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  const peopleData = [
    {
      backgroundColor: 'var(--color-red-200)',
      name: 'Dylan',
    },
    {
      backgroundColor: 'var(--color-green-100)',
      name: 'Yuna',
    },
  ];

  const valueData = [
    {
      backgroundColor: 'var(--color-blue-100)',
      content: 'action movies',
    },
    {
      backgroundColor: 'var(--color-yellow-100)',
      content: 'comedies',
    },
  ];

  const handleClick = (index: number) => {
    setClickedButtons(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      onSubmit={() => setShow(!isShow)}
      submitLabel={'채점하기'}
      submitDisabled={false}
      audioInfo={audioInfo}
    >
      <Box hAlign='center' useFull>
        <Box width='732px' vAlign='center' justifyContent='space-between'>
          <ClickWrap>
            {peopleData.map((value, index) => (
              <ClickButtonWrap key={index} dotPosition='left'>
                <Circle isClick={clickedButtons.includes(index)} />
                <ClickButton color={value.backgroundColor} isClick={clickedButtons.includes(index)} onClick={() => handleClick(index)}>
                  <Typography useGap={false}>{value.name}</Typography>
                </ClickButton>
              </ClickButtonWrap>
            ))}
          </ClickWrap>
          <ClickWrap>
            {valueData.map((value, index) => (
              <ClickButtonWrap key={index} dotPosition='right'>
                <Circle isClick={clickedButtons.includes(index)} />
                <ClickButton color={value.backgroundColor} isClick={clickedButtons.includes(index)} onClick={() => handleClick(index)}>
                  <Typography useGap={false}>{value.content}</Typography>
                </ClickButton>
              </ClickButtonWrap>
            ))}
          </ClickWrap>
        </Box>
      </Box>
    </Container>
  );
};

const ClickWrap = styled.div`
  div + div {
    margin-top: 100px;
  }
`;

const ClickButtonWrap = styled.div<{ dotPosition: 'left' | 'right' }>`
  display: flex;
  align-items: center;

  ${({ dotPosition }) => {
    switch (dotPosition) {
      case 'left':
        return 'flex-direction: row-reverse';
      case 'right':
        return 'flex-direction: row';
    }
  }}
`;

const ClickButton = styled.button<{ color: string; isClick?: boolean; isError?: boolean }>`
  width: 224px;
  height: 50px;
  padding: 4px 12px 4px 12px;
  border-radius: 8px;
  background-color: ${({ color }) => color};

  ${({ isClick }) =>
    isClick &&
    `
    color: var(--color-blue-700);
  `}
  ${({ isError }) =>
    isError &&
    `
    color: var(--color-red-800);
  `}
`;

const Circle = styled.div<{ isClick?: boolean; isError?: boolean }>`
  width: 10px;
  height: 10px;
  margin: 16px;

  border-radius: 50%;
  background-color: var(--color-black);

  ${({ isClick }) =>
    isClick &&
    `
    border: 2px solid var(--color-blue-200);
    background-color: var(--color-blue-500);
  `}
  ${({ isError }) =>
    isError &&
    `
    background-color: var(--color-red-800);
  `}
`;

export default ME10401;
