import { Box, ESvgType, IQuestionProps, Label, SvgIcon, Image, List, Radio, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';
import { useState } from 'react';

const EM10501 = () => {
  const [radio, setRadio] = useState<number | null>(null);

  const imgData = [
    { src: '../../assets/example/EM-104-01/DJC310005-1.png', alt: '세모 모양 그림입니다.' },
    { src: '../../assets/example/EM-104-01/DJC310005-2.jpg', alt: '네모 모양 그림입니다.' },
    { src: '../../assets/example/EM-104-01//DJC310005-3.png', alt: '동그라미 모양 그림입니다.' },
  ];
  const repeatedData = [...imgData, ...imgData, ...imgData.slice(0, 2)];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={11} size='small' marginRight={0} />
        <Box>
          다음과 같은 규칙에 따라 모양을 늘어놓을 때,&nbsp;
          <Box display='inline' verticalAlign='middle'>
            <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          </Box>
          &nbsp;안에 알맞은 모양에 색칠해 보세요.
        </Box>
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background='var(--color-white)' submitLabel='채점하기' onSubmit={() => {}} useRound>
      <Box display='flex' flexDirection='column' alignItems='center' useFull>
        <Box
          border='2px solid var(--color-yellow-300)'
          padding='24px'
          width='682px'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          useRound
        >
          {repeatedData.map((value, idx) => {
            return (
              <Box display='inline-flex'>
                <Image src={value?.src} alt={value?.alt} width={idx === 0 ? '69px' : '60px'} height='60px' />
              </Box>
            );
          })}
          <Input width='52px' />
        </Box>
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

export default EM10501;
