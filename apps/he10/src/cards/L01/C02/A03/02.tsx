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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'What is the girl going to do tomorrow?',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE1-L01-C02-A03-01.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Emma, what are you doing?',
      answer: 'Emma, 뭐 하고 있니?',
    },
    {
      question: 'Hi, Dad. I’m checking the school website for details about a club I want to sign up for.',
      answer: '안녕하세요, 아빠. 저는 제가 등록하고 싶은 동아리에 대한 세부 사항을 위해 학교 사이트를 확인하고 있어요.',
    },
    {
      question: 'Sounds good. Which club do you want to join?',
      answer: '좋은데. 어떤 동아리에 가입하고 싶니?',
    },
    {
      question: 'I’m thinking of joining the debate club. I’ve been interested in some social issues lately. ',
      answer: '저는 토론 동아리에 가입할 생각이에요. 최근에 몇몇 사회 문제들에 관심이 생겼어요.',
    },
    {
      question: 'That sounds like a good choice for you.',
      answer: '너에게 좋은 선택인 것 같구나.',
    },
    {
      question: 'I know. I hope I can share my opinions with new friends.',
      answer: '맞아요. 새로운 친구들과 제 의견을 공유할 수 있으면 좋겠어요.',
    },
    {
      question: 'I see. How do you join the club? Do you need to interview for it?',
      answer: '그렇구나. 동아리에 어떻게 가입하니? 면접을 봐야 하니?',
    },
    {
      question:
        'Yes, everyone that applies is going to be interviewed next Friday. Starting tomorrow, I’m going to read some recent news articles to prepare.',
      answer: '네, 지원한 사람은 모두 다음 주 금요일에 면접을 볼 예정이에요. 내일부터 저는 최근 뉴스 기사를 읽으며 준비할 거예요.',
    },
    {
      question: 'I’m so proud of you, Emma. Good luck!',
      answer: '정말 자랑스럽구나, Emma. 행운을 빈다!',
    },
  ];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'G' : 'M';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'M' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box padding={'4px 0px'}>
                <Label value={labelStr(index)} type={'paint'} background={labelColor(index)} />
              </Box>
              <Box>
                <Typography style={{ display: 'inline-block' }}>{value?.question}</Typography>
                <Box height='72px'>
                  <Typography fontSize='22px' lineHeight='32px' color='var(--color-blue-900)'>
                    {isOpen ? value?.answer : ''}
                  </Typography>
                </Box>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Scroll>
    </Container>
  );
};

export default P02;
