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
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

interface IListenAndAnswer {
  label?: string;
  question: string;
  answer: string;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'W',
      question: 'Welcome, listeners.',
      answer: '청취자 여러분, 환영합니다.',
    },
    {
      question: 'Thanks for tuning in to Everybook Show!',
      answer: 'Everybook Show를 청취해 주셔서 감사합니다!',
    },
    {
      question: 'Today, we have Simon Brown, the author of the best-selling book Aloha, My Dear Friend.',
      answer: '오늘은 베스트셀러 <알로하, 나의 친애하는 친구>의 저자 Simon Brown과 함께합니다.',
    },
    {
      question: 'Hi, Simon.',
      answer: '안녕하세요, Simon.',
    },
    {
      label: 'M',
      question: 'Hi and thank you for inviting me.',
      answer: '안녕하세요, 초대해 주셔서 감사합니다.',
    },
    {
      question: 'I’m really excited to be here.',
      answer: '여기 오게 되어 정말 기쁩니다.',
    },
    {
      label: 'W',
      question: 'Can you tell our listeners a little about your book?',
      answer: '청취자들에게 책에 대해 조금 소개해 주시겠어요?',
    },
    {
      label: 'M',
      question: 'Sure.',
      answer: '물론이죠.',
    },
    {
      question: 'Aloha, My Dear Friend is a heart-warming story about a friendship between a Native Hawaiian girl and an Asian American boy.',
      answer: '알로하, 내 사랑하는 친구는 하와이 원주민 소녀와 아시아계 미국인 소년의 우정에 관한 따뜻한 이야기입니다.',
    },
    {
      question: 'It shows how they build a strong bond and overcome their cultural differences.',
      answer: '두 사람이 어떻게 강한 유대감을 형성하고 문화적 차이를 극복하는지 보여줍니다.',
    },
    {
      label: 'W',
      question: 'That sounds interesting.',
      answer: '흥미로운 이야기네요.',
    },
    {
      question: 'It seems that you’ve written many books about your culture, I mean, Native Hawaiian culture.',
      answer: '하와이 원주민 문화에 관한 책을 많이 쓰신 것 같은데요.',
    },
    {
      label: 'M',
      question: 'Yes, I have.',
      answer: '네, 그렇습니다.',
    },
    {
      question:
        'I’ve been interested in writing about my culture for a long time because some people have deep misunderstandings about Native Hawaiian traditions, and I want to share the true beauty of the culture through my books.',
      answer:
        '하와이 원주민 전통에 대해 깊은 오해를 가지고 있는 사람들이 있어서 오랫동안 제 문화에 대한 글을 쓰고 싶었고, 제 책을 통해 그 문화의 진정한 아름다움을 공유하고 싶었습니다.',
    },
    {
      label: 'W',
      question: 'I can feel your passion and love for your culture.',
      answer: '하와이 문화에 대한 열정과 사랑이 느껴집니다.',
    },
    {
      question: 'Is there any particular message you would like to give to your readers?',
      answer: '독자들에게 특별히 전하고 싶은 메시지가 있나요?',
    },
    {
      label: 'M',
      question: 'I’d like to ask people to make sure to respect other cultures as well as their own.',
      answer: '사람들에게 자기 문화뿐만 아니라 다른 문화도 존중해 달라고 부탁하고 싶어요.',
    },
    {
      label: 'W',
      question: 'That’s an important message to remember.',
      answer: '기억해야 할 중요한 메시지입니다.',
    },
    {
      question: 'Next up, we’ll hear more from Simon Brown after a short break.',
      answer: '잠시 휴식 후 Simon Brown 씨의 이야기를 더 들어보겠습니다.',
    },
    {
      question: 'Stay tuned!',
      answer: '기대해 주세요!',
    },
  ];

  const labelColor = (label: string) => {
    if (label === '') return '';
    return label === 'W' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A02/HE1-L02-C04-A02.mp3',
    captionSrc: '',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box>
                <Label value={value?.label} type={'paint'} background={labelColor(value?.label || '')} />
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
