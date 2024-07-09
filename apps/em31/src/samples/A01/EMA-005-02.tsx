import { Box, Typography, Label, IQuestionProps, Image, BoxWrap, Symbol, TMainHeaderInfoTypes, Input, EImageType, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import frame from '../../assets/example/EC32108.png';
import { useState } from 'react';

const EMA00402 = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
  };

  const frameData = {
    left: ['6', '×', '78'],
    right: ['8', '×', '45'],
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
    >
      <BoxWrap>
        <Box vAlign='center' useRound width='calc(50% - 12px)' border='4px dotted var(--color-grey-100)' minHeight='314px'>
          <BoxWrap boxGap={0} height='100%' flexDirection='column' alignItems='flex-end' paddingBottom='20px'>
            <Box margin='20px 27.5px 8px 27.5px' position='relative' width='393px' height='206px'>
              <SvgIcon src={frame} width='393px' height='206px' />

              <Box position='absolute' top='8px' left='116px'>
                <Typography useGap={false} fontFamily='S-Core Dream' fontSize='var(--font-size-32)' lineHeight='42px'>
                  {frameData.left[0]}
                </Typography>
              </Box>

              <Box position='absolute' top='50%' left='160px' transform='translateY(8px)'>
                <Typography
                  useGap={false}
                  fontFamily='S-Core Dream'
                  fontSize='var(--font-size-32)'
                  lineHeight='42px'
                  alt='숫자 6과 아래 화살표 아래에 곱하기 숫자 78이 적혀있는 이미지 입니다.'
                >
                  {frameData.left[1]}
                  {frameData.left[2]}
                </Typography>
              </Box>
            </Box>

            <Box paddingRight='92px'>
              <Input width='130px' ariaLabel='6 곱하기 78의 값을 적어주세요.' value={value1} onChange={e => setValue1(e.target.value)} />
            </Box>
          </BoxWrap>
        </Box>
        <Box vAlign='center' useRound width='calc(50% - 12px)' border='4px dotted var(--color-grey-100)' minHeight='314px'>
          <BoxWrap boxGap={0} height='100%' flexDirection='column' alignItems='flex-end' paddingBottom='20px'>
            <Box margin='20px 27.5px 8px 27.5px' position='relative' width='393px' height='206px'>
              <SvgIcon src={frame} width='393px' height='206px' />

              <Box position='absolute' top='8px' left='116px'>
                <Typography useGap={false} fontFamily='S-Core Dream' fontSize='var(--font-size-32)' lineHeight='42px'>
                  {frameData.right[0]}
                </Typography>
              </Box>

              <Box position='absolute' top='50%' left='160px' transform='translateY(8px)'>
                <Typography
                  useGap={false}
                  fontFamily='S-Core Dream'
                  fontSize='var(--font-size-32)'
                  lineHeight='42px'
                  alt='숫자 8과 아래 화살표 아래에 곱하기 숫자 45이 적혀있는 이미지 입니다.'
                >
                  {frameData.right[1]}
                  {frameData.right[2]}
                </Typography>
              </Box>
            </Box>

            <Box paddingRight='92px'>
              <Input width='130px' ariaLabel='6 곱하기 78의 값을 적어주세요.' value={value2} onChange={e => setValue2(e.target.value)} />
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA00402;
