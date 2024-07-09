import { Container } from '@maidt-cntn/ui/math';
import { Box, EStyleButtonTypes, Input, TMainHeaderInfoTypes, SvgIcon, List, Typography, Image, IQuestionProps, ESvgType } from '@maidt-cntn/ui';
import star from '../../assets/icon/header_star.svg';
import { ChangeEvent, useState } from 'react';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM02801 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={star} size='36px' />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
  };

  const [questionListData, setQuestionListData] = useState([
    {
      img: '../../assets/example/EM-028-01/EM02801_Img1.png',
      alt: '농구공 8개와 농구공을 담는 통이 4개 있음',
      question: '8÷4=',
      inputValue: '',
    },
    {
      img: '../../assets/example/EM-028-01/EM02801_Img2.png',
      alt: '브로콜리 9개와 사람 3명이 있음',
      question: '9÷3=',
      inputValue: '',
    },
    {
      img: '../../assets/example/EM-028-01/EM02801_Img3.png',
      alt: '색연필 10자루와 필통 5개',
      question: '10÷5=',
      inputValue: '',
    },
  ]);

  const handleModalInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setQuestionListData(result => result?.map((val, idx) => (idx === index ? { ...val, inputValue: value } : val)));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel='채점하기'
      submitBtnColor={EStyleButtonTypes.YELLOW}
      onSubmit={() => {}}
      vAlign='start'
    >
      <List align='horizontal' gap={24} data={questionListData}>
        {({ value, index = 1 }) => (
          <Box>
            <Box width='290px' height='216px' type='line' hAlign='center' useRound>
              <Image src={value?.img || ''} alt={value?.alt || '이미지가 없음'} width='223px' height='120px' />
            </Box>
            <Box width='290px' height='100px' type='dashed' hAlign='center' padding='20px 0' useRound marginTop='12px'>
              <Typography>{value?.question}</Typography>
              <Input
                name={'inputValue-' + index}
                width='150px'
                value={value?.inputValue}
                onChange={val => handleModalInputChangeEvent(val, index - 1)}
              />
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default EM02801;
