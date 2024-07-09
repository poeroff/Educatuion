import { Box, IQuestionProps, SvgIcon, Symbol, TMainHeaderInfoTypes, Image, BoxWrap, Typography, ESvgType, Button, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/header_star.svg';
import empty_square from '@/assets/icon/math_empty_square.svg';
import { useState } from 'react';

const EMA01101 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Box marginRight='12px' vAlign='center'>
          <SvgIcon src={headerIcon} size='36px' />
        </Box>
        예각과 둔각 중에서 어느 것인지
        <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' style={{ marginLeft: '12px', marginRight: '12px' }} />
        안에 써넣으세요.
      </Box>
    ),
  };

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <BoxWrap marginTop='10px' flexDirection='column' alignItems='flex-end'>
        <Box marginRight={0}>
          <Button
            width='93px'
            height='93px'
            style={{
              backgroundColor: 'var(--color-grey-100)',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 5px 0 6px',
              borderRadius: 0,
            }}
          >
            <Typography
              fontSize='var(--font-size-18)'
              lineHeight='18px'
              color='var(--color-black)'
              style={{ whiteSpace: 'nowrap', paddingLeft: '6px', paddingRight: '5px' }}
            >
              교구 버튼
            </Typography>
            <Typography useGap={false} fontSize='var(--font-size-10)' lineHeight='18px' color='var(--color-black)'>
              (고객 검토 후 반영 예정)
            </Typography>
          </Button>
        </Box>

        <BoxWrap minWidth='100%' flexDirection='row' alignItems='center' justifyContent='space-between' marginRight={0} marginTop='50px'>
          <Box>
            <Image src='/example/EM-408-03/A-EM41-020004-0701_1.jpg' width='190px' height='74px' alt='각의 크기가 직각보다 작은 도형이 있습니다.' />
          </Box>

          <Box>
            <Image src='/example/EM-408-03/A-EM41-020004-0701_2.jpg' width='200px' height='120px' alt='각의 크기가 직각보다 큰 도형이 있습니다.' />
          </Box>

          <Box>
            <Image src='/example/EM-408-03/A-EM41-020004-0701_3.jpg' width='175px' height='120px' alt='각의 크기가 직각보다 작은 도형이 있습니다.' />
          </Box>

          <Box>
            <Image src='/example/EM-408-03/A-EM41-020004-0701_4.jpg' width='200px' height='120px' alt='각의 크기가 직각보다 큰 도형이 있습니다.' />
          </Box>
        </BoxWrap>

        <Box position='relative' width='100%'>
          <Box position='absolute' top='-30px' left='6%' transform='translateX(5px)'>
            <Input width='130px' ariaLabel='예각과 둔각 중 하나를 적어주세요.' value={value1} onChange={e => setValue1(e.target.value)} />
          </Box>

          <Box position='absolute' top='-88px' left='32%' transform='translateX(18px)'>
            <Input width='130px' ariaLabel='예각과 둔각 중 하나를 적어주세요.' value={value2} onChange={e => setValue2(e.target.value)} />
          </Box>

          <Box position='absolute' left='62%' top='-88px' transform='translateX(20px)'>
            <Input width='130px' ariaLabel='예각과 둔각 중 하나를 적어주세요.' value={value3} onChange={e => setValue3(e.target.value)} />
          </Box>

          <Box position='absolute' top='-30px' right='2%'>
            <Input width='130px' ariaLabel='예각과 둔각 중 하나를 적어주세요.' value={value4} onChange={e => setValue4(e.target.value)} />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA01101;
