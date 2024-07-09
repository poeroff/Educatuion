import { useState } from 'react';
import { Box, Image, Typography, TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps, Radio, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME10301 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [radio, setRadio] = useState<number | null>(null);
  const [radio2, setRadio2] = useState<number | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listen More',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '1.',
    text: (
      <>
        <Typography useGap={false} lineHeight='50px' color='var(--color-yellow-700)' weight='var(--font-weight-extraBold)'>
          Listen and Check
        </Typography>
        &nbsp;Which is Correct?
      </>
    ),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  const handleRadio = (index: number) => {
    setRadio(index);
  };

  const handleRadio2 = (index: number) => {
    setRadio2(index);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box useFull useRound vAlign='center' background='#d0edf3' padding='50px 24px 50px 0'>
        <Image src='../../assets/example/ME1-L01-C02-A08-P01.jpg' alt='교복을 입은 여학생이 인사하고 있는 모습' width='278px' height='270px' />
        <Box useRound background='var(--color-white)' padding='20px'>
          <Box vAlign='flex-start' marginBottom='8px'>
            <Box padding='4px 12px' marginRight='8px'>
              <Label background='var(--color-black)' type='paint' size='xxx-small' />
            </Box>
            <Typography>Name : </Typography>
            <Typography>Yuna Lee</Typography>
          </Box>
          <Box vAlign='flex-start' marginBottom='8px'>
            <Box padding='4px 12px' marginRight='8px'>
              <Label background='var(--color-black)' type='paint' size='xxx-small' />
            </Box>
            <Typography>Class : </Typography>
            <Box vAlign='baseline' flexDirection='column' marginLeft='8px'>
              {['2', '3'].map(value => (
                <Radio type={'circle'} name={'radio-question-A'} label={value} value={radio === 1} onClick={() => handleRadio(1)} />
              ))}
            </Box>
          </Box>
          <Box vAlign='flex-start'>
            <Box padding='4px 12px' marginRight='8px'>
              <Label background='var(--color-black)' type='paint' size='xxx-small' />
            </Box>
            <Box whiteSpace='nowrap'>
              <Typography>My favorite movie : </Typography>
            </Box>

            <Box vAlign='baseline' flexDirection='column' whiteSpace='nowrap'>
              {['Kung Fu Panda', 'Wonder Woman'].map(value => (
                <Radio type={'circle'} name={'radio-question-B'} label={value} value={radio2 === 1} onClick={() => handleRadio2(1)} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME10301;
