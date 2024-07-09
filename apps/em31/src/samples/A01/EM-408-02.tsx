import { useState } from 'react';
import { BoxWrap, IQuestionProps, TMainHeaderInfoTypes, Label, Image, Box, Input, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import mathDegree from '../../assets/icon/math_degree.svg';

const EM41702 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '각도 읽기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        각도를 읽어 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap flexDirection='column'>
        <BoxWrap height='172px' minWidth='100%' alignItems='flex-end' justifyContent='space-evenly' marginRight='0'>
          <Image
            src='/example/EM-408-02/MC41209-1_1.jpg'
            width='256px'
            height='129px'
            alt='각도기 위에 각이 그려져 있고 각도기는 60 도를 나타내고 있어요.'
          />
          <Image
            src='/example/EM-408-02/MC41209-1_2.jpg'
            width='254px'
            height='128px'
            alt='각도기 위에 각이 그려져 있고 각도기는 135 도를 나타내고 있어요.'
          />
          <Image
            src='/example/EM-408-02/MC41209-1_3.jpg'
            width='292px'
            height='172px'
            alt='각도기 위에 각이 그려져 있고 각도기의 눈금 부분이 크게 확대되어 있고 약 43 도를 나타내고 있어요.'
          />
        </BoxWrap>

        <Box marginTop='24px' marginRight={0} hAlign='space-around'>
          <Box vAlign='flex-start' gap='2px'>
            <Input width='130px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='각도를 적어주세요.' />
            <SvgIcon src={mathDegree} size='5.5px' />
          </Box>

          <Box vAlign='flex-start' gap='2px'>
            <Input width='130px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='각도를 적어주세요.' />
            <SvgIcon src={mathDegree} size='5.5px' />
          </Box>

          <Box vAlign='flex-start' gap='2px'>
            <Typography lineHeight='42px'>약</Typography>
            <Input width='130px' value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='각도를 적어주세요.' />
            <SvgIcon src={mathDegree} size='5.5px' />
          </Box>
        </Box>

        <Box marginTop='18px'>
          <Image
            src='/example/EM-408-02/bear_text.jpg'
            alt='여울이가 “각의 변이 각도기의 눈금 사이에 있을 때는 가까운 쪽의 눈금을 읽어 약 □ ° 라고 해요 .” 라고 말하고 있어요.'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM41702;
