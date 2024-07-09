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
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'In our competitive society, many people believe that only the biggest or the strongest can survive and thrive.',
      answer: '경쟁이 치열한 사회에서 많은 사람들은 가장 크거나 가장 강한 사람만이 살아남고 성공할 수 있다고 믿습니다.',
    },
    {
      question: 'However, I propose an alternative view: kindness is the key to success.',
      answer: '하지만 저는 친절이 성공의 열쇠라는 대안이 되는 관점을 제안합니다. ',
    },
    {
      question: 'Isn’t that a comforting thought?',
      answer: '그것 참 위안이 되는 생각 아닌가요? ',
    },
    {
      question: 'We can use the power of our natural kindness to communicate and cooperate with different individuals.',
      answer: '우리는 타고난 친절함의 힘을 이용해 다양한 사람들과 소통하고 협력할 수 있습니다.',
    },
    {
      question: 'We can all benefit from this instead of trying to be better than others.',
      answer: '다른 사람보다 더 나은 사람이 되려고 노력하는 대신 이를 통해 우리 모두가 이익을 얻을 수 있습니다.',
    },
    {
      question: 'I’d like to end this talk with a message.',
      answer: '이 강연을 마무리하며 한 가지 메시지를 전하고 싶습니다.',
    },
    {
      question: 'Think of our society as a bouquet.',
      answer: '우리 사회를 하나의 꽃다발이라고 생각하세요.',
    },
    {
      question:
        'Just as each flower adds to the beauty when it harmonizes with the others, each person can contribute to a more beautiful world when they cooperate.',
      answer: '각각의 꽃이 다른 꽃과 조화를 이룰 때 아름다움을 더하듯 , 한 사람 한 사람이 협력할 때 더 아름다운 세상을 만들 수 있습니다.',
    },
    {
      question: 'By being kind and working together, we can truly flourish.',
      answer: '서로 친절하고 협력할 때 우리는 진정으로 번영할 수 있습니다.',
    },
    {
      question: 'Thank you for your attention.',
      answer: '관심을 가져주셔서 감사합니다.',
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
                <Typography>{value?.question}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} size={EStyleFontSizes['X-MEDIUM']}>
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
