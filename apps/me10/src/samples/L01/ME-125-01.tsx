import { useState } from 'react';
import { Box, TMainHeaderInfoTypes, IQuestionProps, Typography, PinchZoom, Image, BoxWrap, Recorder } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const cardData = [
  {
    condition: '1, 2, 3번\n점수가 가장 높다면',
    src: '/example/ME-125-01/ME1-L06-C07-A04-P03-01.png',
    title: '체계적인',
    titleColor: 'var(--color-purple-800)',
    content: '당신은 물건을 정리 정돈하고 메모하는 것을 좋아해요. 좋아하는 노래 목록을 만들어 듣는 사람이에요.',
  },
  {
    condition: '4, 5, 6번\n점수가 가장 높다면',
    src: '/example/ME-125-01/ME1-L06-C07-A04-P03-02.png',
    title: '사회적인',
    titleColor: 'var(--color-blue-800)',
    content: '당신은 물건을 정리 정돈하고 메모하는 것을 좋아해요. 좋아하는 노래 목록을 만들어 듣는 사람이에요.',
  },
  {
    condition: '7, 8, 9번\n점수가 가장 높다면',
    src: '/example/ME-125-01/ME1-L06-C07-A04-P03-03.png',
    title: '자신감이 넘치는',
    titleColor: 'var(--color-green-800)',
    content: '당신은 물건을 정리 정돈하고 메모하는 것을 좋아해요. 좋아하는 노래 목록을 만들어 듣는 사람이에요.',
  },
  {
    condition: '10, 11, 12번\n점수가 가장 높다면',
    src: '/example/ME-125-01/ME1-L06-C07-A04-P03-04.png',
    title: '예술적인',
    titleColor: 'var(--color-m-en-default)',
    content: '당신은 물건을 정리 정돈하고 메모하는 것을 좋아해요. 좋아하는 노래 목록을 만들어 듣는 사람이에요.',
  },
  {
    condition: '13, 14, 15번\n점수가 가장 높다면',
    src: '/example/ME-125-01/ME1-L06-C07-A04-P03-05.png',
    title: '수학적인',
    titleColor: 'var(--color-pink-500)',
    content: '당신은 물건을 정리 정돈하고 메모하는 것을 좋아해요. 좋아하는 노래 목록을 만들어 듣는 사람이에요.',
  },
];

const ME12501 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'funny',
    headerText: 'Tell Your Story',
    headerTextColor: 'var(--color-purple-1000)',
  };

  const questionInfo: IQuestionProps = {
    text: '설문 결과를 확인하고 어떤 사람이 되고 싶은지 말해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useExtend
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box display='flex' justifyContent='center' gap='10px' flexWrap='wrap' width='calc(100% - 275px)'>
          {cardData.map((value, index) => (
            <Box key={index} background='white' padding='4px' borderRadius='8px' width='229px' height='376px'>
              <Typography fontSize='var(--font-size-18)' lineHeight='28px' width='100%' usePre align='center'>
                {value.condition}
              </Typography>
              <Box width='100%' minHeight='114px' hAlign='center' marginTop='4px'>
                <PinchZoom>
                  <Image src={value.src} />
                </PinchZoom>
              </Box>
              <Box marginTop='4px'>
                <Typography fontSize='var(--font-size-18)' lineHeight='28px' weight='var(--font-weight-bold)' color={value.titleColor}>
                  {value.title}
                </Typography>
              </Box>
              <Box marginTop='4px'>
                <Typography fontSize='var(--font-size-16)' lineHeight='24px'>
                  {value.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box hAlign='center' flexDirection='column' height='412px' padding='0 10px'>
          <Typography usePre fontSize='var(--font-size-18)' lineHeight='28px' align='center'>
            어떤 사람이 되고 싶은지{'\n'}말해 보세요.
          </Typography>
          <Box marginTop='4px'>
            <Recorder recorderIndex={0} />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default ME12501;
