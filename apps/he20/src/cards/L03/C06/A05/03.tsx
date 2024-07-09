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
    headerText: 'From Shadows to Spotlights (3)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Next, we have Maud Lewis, a renowned artist known for her heart-warming paintings.',
      answer: '다음은 따뜻한 그림으로 유명한 예술가 모드 루이스입니다.',
    },
    {
      question: 'Born in a small Canadian town in 1903, Lewis suffered from physical weaknesses such as distorted shoulders and fingers.',
      answer: '1903년 캐나다의 작은 마을에서 태어난 루이스는 어깨와 손가락이 일그러지는 등의 신체적 약점을 가지고 있었습니다.',
    },
    {
      question: 'This limited her mobility and caused her to drop out of school.',
      answer: '이로 인해 거동이 불편해졌고 결국 학교를 학교를 그만두게 되었습니다.',
    },
    {
      question: 'To make a living, she began to paint and sell Christmas cards.',
      answer: '생계를 위해 그녀는 크리스마스 카드를 그려 팔기 시작했습니다.',
    },
    {
      question:
        'When her parents passed away, Lewis went to live with her aunt in Digby, Nova Scotia, where she met her future husband, Everett Lewis.',
      answer: '부모님이 돌아가시고 루이스는 노바스코샤 주 딕비에 있는 이모와 함께 살게 되었고 그곳에서 미래의 남편인 에버렛 루이스를 만났습니다. ',
    },
    {
      question: 'After marrying, the couple spent the rest of their lives there, and Lewis continued to paint.',
      answer: '결혼 후 부부는 남은 여생을 그곳에서 보냈고 그곳에서 여생을 보냈고 루이스는 계속 그림을 그렸습니다.',
    },
    {
      question: 'She often depicted the Digby landscapes in paintings such as Edge of Digby Harbor.',
      answer: '그녀는 종종 Edge of Digby Harbor라는 그림처럼 딕비의 풍경을 묘사했습니다.',
    },
    {
      question: 'Her artwork used a mixture of bright and vivid oil paints and simple forms, generating an original, innovative style.',
      answer: '그녀의 작품에는 밝고 선명한 유화물감과 단순한 형태를 혼합하여 독창적이고 혁신적인 스타일을 만들어 냈습니다.',
    },
    {
      question: 'Although her physical limitations confined her to a small cottage, her talent and imagination were both limitless.',
      answer: '비록신체적 한계로 인해 작은 오두막집에 갇혀 지냈지만, 그녀의 재능과 상상력은 모두 무한했습니다.',
    },
    {
      question:
        'In Red Sleigh, red maple leaves appear on a special winter landscape, and Pair of Oxen shows decorated cows standing in a flower field.',
      answer: "'붉은 썰매'에서는 붉은 단풍잎이 특별한 겨울 풍경에 등장합니다, '한 쌍의 황소'에는 꽃밭에 서 있는 장식된 소가 등장합니다.",
    },
    {
      question: 'With these features, Lewis’ paintings create a magical quality, like that of a fairy tale.',
      answer: '이러한 특징들로 루이스의 그림은 동화 같은 마법 같은 분위기를 자아냅니다.',
    },
    {
      question: '이러한 특징들로 루이스의 그림은 동화 같은 마법 같은 분위기를 자아냅니다.',
      answer: '그녀의 그림이 가 점차 인기를 얻게 되면서 그녀의 이야기는 많은 사람들에게 영감을 주었고 나중에 책과 영화로 만들어졌습니다.',
    },
    {
      question: 'Maud Lewis expressed her love for the world through her paintings and became an iconic figure in Canadian folk art.',
      answer: '모드 루이스는 그림을 통해 세상에 대한 사랑을 표현했고 캐나다 민속 예술의 상징적인 인물이 되었습니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 숨기기' : '해석 보기'}
        />
      </ListHeader>
      <Scroll tabIndex={0} height={'330px'}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value }) => (
            <BoxWrap boxGap={10}>
              <Box>
                <Typography>{value?.question}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen ? value?.answer : ''}
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
