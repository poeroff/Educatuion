import { ChangeEvent, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Image, Box, TMainHeaderInfoTypes, BoxWrap, Input, Typography } from '@maidt-cntn/ui';
import styled from '@emotion/styled';

const EM03001 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo = {
    text: <>그림을 보고 곱셈식과 나눗셈식으로 나타내 보세요.</>,
  };

  const [inputs, setInputs] = useState({
    value1: '',
    value2: '',
    value3: '',
  });

  const input_List = ['multiply', 'multiply', 'divide', 'multiply'];

  const [inputValues, setInputValues] = useState(Array(input_List.length).fill(''));

  const handleChange = (index: number, value: string) => {
    const changeValues = [...inputValues];
    changeValues[index] = value;
    setInputValues(changeValues);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <BoxWrap boxGap={48} tabIndex={102}>
        <Box type='dashed' padding='48px' borderStyle='solid' borderRadius='16px'>
          <Image src={'/example/EM-030-01/MA31306_리터칭.jpg'} alt='튜브가 24개 놓여져 있습니다.' width='303px' height='265px' />
        </Box>
        <Box useFull position='relative'>
          <Box position='absolute' left='195px' top='45px'>
            <Input
              key={1}
              width='60px'
              value={inputs.value1}
              onChange={handleInputChangeEvent}
              maxLength={2}
              ariaLabel='첫번째 답을 입력해 주세요.'
            />
          </Box>
          <Box position='absolute' left='160px' top='125px'>
            <Input
              key={2}
              width='60px'
              value={inputs.value2}
              onChange={handleInputChangeEvent}
              maxLength={2}
              ariaLabel='두번째 답을 입력해 주세요.'
            />
          </Box>
          <Box position='absolute' left='231px' top='125px'>
            <Input
              key={3}
              width='60px'
              value={inputs.value3}
              onChange={handleInputChangeEvent}
              maxLength={2}
              ariaLabel='세번째 답을 입력해 주세요.'
            />
          </Box>
          <Box position='absolute' left='104px' top='205px'>
            {input_List.map((item, index) => (
              <Box key={index} marginBottom='27px' vAlign='center' gap='6px'>
                <Input
                  key={1}
                  width='60px'
                  value={inputValues[index]}
                  onChange={e => handleChange(index, e.target.value)}
                  maxLength={2}
                  ariaLabel={item === 'multiply' ? '곱셈식의 첫번째 답을 입력해 주세요.' : '나눗셈식의 첫번째 답을 입력해 주세요.'}
                />
                {item === 'multiply' ? <Typography useGap={false}>×</Typography> : <Typography useGap={false}>÷</Typography>}
                <Input
                  key={1}
                  width='60px'
                  value={inputValues[index + 1]}
                  onChange={e => handleChange(index, e.target.value)}
                  maxLength={2}
                  ariaLabel={item === 'multiply' ? '곱셈식의 두번째 답을 입력해 주세요.' : '나눗셈식의 두번째 답을 입력해 주세요.'}
                />
                <Typography useGap={false}>=</Typography>
                <Input
                  key={1}
                  width='60px'
                  value={inputValues[index + 2]}
                  onChange={e => handleChange(index, e.target.value)}
                  maxLength={2}
                  ariaLabel={item === 'multiply' ? '곱셈식의 세번째 답을 입력해 주세요.' : '나눗셈식의 세번째 답을 입력해 주세요.'}
                />
              </Box>
            ))}
          </Box>
          <BackgroundImage>
            <Image src={'/example/EM-030-01/MA31308_사다리.jpg'} alt='' width='331px' height='500px' />
          </BackgroundImage>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM03001;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 60px;
`;
