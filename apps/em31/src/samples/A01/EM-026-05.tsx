import { useState } from 'react';
import { BoxWrap, Box, IQuestionProps, Label, OverlayTooltip, Image, EImageType, Typography, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import figure1 from '@maidt-cntn/assets/icons/figure_1.svg';
import figure10 from '@maidt-cntn/assets/icons/figure_10.svg';
import styled from '@emotion/styled';

interface IBox {
  figure1: string[];
  figure10: string[];
}

const EM02605 = () => {
  const [isShow, setShow] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState<string>('');
  const [boxs, setBoxs] = useState<IBox[]>([
    { figure1: [], figure10: [] },
    { figure1: [], figure10: [] },
    { figure1: [], figure10: [] },
  ]);

  const figure1Count = 6;
  const figure10Count = 3;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '한 바구니에 담아야 하는 열대 과일 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />수 모형을 옮겨 한 바구니에 담아야하는 열대 과일 수를 알아보세요.
      </>
    ),
  };

  const handleClickBox = (boxIdx: number) => {
    if (selectedBtn === '') return;

    const keyName = selectedBtn.includes('figure10_') ? 'figure10' : 'figure1';
    const arr = boxs[boxIdx][keyName];
    if (!arr.includes(selectedBtn)) {
      arr.push(selectedBtn);
      setBoxs([...boxs]);
    }
    setSelectedBtn('');
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
      <Box paddingBottom='10px'>
        <BoxWrap alignItems='center' justifyContent='center'>
          <Box position='relative' paddingRight='75px' margin='0'>
            <OverlayTooltip type='cloud' place='left' isShow>
              <Typography fontSize='var(--font-size-20)' lineHeight='36px'>
                십 모형 {figure10Count}개와
                <br />일 모형 {figure1Count}개를
                <br />세 부분에 똑같이
                <br />
                나누어 보세요.
              </Typography>
            </OverlayTooltip>
            <Box position='absolute' right='0' bottom='0'>
              <Image
                type={EImageType.IMG_BG}
                src='/example/leftFox.png'
                width='124px'
                height='149px'
                style={{ backgroundPosition: 'right -39px bottom 8px' }}
              />
            </Box>
          </Box>
          <Box display='flex' width='600px' height='157px' background='#DAE7F6' useRound alignItems='center' justifyContent='space-evenly'>
            <Box display='flex' flexDirection='column' justifyContent='center'>
              {[...Array(figure10Count)].map((_, index) => (
                <FigureButton
                  key={index}
                  size='large'
                  onClick={e => {
                    setSelectedBtn(`figure10_${index}`);
                  }}
                  className={selectedBtn === `figure10_${index}` ? 'active' : ''}
                  disabled={allBoxValue.includes(`figure10_${index}`)}
                >
                  <SvgIcon src={figure10} width='130px' height='18px' />
                </FigureButton>
              ))}
            </Box>
            <Box display='grid' gridTemplateColumns='repeat(3, 1fr)'>
              {[...Array(figure1Count)].map((_, index) => (
                <FigureButton
                  key={index}
                  size='small'
                  onClick={e => {
                    setSelectedBtn(`figure1_${index}`);
                  }}
                  className={selectedBtn === `figure1_${index}` ? 'active' : ''}
                  disabled={allBoxValue.includes(`figure1_${index}`)}
                >
                  <SvgIcon src={figure1} width='20px' height='20px' />
                </FigureButton>
              ))}
            </Box>
          </Box>
        </BoxWrap>
        <Box marginTop='10px' display='flex' padding='12px' background='#DAE7F6' useRound alignItems='center'>
          {boxs.map((box, index) => {
            return (
              <Box
                key={index}
                width='33.3333%'
                marginLeft={index === 0 ? '0' : '24px'}
                minHeight='141px'
                background='var(--color-white)'
                useRound
                border='2px solid #00A1E9'
                onClick={() => {
                  handleClickBox(index);
                }}
                display='flex'
                flexDirection='column'
                justifyContent='center'
              >
                <Box textAlign='center'>
                  {box.figure10.map(item => (
                    <FigureButton
                      key={item}
                      size='large'
                      onClick={e => {
                        handleRemovedFigure(index, item);
                      }}
                    >
                      <SvgIcon src={figure10} width='130px' height='18px' />
                    </FigureButton>
                  ))}
                </Box>
                <BoxWrap justifyContent='center'>
                  {box.figure1.map(item => (
                    <FigureButton
                      key={item}
                      size='small'
                      onClick={e => {
                        handleRemovedFigure(index, item);
                      }}
                    >
                      <SvgIcon src={figure1} width='20px' height='20px' />
                    </FigureButton>
                  ))}
                </BoxWrap>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

const FigureButton = styled.button<{ size: 'small' | 'large' }>`
  margin: 4px 7px;
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

export default EM02605;
