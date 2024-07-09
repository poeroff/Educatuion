import { useState } from 'react';
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
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P04 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE1-L01-C02-A03-02.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Hello, Lakeview High School students!',
      answer: '안녕하세요, Lakeview 고등학교 학생 여러분!',
    },
    {
      question: 'I’m Ms. Claire White, your head teacher.',
      answer: '저는 여러분의 교장 선생님 Claire White입니다.',
    },
    {
      question: 'I have an exciting announcement for you.',
      answer: '여러분에게 흥미로운 공지 사항이 있습니다.',
    },
    {
      question: 'The remodeling of our school library has finally been completed, and the new library will open on Monday, March 14th.',
      answer: '우리 학교 도서관의 리모델링이 마침내 끝나서, 새로운 도서관이 3월 14일 월요일에 문을 엽니다.',
    },
    {
      question: 'Our new library has several remarkable improvements.',
      answer: '우리의 새로운 도서관에 몇몇 주목할 만한 개선 사항이 있습니다.',
    },
    {
      question: 'It now offers a larger and more comfortable space than before, providing a better environment to study and relax in.',
      answer: '도서관은 현재 전보다 더 크고 편안한 공간을 제공하며, 공부하고 쉴 수 있는 더 나은 환경을 선사합니다.',
    },
    {
      question:
        'We’ve also added a brand-new studio where you can have virtual meetings and create live-streaming videos using the most upto-date devices.',
      answer: '저희는 또한 여러분들이 가장 최신의 장비를 이용하여 화상 회의를 하고 생방송 스트리밍 영상을 만들 수 있는 최신 스튜디오도 추가했습니다.',
    },
    {
      question: 'Furthermore, we’ve purchased more than 500 new books.',
      answer: '더 나아가, 저희는 500권 이상의 새 책들을 구매했습니다.',
    },
    {
      question: 'From fiction to non-fiction, we have something for everyone’s taste.',
      answer: '소설부터 논픽션까지, 저희는 모두의 취향에 맞는 것들을 가지고 있습니다.',
    },
    {
      question: 'For more information, please visit the school library website.',
      answer: '더 많은 정보를 원한다면, 학교 도서관 웹사이트를 방문해 주세요.',
    },
    {
      question: 'I hope you’ll come and enjoy some of the school’s new facilities!',
      answer: '학교의 새로운 시설들을 방문하여 즐기길 바랍니다!',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isTranslation isChecked={isOpen} onClick={() => setIsOpen(prev => !prev)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              {index === 1 && (
                <Box padding='4px 0'>
                  <Label value='W' type={'paint'} background='var(--color-blue-100)' />
                </Box>
              )}
              <Box marginLeft={index > 1 ? '51px' : '0px'}>
                <Typography>{value?.question}</Typography>
                <Box height='72px'>
                  <Typography color='var(--color-blue-900)' fontSize='22px' lineHeight='32px'>
                    {isOpen ? value?.answer : ''}
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

export default P04;
