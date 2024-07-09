import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, BoxWrap, ESvgType, IQuestionProps, Image, Input, Label, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import math_x_icon from '../../assets/icon/math_X_icon.svg';
import math_x from '../../assets/icon/x_icon.svg';
import { css } from '@emotion/react';

interface IBoxData {
  title: string;
  color: string;
  count: number;
  img: string;
  selectdImg: string;
}

const EM00801 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '더 많은 도움 로봇 수 구하기',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        <Box>
          수 모형 244에서 112만큼&nbsp;
          <SvgIcon type={ESvgType.IMG} src={math_x} alt='X' width='30px' height='30px' />표 하고 남은 수 모형이 몇 개인지 알아보세요.
        </Box>
      </>
    ),
  };

  const BASE_URL = '/example/EM-008/';

  const data: IBoxData[] = [
    { title: '백 모형', color: 'var(--color-green-200)', count: 2, img: 'figure_100.svg', selectdImg: 'selected_figure_100.svg' },
    { title: '십 모형', color: 'var(--color-pink-200)', count: 4, img: 'figure_10.svg', selectdImg: 'selected_figure_10.svg' },
    { title: '일 모형', color: 'var(--color-blue-200)', count: 4, img: 'figure_1.svg', selectdImg: 'selected_figure_1.svg' },
  ];

  const [showXArray, setShowXArray] = useState(
    data.map(value =>
      Array(value.count)
        .fill(null)
        .map(() => false),
    ),
  );

  const onClickFigure = (colIndex: number, rowIndex: number) => {
    setShowXArray(prev => {
      const currentXArray = prev.map(row => [...row]);
      currentXArray[colIndex][rowIndex] = !currentXArray[colIndex][rowIndex];
      return currentXArray;
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={() => {}}
      submitLabel='완료하기'
      useRound
    >
      <Box vAlign='center' flexDirection='column'>
        <BoxWrap width='auto'>
          {data.map((value, index) => {
            return (
              <Box key={index} width='210px'>
                <Box type='line' useRound height='160px' padding='8px' hAlign='center' flexDirection={index === 2 ? 'row' : 'column'} gap='4px'>
                  {Array(value.count)
                    .fill(null)
                    .map((_, count) => (
                      <Button
                        key={count}
                        onClick={() => onClickFigure(index, count)}
                        isClick={showXArray[index][count]}
                        index={index}
                        aria-label={
                          showXArray[index][count] ? `선택된 ${count + 1}번째 ${value.title} 한 개` : `${count + 1}번째 ${value.title} 한 개`
                        }
                      >
                        <Image src={showXArray[index][count] ? BASE_URL + value.selectdImg : BASE_URL + value.img} alt='' ariaHidden />
                      </Button>
                    ))}
                </Box>
                <Box backgroundColor={value?.color} marginTop='24px' textAlign='center' borderRadius='8px' height='66px' hAlign='center'>
                  {value.title}
                </Box>
                <Box
                  background='white'
                  hAlign='center'
                  marginTop='4px'
                  padding='8px 16px'
                  border='1px solid var(--color-grey-400)'
                  borderRadius='8px'
                >
                  <Input width='52px' onChange={() => {}} value='' ariaLabel={value.title + ' 개수의 답'} />
                  <Typography>개</Typography>
                </Box>
              </Box>
            );
          })}
        </BoxWrap>
      </Box>
    </Container>
  );
};

const Button = styled.button<{ isClick: boolean; index: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;

  ${({ isClick }) => isClick && 'outline: 2px solid var(--color-red-700)'};
  ${({ index }) => (index === 2 ? 'border-radius: 4px' : 'border-radius: 8px; width: 100%')};

  ::after {
    ${({ isClick }) => isClick && `content : ''`};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: url(${math_x_icon}) center center no-repeat;
    background-size: 100%;
    ${({ index }) => {
      switch (index) {
        case 0:
          return css`
            width: 26px;
            height: 26px;
          `;
        case 1:
          return css`
            width: 20px;
            height: 20px;
          `;
        case 2:
          return css`
            width: 11px;
            height: 11px;
          `;
      }
    }};
  }
`;

export default EM00801;
