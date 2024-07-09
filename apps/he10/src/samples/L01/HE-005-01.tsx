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

const HE00501 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Emma, what are you doing?',
      answer: 'Emma, 무엇을 하고있니?',
    },
    {
      question: 'Hi, Dad. I’m checking the school website for details abouta club I want to sign up for.',
      answer: '안녕하세요, 아빠. 저는 제가 등록하고 싶은 동아리에 대한 세부 사항을 위해 학교 사이트를 확인하고 있어요.',
    },
    {
      question: 'Sounds good. Which club do you want to join?',
      answer: '좋네. 어떤 동아리에 가입하고 싶니?',
    },
    {
      question: 'I’m thinking of joining the debate club. I’ve been interested in some social issues lately.',
      answer: '저는 토론 동아리에 가입하려고 해요. 최근에 제가 몇몇 사회적 문제들에 관심이 있었어요.',
    },
    {
      question: 'That sounds like a good choice for you.​',
      answer: '너에게 좋은 선택인 것 같구나.​',
    },
    {
      question: 'I know. I hope I can share my opinions with new friends.',
      answer: '맞아요. 저는 새로운 친구들과 제 의견을 공유할 수 있으면 좋겠어요.​',
    },
    {
      question: 'I see. How do you join the club? Do you need to interview for it?',
      answer: '맞아요. 저는 새로운 친구들과 제 의견을 공유할 수 있으면 좋겠어요.​',
    },
  ];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'G' : 'M';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'M' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/example/sample_audio.mp3',
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

export default HE00501;
