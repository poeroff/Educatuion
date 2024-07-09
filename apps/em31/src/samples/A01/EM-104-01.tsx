import { Image, IQuestionProps, Label, Box, List, Radio, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM10401 = () => {
  const [radio, setRadio] = useState<number | null>(null);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={8} type='icon' />
        가장 많이 사용한 모양에 색칠해 보세요.
      </>
    ),
  };
  const imgData = [
    { src: '../../assets/example/EM-104-01/DJC310005-1.png', alt: '세모 모양 그림입니다.' },
    { src: '../../assets/example/EM-104-01/DJC310005-2.jpg', alt: '네모 모양 그림입니다.' },
    { src: '../../assets/example/EM-104-01//DJC310005-3.png', alt: '동그라미 모양 그림입니다.' },
  ];
  return (
    <Container headerInfo={null} questionInfo={questionInfo} background='var(--color-white)' submitLabel='채점하기' onSubmit={() => {}} useRound>
      <Box display='flex' flexDirection='column' alignItems='center' useFull>
        <Image
          src='../../assets/example/EM-104-01/DJC310004.jpg'
          alt='세모 모양 3개, 네모 모양 1개, 동그라미 모양 2개로 이루어진 도형 그림입니다.'
          width='212px'
          height='223px'
        />
        <Box marginTop='24px'>
          <List gap={65} align='horizontal' data={imgData}>
            {({ value, index = 1 }) => (
              <Radio name='radio-group' key={`radio-group-${index}`} onClick={() => setRadio(index - 1)}>
                <Box
                  key={index}
                  width='263px'
                  border={`2px solid var(${radio === index - 1 ? '--color-blue-300' : '--color-yellow-300'})`}
                  backgroundColor={`var(${radio === index - 1 ? '--color-blue-50' : '--color-white'})`}
                  useShadow={radio === index - 1 ? true : false}
                  display='flex'
                  justifyContent='center'
                  padding='20px 0'
                  useRound
                >
                  <Image src={value?.src} alt={value?.alt} width={index === 0 ? '69px' : '60px'} height='60px' />
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </Box>
    </Container>
  );
};
export default EM10401;
