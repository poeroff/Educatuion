import React, { useState } from 'react';
import { TMainHeaderInfoTypes, Box, List, ListHeader, ToggleButton, Scroll, Typography, EStyleFontSizes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: React.ReactNode;
  answer: React.ReactNode;
}

const P04 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A02/HE1-L01-C04-A02.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Welcome, newcomers!',
      answer: '환영합니다, 신입생 여러분!',
    },
    {
      question: 'I’m Maria, and I’m honored to represent the 2nd grade students here today.',
      answer: '저는 Maria이고, 오늘 이 자리에서 2학년 학생을 대표하게 되어 영광입니다.',
    },
    {
      question: 'I know how all of you must feel — excited yet nervous, just like I was last year.',
      answer: '작년에 제가 그랬던 것처럼, 신나지만 긴장되겠죠.',
    },
    {
      question: 'But don’t worry: high school isn’t that different from middle school, and you’ll adapt well.',
      answer: '하지만 걱정하지 마세요. 고등학교는 중학교와 그렇게 다르지 않고, 여러분은 잘 적응할 거예요.',
    },
    {
      question: 'Here are some tips to make your high school life meaningful.',
      answer: '여기 여러분의 고등학교 생활을 의미 있게 만들어 줄 몇 가지 팁이 있습니다.',
    },
    {
      question: 'First, make new friends who can understand and support you.',
      answer: '첫째, 여러분을 이해하고 지지해 줄 수 있는 새로운 친구들을 만드세요.',
    },
    {
      question: 'They’ll help you feel comfortable and handle tough times more easily.',
      answer: '그들은 여러분이 편안함을 느끼고 힘든 시간을 더 쉽게 버틸 수 있게 도와줄 거예요.',
    },
    {
      question: 'Second, build good relationships with your teachers.',
      answer: '둘째, 선생님들과 좋은 관계를 쌓으세요.',
    },
    {
      question: 'They’ll guide you academically and emotionally.',
      answer: '그들은 학업적으로나 정서적으로 여러분을 지도해 줄 거예요.',
    },
    {
      question: 'Finally, explore various clubs and classes to discover your passion and plan your future.',
      answer: '마지막으로, 여러분의 열정을 발견하고 여러분의 미래를 계획하기 위해 다양한 동아리와 수업을 탐색하세요.',
    },
    {
      question: 'Remember, be sure to try new things as they provide opportunities for your growth.',
      answer: '새로운 것은 여러분의 성장을 위한 기회를 제공하므로 그것들을 꼭 시도해 보는 것을 잊지 마세요.',
    },
    {
      question: 'I hope your high school journey will be filled with amazing experiences.',
      answer: '여러분의 고등학교 여정이 멋진 경험들로 가득하길 바랍니다.',
    },
    {
      question: 'Thank you for listening, and once again, welcome to our high school.',
      answer: '들어 주셔서 감사드리며, 다시 한번 우리 고등학교에 오신 것을 환영합니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <Box>
              <Typography>{value?.question}</Typography>
              <Box height='72px'>
                <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                  {isOpen ? value?.answer : ''}
                </Typography>
              </Box>
            </Box>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default P04;
