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
      en: 'It’s good to see you, everyone!',
      ko: '반갑습니다, 여러분!',
    },
    {
      en: 'I’m Dr. Edward Wilson, an evolutionary biologist.',
      ko: '저는 진화 생물학자, Edward Wilson 박사입니다.',
    },
    {
      en: 'Thank you for inviting me here today.',
      ko: '오늘 저를 여기에 초대해 주셔서 감사합니다',
    },
    {
      en: 'On my way, I had trouble locating this room.',
      ko: '오늘 저는 여기 오는 길에, 이 방을 찾는 데에 어려움이 있었습니다.',
    },
    {
      en: 'Luckily, a friendly student came up to me and walked me here.',
      ko: '다행히, 친절한 학생 한 분이 저에게 와서 여기까지 바래다 주었습니다.',
    },
    {
      en: 'It’s fascinating how, in situations like this, we want to help someone in need.',
      ko: '이런 상황들 속에 우리가 도움이 필요한 누군가를 도와주려고 하는 방식은 흥미롭습니다.',
    },
    {
      en: 'Now, this raises some interesting questions: where does our friendliness come from, and why is it important?',

      ko: '이제, 이것은 몇 가지 의문이 들게 합니다. 우리의 친절함은 어디에서 오며, 이것이 왜 중요할까요?',
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
