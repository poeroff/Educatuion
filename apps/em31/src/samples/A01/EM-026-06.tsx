import { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { Box, IQuestionProps, Label, OverlayTooltip, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import brownArrow from '../../assets/icon/brown_arrow.svg';
import bear from '../../assets/example/bear_026.png';
import figure1 from '@maidt-cntn/assets/icons/figure_1.svg';
import figure10 from '@maidt-cntn/assets/icons/figure_10.svg';
import handPointing from '@maidt-cntn/assets/icons/HandPointing.svg';

interface IBox {
  figure1: string[];
  figure10: string[];
}

const EM41501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '한 줄에 선 학생 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='2' color='var(--color-white)' background='#969590' />
        &nbsp;수 모형을 옮겨 한 줄에 선 학생 수를 알아보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);

  const beforeFigure1Count = 2;
  const beforeFigure10Count = 4;
  const figure1Count = 12;
  const figure10Count = 3;

  const [isClick, setIsClick] = useState<boolean>(false);

  const [figureButtons, setFigureButtons] = useState<string>('');
  const [boxs, setBoxs] = useState<IBox[]>([
    { figure1: [], figure10: [] },
    { figure1: [], figure10: [] },
    { figure1: [], figure10: [] },
  ]);
  const handleClickBox = (boxIndex: number) => {
    if (figureButtons === '') return;

    const keyName = figureButtons.includes('figure10_') ? 'figure10' : 'figure1';
    const arr = boxs[boxIndex][keyName];
    if (!arr.includes(figureButtons)) {
      arr.push(figureButtons);
      setBoxs([...boxs]);
    }
    setFigureButtons('');
  };

  const handleRemovedFigure = (boxIdx: number, target: string) => {
    const keyName = target.includes('figure10_') ? 'figure10' : 'figure1';

    if (boxs[boxIdx][keyName].length > 0) {
      boxs[boxIdx][keyName] = boxs[boxIdx][keyName].filter(v => v !== target);
      setBoxs([...boxs]);
    }
  };

  const allBoxValue = boxs.reduce((acc: string[], obj) => {
    Object.values(obj).forEach((array: string) => acc.push(...array));
    return acc;
  }, []);

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
      <Box vAlign='flex-start' justifyContent='center'>
        <Box vAlign='center' flexDirection='column'>
          <Box backgroundColor='#DAE7F6' useRound padding='24px 9px' hAlign='center' flexDirection='column' width='212px' marginRight='11px'>
            {[...Array(isClick ? figure10Count : beforeFigure10Count)].map((__, index) => (
              <Box marginTop={isClick ? '4px' : '12px'} lineHeight={0} key={index}>
                {isClick ? (
                  <FigureButton
                    type='button'
                    size='large'
                    className={figureButtons === `figure10_${index}` ? 'active' : ''}
                    onClick={() => setFigureButtons(`figure10_${index}`)}
                    disabled={allBoxValue.includes(`figure10_${index}`)}
                  >
                    <SvgIcon src={figure10} width='122px' height='16px' />
                  </FigureButton>
                ) : (
                  <SvgIcon src={figure10} width='122px' height='16px' />
                )}
              </Box>
            ))}
            <Box display='grid' gridTemplateColumns='repeat(5, 1fr)' gap={isClick ? '4px' : '10px'} marginTop='12px'>
              {[...Array(isClick ? figure1Count : beforeFigure1Count)].map((__, index) => (
                <Fragment key={index}>
                  {isClick ? (
                    <FigureButton
                      type='button'
                      size='small'
                      className={figureButtons === `figure1_${index}` ? 'active' : ''}
                      onClick={() => setFigureButtons(`figure1_${index}`)}
                      disabled={allBoxValue.includes(`figure1_${index}`)}
                    >
                      <SvgIcon src={figure1} width='16px' height='16px' />
                    </FigureButton>
                  ) : (
                    <SvgIcon src={figure1} width='16px' height='16px' />
                  )}
                </Fragment>
              ))}
            </Box>
          </Box>
          {!isClick && (
            <Box marginTop='7px' width='fit-content'>
              <button type='button' aria-label='클릭시 선택영역이 나오는' onClick={() => setIsClick(true)}>
                <SvgIcon src={handPointing} size='24px' />
              </button>
            </Box>
          )}
        </Box>

        <Box hAlign='cneter'>
          <SvgIcon src={brownArrow} width='36px' height='25px' />

          <Box display='flex' width='fit-content' padding='12px' backgroundColor='#DAE7F6' useRound marginLeft='11px'>
            {boxs.map((value, index) => (
              <Box key={index} onClick={() => handleClickBox(index)}>
                <Box
                  width='191px'
                  minHeight='164px'
                  padding='7px'
                  marginLeft={index !== 0 ? '24px' : 0}
                  backgroundColor='var(--color-white)'
                  border='2px solid #00A1E9'
                  useRound
                  hAlign='center'
                  flexDirection='column'
                >
                  {value.figure10.map(value => (
                    <FigureButton
                      key={value}
                      type='button'
                      size='large'
                      onClick={e => {
                        handleRemovedFigure(index, value);
                      }}
                    >
                      <SvgIcon src={figure10} width='122px' height='16px' />
                    </FigureButton>
                  ))}
                  <Box display='grid' gridTemplateColumns='repeat(5, 1fr)' gap='12px' marginTop='24px'>
                    {value.figure1.map(value => (
                      <FigureButton
                        key={value}
                        type='button'
                        size='small'
                        onClick={e => {
                          handleRemovedFigure(index, value);
                        }}
                      >
                        <SvgIcon src={figure1} width='16px' height='16px' />
                      </FigureButton>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <BearSpeak>
        <OverlayTooltip type='cloud' place='left' isShow>
          십 모형을 세 부분에 똑같이
          <br />
          나누고, 남은 수 모형을
          <br />
          세 부분에 똑같이 <br />
          나누려면 어떻게 해야 할까요?
        </OverlayTooltip>
      </BearSpeak>
    </Container>
  );
};

const FigureButton = styled.button<{ size: 'small' | 'large' }>`
  padding: ${({ size }) => (size === 'small' ? '6px' : '10px')};
  border-radius: 8px;

  &.active {
    outline: 2px solid var(--color-blue-700);
    background-color: var(--color-blue-50);
  }

  &:disabled {
    opacity: 20%;
  }
`;

const BearSpeak = styled.div`
  position: absolute;
  bottom: 20px;
  right: 40px;

  display: flex;
  align-items: center;
  background: url(${bear}) center right no-repeat;
  background-size: 154px 183px;
  width: 410px;
  height: 150px;
`;

export default EM41501;
