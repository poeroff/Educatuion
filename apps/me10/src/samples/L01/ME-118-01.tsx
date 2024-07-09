import { useState } from 'react';
import { Box, BoxWrap, IAudioPlayerProps, IQuestionProps, Input, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const data = [
  { title: 'Seoul', text: 'It’s cold and' },
  { title: 'Gyeongju', text: 'It’s warm and' },
];

const ME11801 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(Array(data.length).fill(''));

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
        &nbsp;How’s the weather in Seoul and Gyeongju?
      </>
    ),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValue(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
    >
      <BoxWrap>
        {data.map((item, index) => {
          const bdColor = (index + 1) % 2 == 0 ? 'var(--color-green-100)' : 'var(--color-red-200)';
          return (
            <Box useFull hAlign='center' position='relative'>
              <Box key={index} background={bdColor} padding='10px 20px' borderRadius={16} position='absolute' top={-35}>
                <Typography weight='var(--font-weight-bold)' align='center'>
                  {item.title}
                </Typography>
              </Box>
              <Box useFull padding='60px 30px' border={`2px solid ${bdColor}`} borderRadius={16}>
                <Typography>{item.text}</Typography>
                <Input
                  width='183px'
                  value={inputValue[index]}
                  onChange={e => handleInputChange(index, e.target.value)}
                  ariaLabel={`${index + 1}번째 답 입력란`}
                />
                .
              </Box>
            </Box>
          );
        })}
      </BoxWrap>
    </Container>
  );
};

export default ME11801;
