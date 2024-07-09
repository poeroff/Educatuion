import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, ESvgType, IQuestionProps, Input, Label, List, OverlayTooltip, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import fox from '../../assets/example/EM-008/fox.png';
import { css } from '@emotion/react';
import figure1 from '@maidt-cntn/assets/icons/figure_1.svg';
import figure10 from '@maidt-cntn/assets/icons/figure_10.svg';
import figure100 from '@maidt-cntn/assets/icons/figure_100.svg';
interface IBoxData {
  count: number;
  ariaLabel: string;
}

const data: IBoxData[] = [
  { count: 3, ariaLabel: '백 모형' },
  { count: 4, ariaLabel: '십 모형' },
  { count: 2, ariaLabel: '일 모형' },
  { count: 3, ariaLabel: '백 모형' },
  { count: 2, ariaLabel: '십 모형' },
  { count: 5, ariaLabel: '일 모형' },
];

const inputData = [
  { title: '백 모형', color: 'var(--color-green-200)' },
  { title: '십 모형', color: 'var(--color-pink-200)' },
  { title: '일 모형', color: 'var(--color-blue-200)' },
];

const getImg = (ariaLabel: string) => {
  switch (ariaLabel) {
    case '백 모형':
      return figure100;
    case '십 모형':
      return figure10;
    case '일 모형':
      return figure1;
  }
};

const EM00801 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '배달한 물건 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />수 모형이 모두 몇 개인지 알아보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const onSubmit = () => {
    setShow(!isShow);
  };

  const [inputValues, setInputValues] = useState(Array(inputData.length).fill(''));
  const handleChange = (index: number, value: string) => {
    const changeValues = [...inputValues];
    changeValues[index] = value;
    setInputValues(changeValues);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel='채점하기'
      useRound
      useExtend
    >
      <Box vAlign='center' flexDirection='column'>
        <Box marginBottom='24px' width='680px' display='grid' gridTemplateColumns='1fr 1fr 1fr' rowGap='8px' columnGap='24px'>
          {data.map((item, index) => (
            <Box key={index} type='line' useFull hAlign='center' borderRadius='16px' minHeight='116px' padding='8px 0'>
              <ImgBox role='img' aria-label={item.ariaLabel + item.count + '개'} ariaLabel={item.ariaLabel}>
                {[...Array(item.count)].map((__, index) => (
                  <Box display='flex'>
                    <SvgIcon type={ESvgType.IMG} zIndex={item.count - index} src={getImg(item.ariaLabel)} alt='' ariaHidden size='100%' />
                  </Box>
                ))}
              </ImgBox>
            </Box>
          ))}
        </Box>

        <Box hAlign='center'>
          <List
            data={inputData}
            align='horizontal'
            gap={24}
            row={({ value, index = 1 }) => (
              <Box key={index} width='100%' height='100%'>
                <Box backgroundColor={value?.color} marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
                  {value?.title}
                </Box>
                <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
                  <Input
                    width='52px'
                    value={inputValues[index]}
                    onChange={e => handleChange(index, e.target.value)}
                    ariaLabel={value?.title + ' 개수의 답'}
                  />
                  <Typography>개</Typography>
                </Box>
              </Box>
            )}
          />
        </Box>

        <FoxSpeak>
          <OverlayTooltip type='cloud' place='top'>
            351은 <br /> 백 모형 3개, <br /> 십 모형 5개,
            <br /> 일 모형 1개로 <br /> 나타내요.
          </OverlayTooltip>
        </FoxSpeak>
      </Box>
    </Container>
  );
};

const FoxSpeak = styled.span`
  position: absolute;
  top: 31px;
  right: 20px;

  display: block;
  background: url(${fox}) bottom center no-repeat;
  height: 250px;
  width: 120px;
`;

const ImgBox = styled.div<{ ariaLabel: string }>`
  ${({ ariaLabel }) => {
    switch (ariaLabel) {
      case '백 모형':
        return css`
          > div + div {
            margin-top: -23px;
          }
        `;
      case '십 모형':
        return css`
          > div + div {
            margin-top: 4px;
          }
        `;
      case '일 모형':
        return css`
          display: grid;
          grid-template-columns: repeat(5, 16px);
          gap: 4px;
        `;
    }
  }}
`;

export default EM00801;
