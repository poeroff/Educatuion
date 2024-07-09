import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  ListHeader,
  Typography,
  Label,
  ToggleButton,
  IAudioPlayerProps,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Welcome to our debate on AI-generated art!',
      answer: '인공지능으로 생성된 예술에 대한 토론에 오신 것을 환영합니다!',
    },
    {
      question: 'Some artists have already shown us how to use AI programs to create artworks.',
      answer: '일부 예술가들은 이미 AI 프로그램을 사용하여 예술 작품을 만드는 방법을 보여주었습니다.',
    },
    {
      question: 'Do you think AI art can be called real art?',
      answer: '인공지능 예술을 진짜 예술이라고 부를 수 있다고 생각하시나요?',
    },
    {
      question: 'Today, we have two students, Jenny and Jiho.',
      answer: '오늘은 Jenny와 지호 두 학생을 모셨습니다.',
    },
    {
      question: 'Let’s hear what they’ve prepared.',
      answer: '그들이 준비한 것을 들어보겠습니다.',
    },
    {
      question: 'I’ve seen some AI-generated artworks, and they’re really amazing!',
      answer: 'AI가 생성한 예술 작품을 본 적이 있는데 정말 놀라웠어요!',
    },
    {
      question: 'I don’t see any difference between AI art and human art.',
      answer: 'AI 예술과 인간의 예술 사이에 차이가 없다고 생각해요.',
    },
    {
      question: 'I think AI can be just as creative and innovative as human artists.',
      answer: 'AI도 인간 아티스트만큼 창의적이고 혁신적일 수 있다고 생각해요.',
    },
    {
      question: 'AI can create content much faster than humans can and at a much lower cost.',
      answer: 'AI는 인간보다 훨씬 빠르게, 훨씬 저렴한 비용으로 콘텐츠를 만들 수 있습니다.',
    },
    {
      question: 'I believe AI will change the future of art in incredible ways!',
      answer: '저는 AI가 예술의 미래를 놀라운 방식으로 변화시킬 것이라고 믿습니다!',
    },
    {
      question: 'I don’t agree with the idea that AI-generated art is real art.',
      answer: '저는 인공지능이 만들어낸 예술이 진짜 예술이라는 생각에 동의하지 않습니다.',
    },
    {
      question: 'It lacks true creativity and artistic sensitivity, which are essential to real art.',
      answer: '실제 예술에 필수적인 진정한 창의성과 예술적 감수성이 부족하기 때문입니다.',
    },
    {
      question: 'AI just copies human works of art based on big data.',
      answer: 'AI는 빅데이터를 기반으로 인간의 예술 작품을 모방할 뿐입니다.',
    },
    {
      question: 'I don’t think AI will ever take the place of human artists.',
      answer: 'AI가 인간 예술가를 대신할 수는 없다고 생각합니다.',
    },
  ];

  const labelStr = (index: number) => {
    if (index === 1) return 'M';
    if (index === 6) return 'G';
    if (index === 11) return 'B';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    if (str) return str === 'M' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C04/A02/HE2-L04-C04-A02.mp3',
    captionSrc: '/L04/C04/A02/HE2-L04-C04-A02.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} vAlign='flex-start' useExtend>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box padding={'4px 0px'}>
                <Label value={labelStr(index)} type={'paint'} background={labelColor(index)} />
              </Box>
              <Box>
                <Typography>{value?.question}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen && value?.answer}
                  </Typography>
                </Box>
              </Box>
            </BoxWrap>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default P03;
