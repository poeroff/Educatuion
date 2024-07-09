import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, Label, ToggleButton, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Hey, Tom! Guess what? We’re going on a class trip to the Amazing Theme Park!',
      answer: '안녕, Tom! 그거 알아? 우리 Amazing 테마파크로 반별 여행을 갈 계획이래!',
    },
    {
      question: 'Seriously? That’s fantastic! When’s the trip?',
      answer: '정말이야? 그거 멋진 걸! 여행은 언제래?',
    },
    {
      question: 'Next month, right after the mid-terms.',
      answer: '다음 달, 중간고사 끝난 직후래.',
    },
    {
      question: 'Nice! That’ll be the perfect way to treat ourselves after our exams. How can we make the most of our time there with our friends?',
      answer:
        '좋아! 시험이 끝나고 스스로에게 보상을 해 줄 완벽한 방법이 될 거야. 어떻게 하면 우리가 친구들과 함께 그곳에서의 시간을 최대한 즐길 수 있을까?',
    },
    {
      question: 'We should definitely try riding the roller coaster and check out all the other rides there.',
      answer: '우리는 꼭 롤러코스터를 타 봐야 하고 그곳에 있는 다른 놀이기구들도 다 타 봐야 해.',
    },
    {
      question: 'For sure! Plus, the park is famous for its delicious snacks. Let’s try some of them, too!',
      answer: '좋아! 게다가, 그 테마파크는 맛있는 간식으로 유명해. 간식도 좀 먹어보자!',
    },
    {
      question: 'Of course! And how about taking a class photo for the memories before we leave?',
      answer: '물론이지! 그리고 떠나기 전에 추억을 위해 반 사진을 찍는 게 어때?',
    },
    {
      question: 'You’re ready to go already! I hope we all can have fun together at the park!',
      answer: '벌써 준비됐네! 우리 모두 공원에서 즐겁게 놀았으면 좋겠어!',
    },
  ];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'B' : 'G';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'G' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' audioInfo={{ audioSrc: '/L01/C11/A02/HE1-L01-C11-A02.mp3' }}>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box padding='4px 0'>
                <Label value={labelStr(index)} type={'paint'} background={labelColor(index)} />
              </Box>
              <Box>
                <Typography>{value?.question}</Typography>
                <Box height='72px'>
                  {isOpen && (
                    <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                      {value?.answer}
                    </Typography>
                  )}
                </Box>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Scroll>
    </Container>
  );
};

export default P03;
