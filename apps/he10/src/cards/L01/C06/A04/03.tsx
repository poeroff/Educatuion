import { useState } from 'react';
import { Box, Scroll, List, ListHeader, Typography, ToggleButton, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { IHeaderInfo } from './index';

interface ITranslation {
  en: string;
  ko: string;
}

const P03 = ({ headerInfo }: IHeaderInfo) => {
  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  const questionInfo = {
    text: 'Translations',
  };

  const contents: ITranslation[] = [
    {
      en: 'To answer these questions, I’d like to tell you about my childhood companion dog, Sparky. ',
      ko: '이러한 질문에 답하기 위해 제 어린 시절 반려견인 Sparky에 대한 이야기를 들려드리고자 합니다. ',
    },
    {
      en: 'When we played with a ball, I noticed that he responded well to my gestures. ',
      ko: '우리가 공을 가지고 놀 때 저는 제 반려견이 제 제스처에 잘 반응하는 것을 알아챘습니다. ',
    },
    {
      en: 'The responsive behavior of dogs also caught the attention of an evolutionary anthropologist, Brian Hare. ',
      ko: '개들의 이런 반응하는 행동은 진화 인류학자인 Brian Hare 의 관심도 끌었습니다. ',
    },
    {
      en: 'He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor. ',
      ko: '그는 같은 조상을 공유하는 늑대와 비교하여 개가 인간의 제스처에 어떻게 반응하는지 알아보기 위해 실험을 진행했습니다. ',
    },
    {
      en: 'He placed two cups on the ground with food hidden under only one of them. ',
      ko: '그는 두 개의 컵을 바닥에 놓고 그 중 하나에만 먹이를 숨겼습니다. ',
    },
    {
      en: 'When he pointed to the cup with the food, the dogs found it easily. ',
      ko: '그가 먹이가 있는 컵을 가리키자 개들은 쉽게 먹이를 찾았습니다. ',
    },
    {
      en: 'The wolves, however, struggled and chose cups at random, paying no attention to his gestures. ',
      ko: '하지만 늑대들은 그의 제스처에 전혀 관심을 기울이지 않고 아무 컵이나 골라 먹었습니다. ',
    },
    {
      en: 'Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves. ',
      ko: 'Hare 박사는 개가 인간의 몸짓을 읽을 수 있는 능력 덕분에 늑대보다 더 나은 성과를 낼 수 있었다고 결론지었습니다. ',
    },
    {
      en: 'He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness. ',
      ko: '그는 개는 늑대와 달리 인간과의 의사소통 능력과 친근감을 발달시켜 왔다고 설명했습니다. ',
    },
    {
      en: 'This explanation sounds reasonable according to several evolutionary biologists. ',
      ko: '이 설명은 여러 진화 생물학자에 따르면 합리적으로 들립니다. ',
    },
    {
      en: 'They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves. ',
      ko: '그들은 이 두 종의 공통 조상에서 인간에게 우호적으로 행동한 종은 개로 진화했고, 그렇지 않은 종은 늑대로 진화했다고 말합니다. ',
    },
    {
      en: 'Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.',
      ko: '또한 Hare 박사는 개의 친근한 성격이 늑대보다 개체 수가 더 많이 늘어날 수 있는 생존 이점을 제공했을 것이라고 제안했습니다.',
    },
  ];

  const handleClickToggle = () => {
    setIsTranslated(!isTranslated);
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='1'
          isChecked={isTranslated}
          onClick={handleClickToggle}
          isTranslation
          width={64}
          height={32}
          buttonSize={25}
          clickedLeft={33}
        />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<ITranslation>
          data={contents}
          row={({ value, index = 1 }) => (
            <Box key={index}>
              <Typography>{value?.en}</Typography>
              <Box height='72px' paddingTop={4}>
                <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                  {isTranslated && value?.ko}
                </Typography>
              </Box>
            </Box>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default P03;
