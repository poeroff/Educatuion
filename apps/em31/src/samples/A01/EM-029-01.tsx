import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, TMainHeaderInfoTypes, IQuestionProps, Label, BoxWrap, Image, OverlayTooltip, Input, Typography, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import child_1 from '../../assets/example/EM-029-01/MA31303_child_1.svg';
import child_2 from '../../assets/example/EM-029-01/MA31303_child_2.svg';
import child_3 from '../../assets/example/EM-029-01/MA31303_child_3.svg';
import child_4 from '../../assets/example/EM-029-01/MA31303_child_4.svg';

const EM02901 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '곱셈과 나눗셈의 관계 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={12} />
        그림을 보고 곱셈식과 나눗셈식으로 나타내 보세요.
      </>
    ),
  };

  const math_expression_List = [
    {
      src: child_1,
      text: '구명조끼가 5개씩 4묶음 \n있으니까 20개예요',
      type: 'multiply',
      math: ['5', '20'],
    },
    {
      src: child_2,
      text: '구명조끼가 4개씩 5묶음 \n있으니까 20개예요',
      type: 'multiply',
      math: ['4', '20'],
    },
    {
      src: child_3,
      text: '구명조끼 20개를 5개씩 \n묶으면 4묶음이에요',
      type: 'divide',
      math: ['20', '5'],
    },
    {
      src: child_4,
      text: '구명조끼 20개를 4개씩 \n묶으면 5묶음이에요',
      type: 'divide',
      math: ['20', '4'],
    },
  ];

  const [inputValues, setInputValues] = useState(Array(math_expression_List.length).fill(''));

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
      useRound
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull alignItems='center'>
        <Box width='330px' height='350px' hAlign='center' type='line' useRound>
          <Image src={'/example/EM-029-01/MA31303_리터칭_수정2.jpg'} alt='구명조끼가 20개가 놓여져 있습니다.' width='242px' height='205px' />
        </Box>
        <Box flex='1' height='100%' hAlign='flex-end' flexDirection='column'>
          <List data={math_expression_List}>
            {({ value, index = 1 }) => (
              <Box
                key={index}
                position='relative'
                hAlign={index % 2 === 0 ? 'flex-start' : 'flex-end'}
                width='100%'
                padding='0 55px'
                marginTop='14px'
                display='flex'
                justifyContent='space-between'
              >
                <Person background={value?.src} align={index % 2 === 0 ? 'right' : 'left'} />
                <Box order={index % 2 === 0 ? '+1' : '0'}>
                  <OverlayTooltip type='cloud' place={index % 2 === 0 ? 'right' : 'left'}>
                    {value?.text}
                  </OverlayTooltip>
                </Box>
                <Box background={index % 2 === 0 ? 'yellow' : 'green'} useRound width='236px'>
                  {value?.type === 'multiply' ? (
                    <>
                      <Typography>{value?.math[0]}×</Typography>
                      <Input width='52px' value={inputValues[index]} onChange={e => handleChange(index, e.target.value)} />
                      <Typography>={value?.math[1]}</Typography>
                    </>
                  ) : (
                    <>
                      <Typography>
                        {value?.math[0]}÷{value?.math[1]}=
                      </Typography>
                      <Input width='52px' value={inputValues[index]} onChange={e => handleChange(index, e.target.value)} />
                    </>
                  )}
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const Person = styled.span<{ background?: string; align: 'left' | 'right' }>`
  position: absolute;
  ${({ align }) => (align === 'right' ? 'right: 34px' : 'left: 34px')};
  top: -32px;

  display: block;
  width: 40px;
  height: 48px;

  background: url(${({ background }) => background && background}) center no-repeat;

  z-index: 99;
`;

export default EM02901;
