import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, IQuestionProps, Image, Input, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM04601 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        길이의 단위에는 mm, cm, m, km등이 있습니다. <br />
        <Box display='inline-flex' alignItems='center'>
          <SvgIcon alt='부등호' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 길이의 단위를 써넣으세요.
        </Box>
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onLink={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='flex-start'
    >
      <Box minHeight='685px' position='relative'>
        <Box width='400px' height='308px' position='absolute' top='46px' left='7px'>
          <Image src='/example/EM-046-01/sneaker_pic.png' alt='신발 길이 : 약 215단위' size='100%' />
          <Box vAlign='center' transform='rotate(-0.9deg)' position='absolute' bottom='42px' left='58px'>
            <TextWrapper backroundcolor='var(--color-green-100)' borderColor='var(--color-green-700)'>
              신발
            </TextWrapper>
            <Box display='flex' marginLeft='8px'>
              <Typography>약 215</Typography>
              <Input
                ariaLabel='신발 길이 단위 입력란'
                width='98px'
                value={value1}
                onChange={e => {
                  setValue1(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box width='489px' height='436px' position='absolute' right='20px'>
          <Image src='/example/EM-046-01/map_pic.png' alt='공원 둘레길 길이 : 약 3 단위' size='100%' />
          <Box vAlign='center' transform='rotate(3deg)' position='absolute' bottom='60px' left='62px'>
            <TextWrapper backroundcolor='var(--color-pink-100)' borderColor='var(--color-pink-700)'>
              공원 둘레길
            </TextWrapper>
            <Box display='flex' marginLeft='8px'>
              <Typography>약 3</Typography>
              <Input
                ariaLabel='공원둘레길 길이 단위 적기'
                width='98px'
                value={value2}
                onChange={e => {
                  setValue1(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box width='476px' height='345px' position='absolute' bottom='0' left='10px'>
          <Image src='/example/EM-046-01/door_pic.png' alt='현관문 길이 : 약 2 단위' size='100%' />
          <Box
            width='169px'
            vAlign='center'
            flexDirection='column'
            transform='rotate(-0.8deg) translateY(-50%)'
            position='absolute'
            top='50%'
            left='24px'
          >
            <TextWrapper backroundcolor='var(--color-purple-100)' borderColor='var(--color-purple-700)'>
              현관문
            </TextWrapper>
            <Box marginTop='8px'>
              <Typography>약 2</Typography>
              <Input
                ariaLabel='현관문 길이 단위 적기'
                width='98px'
                value={value3}
                onChange={e => {
                  setValue3(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box width='323px' height='191px' position='absolute' bottom='38px' right='88px'>
          <Image src='/example/EM-046-01/toothbrush.png' alt='칫솔 길이 : 약 18 단위' size='100%' />
          <Box vAlign='center' transform='rotate(-0.8deg)' position='absolute' bottom='30px' left='16px'>
            <TextWrapper backroundcolor='var(--color-yellow-100)' borderColor='var(--color-yellow-700)'>
              칫솔
            </TextWrapper>
            <Typography>약 18</Typography>
            <Input
              ariaLabel='칫솔 길이 단위 적기'
              width='98px'
              value={value4}
              onChange={e => {
                setValue4(e.target.value);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const TextWrapper = styled.div<{ backroundcolor: string; borderColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;
  padding: 0 19px;

  border-radius: 22px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ backroundcolor }) => backroundcolor};

  white-space: nowrap;
  font-size: 22px;
  line-height: 33px;
  color: var(--color-yellow-800);
`;

export default EM04601;
