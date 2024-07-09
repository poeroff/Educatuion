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
  PinchZoom,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const HE04001 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'When he pointed to the cup with the food, the dogs found it easily.',
      answer: '그가 먹이가 있는 컵을 가리키자 개들은 쉽게 찾아냈습니다.',
    },
    {
      question: 'The wolves, however, struggled and chose cups at random, paying no attention to his gestures.',
      answer: '하지만 늑대들은 그의 제스처에 전혀 관심을 기울이지 않고 아무 컵이나 골라 먹었습니다.',
    },
    {
      question: 'Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves.',
      answer: 'Hare 박사는 개가 인간의 몸짓을 읽을 수 있는 능력 덕분에 늑대보다 더 나은 성과를 낼 수 있었다고 결론지었습니다.',
    },
    {
      question: 'He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness.',
      answer: '그는 개는 늑대와 달리 인간과의 의사소통 능력과 친근감을 발달시켜 왔다고 설명했습니다.',
    },
    {
      question: 'This explanation sounds reasonable according to several evolutionary biologists.',
      answer: '이 설명은 여러 진화 생물학자에 따르면 합리적으로 들립니다.',
    },
    {
      question:
        'They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves.',
      answer: '그들은 이 두 종의 공통 조상에서 인간에게 우호적으로 행동한 종은 개로 진화했고, 그렇지 않은 종은 늑대로 진화했다고 말합니다.',
    },
    {
      question:
        'Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.',
      answer: '또한 Hare 박사는 개의 친근한 성격이 늑대보다 개체 수가 더 많이 늘어날 수 있는 생존 이점을 제공했을 것이라고 제안했습니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <BoxWrap useFull>
        <Box useFull maxWidth='340px' vAlign='center'>
          <PinchZoom>
            <Image size='100%' src={'/example/HE1-L01-SP03-1-P07.jpg'} />
            <Box type='hidden'>
              개와 늑대 사진 아래 각각의 설명이 적힌 인포그래픽 Dogs vs Wolves (Case 1) Dogs followed Dr. Hare's Gestures 화살표 found the cup with
              the food easily Wolves pain no attention to his gestures 화살표 struggled and chose cups radomly
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull marginTop='4px'>
          <Scroll height='420px' tabIndex={0}>
            <List<IListenAndAnswer>
              data={data}
              row={({ value }) => (
                <Box background='white' useRound paddingBottom='28px'>
                  <Typography color='var(--color-grey-900)'>{value?.question}</Typography>
                  <Box height='72px'>
                    <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                      {isOpen ? value?.answer : ''}
                    </Typography>
                  </Box>
                </Box>
              )}
            />
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE04001;
