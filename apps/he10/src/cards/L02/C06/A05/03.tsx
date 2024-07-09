import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, ToggleButton, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (3)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'When I arrived at Auntie’s place, I was shocked to see how thin Nani Tama was.',
      answer: '이모네 집에 도착했을 때 타마 할아버지가 얼마나 말랐는지 보고 충격을 받았습니다.',
    },
    {
      question: '“Look, Nani,” I said. “I’m not taking you anywhere. You could die on me!”',
      answer: '“보세요, 할아버지.” 내가 말했다. “나는 할아버지를 어디로도 데려가지 않을 거예요. 나 때문에 죽을 수도 있어요!”',
    },
    {
      question: 'Nani looked at me in anger.',
      answer: '할아버지는 화난 표정으로 나를 바라보았습니다.',
    },
    {
      question: '“You want me to die here in this room? Looking at these four walls? When the whakapapa is not yet finished?”',
      answer: '“내가 여기 이 방에서 죽기를 바라니? 이 네 개의 벽을 보면서? 와카파파를 마무리하지 못하고?”',
    },
    {
      question: 'The old man held on tightly to the side of the bed and cried out as he stood up.',
      answer: '노인은 침대 옆을 꼭 붙잡고 일어나며 소리쳤습니다.',
    },
    {
      question: 'I could not help but carry him to the car, and we set off with Auntie.',
      answer: '나는 어쩔 수 없이 그를 차로 데려가서 이모와 함께 출발했습니다.',
    },
    {
      question: 'We traveled all night, mostly in silence, listening to Nani chanting in the darkness.',
      answer: '우리는 어둠 속에서 할아버지가 노래하는 노래를 들으며 대부분 침묵 속에서 밤새도록 여행했습니다.',
    },
    {
      question: 'It was strange but wonderful to hear him.',
      answer: '그의 노래를 듣는 것은 이상했지만 훌륭했습니다.',
    },
    {
      question: 'Sometimes, he burst into a song that he had taught Auntie.',
      answer: '때때로 그는 이모에게 가르쳐준 노래를 불러댔습니다.',
    },
    {
      question: 'They sang together, lifting up their voices to send the song flying like a bird through the sky.',
      answer: '그들은 같이 노래하며 그들의 목소리를 새처럼 하늘로 날려보냈습니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
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
