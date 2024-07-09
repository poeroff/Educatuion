import { useState } from 'react';
import { Box, Button, EStyleButtonTypes, IQuestionProps, Label, TMainHeaderInfoTypes, Image, EImageType, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EMA00801 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        계산 결과가 같은 것끼리 같은 색으로 칠해 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);

  const [imageSrc, setImageSrc] = useState('/example/EMA-008-01/EC32106_blue.png');

  const handleClick = () => {
    setImageSrc('/example/EMA-008-01/EC32106_red.png');
    console.log('클릭했습니다...');
    console.log(setImageSrc);
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
      <Box useFull position='relative'>
        <Box position='absolute' top='50px' left='64px'>
          <Button color={EStyleButtonTypes.NORMAL} onClick={handleClick}>
            <Image src={imageSrc} width='197px' height='144px' />
            <Box position='absolute' top='25px' right='45px'>
              <Typography>35×80</Typography>
            </Box>
          </Button>
        </Box>
        <Box position='absolute' top='180px' left='260px'>
          <Button color={EStyleButtonTypes.NORMAL}>
            <Image src='/example/EMA-008-01/EC32106_red.png' width='197px' height='144px' />
            <Box position='absolute' top='25px' right='45px'>
              <Typography>60×40</Typography>
            </Box>
          </Button>
        </Box>
        <Box position='absolute' top='50px' right='250px'>
          <Button color={EStyleButtonTypes.NORMAL}>
            <Image src='/example/EMA-008-01/EC32106_skyblue.png' width='197px' height='144px' />
            <Box position='absolute' top='25px' right='45px'>
              <Typography>48×50</Typography>
            </Box>
          </Button>
        </Box>
        <Box position='absolute' top='180px' right='50px'>
          <Button color={EStyleButtonTypes.NORMAL}>
            <Image src='/example/EMA-008-01/EC32106_blue.png' width='197px' height='144px' />
            <Box position='absolute' top='25px' right='45px'>
              <Typography>70×40</Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EMA00801;
