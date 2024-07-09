import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, ToggleButton, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

interface IListenAndAnswer {
  en: string;
  ko: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Gathering of the Whakapapa (2)',
  headerPattern: 'text',
};

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      ko: '한동안 할아버지는 와카파파라고 불리는 마을 계보를 기록하느라 바빴습니다.',
      en: 'For some time, my grandfather had been busy writing down the village genealogy, known as the whakapapa.',
    },
    {
      ko: '와카파파는 그의 옛 집에 있었습니다.',
      en: 'The whakapapa had been in his old house.',
    },
    {
      ko: '그러나 어느날 밤 불이 났고, 그 불은 집을 휩쓸고 우리의 과거를 파괴했습니다. ',
      en: 'But then came the night of the fire, which ran through the house and destroyed our past.',
    },
    {
      ko: '단 하룻밤 만에 우리가 알고 있던 모든 것이 사라졌습니다.',
      en: 'In only one night, everything we knew was gone.',
    },
    {
      ko: '할아버지 타마는 절망에 빠져 딸인 히라이나 이모네 집에 머물러 갔습니다.',
      en: 'Nani Tama, in despair, went to stay with his daughter, my Auntie Hiraina.',
    },
    {
      ko: '할아버지는 과거의 잿더미에서 벗어날 방법을 찾기 위해 떨리는 손으로 다시 와카파파 마을 계보를 쓰기 시작했습니다.',
      en: 'Trying to f ind a way out of the ashes of the past, Nani began to write the whakapapa again with his shaky hands. ',
    },
    {
      ko: '그는 조상들의 이름을 부르며 과거와 현재를 다시 한 번 연결했습니다.',
      en: 'He chanted the names of the ancestors, joining the past to the present once more.',
    },
    {
      ko: '마을은 조용해졌고 그의 노래를 들었습니다.',
      en: 'The village went quiet and listened to his chanting.',
    },
    {
      ko: '그분의 음성은 우리의 계보를 따라 전달되어 수세기를 거슬러 올라갔습니다.',
      en: 'His voice traveled along the lines of our genealogy, searching back across the centuries.',
    },
    {
      ko: '때로는 기억하기 어려운 대사도 있었습니다.',
      en: 'Sometimes, there were lines that were difficult to remember.',
    },
    {
      ko: '그러다 갑자기 그의 목소리가 노래 중간에 멈췄습니다.',
      en: 'Then his voice suddenly stopped in the middle of the chant.',
    },
    {
      ko: '마을 사람들은 그의 입에서 다음 이름이 튀어나올 때까지 걱정스러운 침묵 속에서 기다렸습니다.',
      en: 'The village waited in worried silence until the next name burst out of his mouth.',
    },
    {
      ko: '타마 할아버지가 대부분의 와카파파를 수집하는 데 거의 2년이 걸렸지만, 채워야 할 이름이 여전히 누락되어 있었습니다.',
      en: 'It took Nani Tama almost two years to gather most of the whakapapa, but there were still missing names he needed to fill in.',
    },
    {
      ko: '이제 그는 일을 마치기 위해 무루파라까지 데려다 주기를 원했습니다.',
      en: 'Now, he wanted me to drive him to Murupara to finish his work.',
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
          row={({ value }) => (
            <BoxWrap boxGap={10}>
              <Box>
                <Typography>{value?.en}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen && value?.ko}
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
