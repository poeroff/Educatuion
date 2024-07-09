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

const P04 = () => {
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
      question: 'Hello, students!',
      answer: '안녕하세요, 학생 여러분!',
    },
    {
      question: 'Today, I’d like to share two fascinating inventions inspired by nature.',
      answer: '오늘은 자연에서 영감을 받은 흥미로운 발명품 두 가지를 소개해 드리고자 합니다.',
    },
    {
      question: 'First, have you ever heard of Velcro?',
      answer: '먼저, 벨크로에 대해 들어본 적이 있나요?',
    },
    {
      question: 'It’s a sticky fabric commonly used in clothes and bags.',
      answer: '벨크로는 옷이나 가방에 흔히 사용되는 끈적끈적한 천입니다.',
    },
    {
      question: 'You might wonder how it was invented.',
      answer: '어떻게 발명되었는지 궁금하실 겁니다.',
    },
    {
      question: 'Well, back in the 1940s, a Swiss man took his dog for a walk and noticed plant seeds sticking to his dog’s fur.',
      answer: '1940년대에 스위스의 한 남성이 반려견을 산책시키다가 반려견의 털에 식물 씨앗이 달라붙는 것을 발견했습니다.',
    },
    {
      question: 'This observation led him to design something similar himself, which later became known as Velcro.',
      answer: '이 관찰을 통해 그는 비슷한 것을 직접 디자인하게 되었고, 이것이 나중에 벨크로로 알려지게 되었습니다.',
    },
    {
      question: 'Another creative invention from nature is the shower curtain, inspired by lotus leaves.',
      answer: '연잎에서 영감을 얻은 또 다른 창의적인 자연 발명품은 샤워 커튼입니다.',
    },
    {
      question: 'A lotus leaf can resist water and stay dry, so this feature is widely applied to make waterproof materials.',
      answer: '연잎은 물에 잘 젖지 않고 건조한 상태를 유지할 수 있기 때문에 방수 소재를 만드는 데 널리 활용되고 있습니다.',
    },
    {
      question: 'There are many other nature-inspired inventions to explore.',
      answer: '이 밖에도 자연에서 영감을 받은 발명품이 많이 있습니다.',
    },
    {
      question: 'Now, let’s research them and discover how we can learn from nature to improve our daily lives.',
      answer: '이제 이러한 발명품들을 살펴보며 자연에서 배워 일상생활을 개선할 수 있는 방법을 알아보세요.',
    },
  ];

  const labelColor = (label: string) => {
    if (label === '') return '';
    return label === 'W' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C04/A02/HE1-L03-C04-A02.mp3',
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

export default P04;
