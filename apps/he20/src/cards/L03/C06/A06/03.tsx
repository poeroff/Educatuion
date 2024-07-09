import {
  Scroll,
  Typography,
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  ListHeader,
  ToggleButton,
  List,
  BoxWrap,
  EStyleFontSizes,
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
    headerText: 'From Shadows to Spotlights (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Now let’s take a look at the final artist of this exhibition: Anna Ancher, a famous painter from Denmark.',
      answer: '이제 이번 전시회의 마지막 작가를 살펴보겠습니다: 안나 앵커 덴마크 출신의 유명한 화가입니다.',
    },
    {
      question: 'When observing her paintings, you may notice a common theme—they all feature female figures.',
      answer: '그녀의 그림을 보면 모두 여성 인물이 등장한다는 공통점을 발견할 수 있습니다.',
    },
    {
      question: 'Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school.',
      answer: '출생지 1859년 덴마크 스카겐에서 태어난 그녀는 나중에 코펜하겐으로 이주하여 사립 회화 학교에 다녔습니다.',
    },
    {
      question: 'After that, she even studied abroad in Paris, which was unusual for women at the time.',
      answer: '그 후 파리로 유학을 떠나기도 했습니다, 당시 여성으로서는 드문 일이었죠.',
    },
    {
      question: 'Thanks to her mother’s encouragement, she was able to take advantage of these opportunities.',
      answer: '어머니의 덕분에 그녀는 이러한 기회를 활용할 수 있었습니다',
    },
    {
      question:
        'Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on household duties.',
      answer: '기혼 여성은 집안일에만 집중해야 한다는 사회적 압력에 반대하면서 앵커는 결혼 후에도 그림 그리기를 계속했습니다.',
    },
    {
      question: 'Ancher differed from other artists of that era, who depicted women as still life subjects.',
      answer: '앵커는 여성을 정물화 소재로 묘사했던 당시의 다른 예술가들과는 달랐습니다.',
    },
    {
      question:
        'In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing Fisherman’s Wife.',
      answer: `이와는 대조적으로, '부엌의 하녀'와 '어부의 아내'에서 보여지듯 그녀는 그들을 일상적인 일의 적극적 참여자로 나타냈습니다.`,
    },
    {
      question: 'She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark.',
      answer: '또한 그녀는 빛과 색채를 능숙하게 탐구하여 덴마크의 풍부한 인상주의 운동에 기여했습니다.',
    },
    {
      question: 'In her painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed.',
      answer: `그녀의 작품 '푸른 방의 햇빛'에서는 푸른 벽에 반사되는 햇빛이 아름답게 묘사되어 있습니다.`,
    },
    {
      question: 'Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent.',
      answer: '20세기 여성의 전통적인 역할에 도전한 앤더슨은 20세기에 여성의 전통적인 역할에 도전하고 뛰어난 예술적 재능을 보여주었습니다.',
    },
    {
      question: 'Her paintings continue to amaze us to this day.',
      answer: '그녀의 그림은 오늘날까지도 우리를 놀라게 합니다.',
    },
    {
      question: 'Thank you for joining this guided tour, and I hope my explanations have aided you in appreciating these paintings.',
      answer: '이 가이드 투어에 참여해 주셔서 감사드리며, 제 설명이 이 그림들을 감상하는 데 그림을 감상하는 데 도움이 되었기를 바랍니다.',
    },
    {
      question: 'Please take some time to further explore the exhibition.',
      answer: '잠시 시간을 내어 전시회를 둘러보세요.',
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
