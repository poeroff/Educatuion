import { Box, Button, EStyleButtonTypes, EStyleSizes, Image, Input, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE01104 = () => {
  const [isShow, setShow] = useState(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const onSubmit = () => {
    setShow(!isShow);
  };
  const openModal = () => {
    setIsShowModal(true);
  };
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'My School Life',
  };
  const questionInfo = {
    text: (
      <>
        <Box marginRight={10} fontWeight={'var(--font-weight-extraBold)'} color='var(--color-green-800)'>
          Step2
        </Box>
        Step1을 바탕으로 자신의 학교생활을 소개하는 글을 써 봅시다.
      </>
    ),
  };
  const data = [
    { text: 'I', placeholder: 'e.g. walk to school' },
    { text: 'My classmates are', placeholder: 'e.g. nice' },
    { text: 'I love', placeholder: 'e.g. lunchtime' },
    { text: 'My favorite food is', placeholder: 'e.g. bibimbap' },
  ];
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} onSubmit={onSubmit} submitLabel={'완료하기'}>
      <Box display='flex'>
        <Box border={'1px solid var(--color-grey-500)'} borderRadius={'8px'} padding={'24px 40px'}>
          <Box fontSize={'var(--font-size-32)'} marginBottom={24} display='flex' justifyContent='center'>
            <Typography weight={'var(--font-weight-bold)'}>My School Life</Typography>
          </Box>
          <Box>
            <Box>
              <Typography>I go to</Typography>
              <Input placeholder='e.g. Hanguk' width='350px' minWidth='250px' />
              <Typography>Middle School.</Typography>
            </Box>
            {data.map(value => {
              return (
                <Box marginTop={6}>
                  <Typography>{value.text}</Typography>
                  <Input placeholder={value.placeholder} width='350px' minWidth='250px' />
                  <Typography>.</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box padding={'0 20px'} display='flex' flexDirection='column' hAlign='end'>
          <Box marginBottom={10}>
            <Image src='../../assets/example/ME1-L01-C10-A02-P02 1.png' width='142px' />
          </Box>
          <Button
            label={'작성 내용 보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            minWidth='132px'
            useRound
            onClick={openModal}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HE01104;
