import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  ListHeader,
  Typography,
  ToggleButton,
  EStyleFontSizes,
  IQuestionProps,
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
    headerText: 'Volunteering at an Animal Sanctuary (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'July 31, Wednesday',
      answer: '7 월 31 일 수요일',
    },
    {
      question: 'This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant.',
      answer: '오늘 아침 우리는 나이든 코끼리 , Molly 덕분에 동물의 치료에 대해 배울 수 있는 기회를 가질 수 있었다 .',
    },
    {
      question: 'After spending 25 years carrying tourists along rough roads, she developed a twisted spine and foot pain.',
      answer: '거친 길에서 25 년간 관광객을 실어나른 Molly 는 등뼈가 쉬고 발에 통증이 있었다 .',
    },
    {
      question:
        'In order to support Jane in taking care of Molly’s foot, we took part in positive reinforcement training, which involves using rewards to encourage desirable behaviors.',
      answer:
        'Molly 의 발을 치료하는 Jane 을 돕기 위해서 우리는 Molly 의 바람직한 행동을 강화하는 데 보상을 사용하는 긍정행동 강화 훈련에 참여했다 .',
    },
    {
      question: 'When I gently touched her foot with a pole and called out, “foot,” she lifted it.',
      answer: '내가 막대기로 Molly 의 발을 부드럽게 만지면서 “발”이라고 얘기하면 Molly가 발을 들어 올린다 .',
    },
    {
      question: 'We then rewarded her with a sweet piece of watermelon, her favorite fruit.',
      answer: '그러면 우리가 Molly 가 가장 좋아하는 과일인 수박 한조각을 보상으로 주는 것이다 .',
    },
    {
      question:
        'This training helps reduce the stress that animals experience during controlled situations, such as treatment or a health examination.',
      answer: '이런 훈련을 동물이 동물 치료가 검사와 같이 통제된 상황속에서도 스트레스를 줄여 주는 것을 도와준다 .',
    },
    {
      question: 'The good news is Molly seems to be adapting well, and I expect her to get better soon.',
      answer: '좋은 소식은 Molly 가 잘 적응하는 것처럼 보이고 나는 Molly 가 곧 나아질 것을 기대한다 .',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
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
