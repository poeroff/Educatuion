import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, ESvgType, IQuestionProps, Label, List, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import circle10 from '../../assets/icon/circle_10.svg';

const EM41501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '80÷4 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='10이 적혀있는 원' src={circle10} size='40px' />
          &nbsp;8개를 4묶음으로 똑같이 나누어 보세요.
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState(false);

  const circleButtonCount = 8;
  const [circleButtons, setCircleButtons] = useState<number>(0);
  const [boxs, setBox] = useState<number[][]>([[], [], [], []]);
  const handleClickBox = (boxIndex: number) => {
    if (circleButtons !== 0) {
      setBox(prev => prev.map((value, index) => (index === boxIndex ? [...value, circleButtons] : value)));
      setCircleButtons(0);
    } else {
      const newBoxs = [...boxs];
      newBoxs[boxIndex].pop();
      setBox(newBoxs);
    }
  };

  const getCircleButtonState = (index: number) => {
    const indexs: number[] = [];
    boxs.map(value => indexs.push(...value));
    if (indexs.includes(index)) return 'disabled';
    if (circleButtons === index) return 'active';
    return undefined;
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
      <Box hAlign='center' flexDirection='column'>
        <Box width='fit-content' title='10이 적혀있는 원이 8개 있습니다.'>
          <List data={[...Array(circleButtonCount)]} gap={28} align='horizontal'>
            {({ value, index = 1 }) => (
              <CircleButton
                type='button'
                aria-label={circleButtons === index ? `선택된 ${index}번째 10이 적혀있는 원` : `${index}번째 10이 적혀있는 원`}
                onClick={() => setCircleButtons(index)}
                state={getCircleButtonState(index)}
              />
            )}
          </List>
        </Box>
        <Box display='flex' width='fit-content' padding='12px' marginTop='24px' backgroundColor='#F8CABC' useRound height='124px'>
          {boxs.map((value, index) => (
            <button
              key={index}
              type='button'
              title={value.length > 0 ? `10이 적혀있는 원이 ${value.length}개 있습니다.` : '요소가 없습니다.'}
              onClick={() => handleClickBox(index)}
            >
              <Box
                width='147px'
                height='100px'
                padding='7px'
                marginLeft={index !== 0 ? '24px' : 0}
                backgroundColor='var(--color-white)'
                border='2px solid #CE494C'
                useRound
                hAlign='center'
                flexWrap='wrap'
              >
                {value?.map((__, index) => (
                  <Box display='inline' marginLeft={index !== 0 ? '4px' : 0}>
                    <SvgIcon key={index} src={circle10} size='40px' />
                  </Box>
                ))}
              </Box>
            </button>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

const CircleButton = styled.button<{ state?: 'active' | 'disabled' }>`
  width: 60px;
  height: 60px;
  padding: 10px;
  border-radius: 50%;

  background: url(${circle10}) center center no-repeat;
  background-size: 40px;

  ${({ state }) =>
    state === 'active' &&
    `
      outline: 2px solid var(--color-blue-700);
      background-color: var(--color-blue-50);
    `}

  ${({ state }) =>
    state === 'disabled' &&
    `
      opacity : 20%;
    `}
`;

export default EM41501;
