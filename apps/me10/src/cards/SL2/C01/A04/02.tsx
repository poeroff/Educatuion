import { useState } from 'react';
import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, ToggleButton, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (1)',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Once upon a time, there was a king with big donkey ears.',
      answer: '옛날 옛적에, 커다란 당나귀 귀를 가진 왕이 있었어요.',
    },
    {
      question: 'He always hid his ears.',
      answer: '그는 언제나 자신의 귀를 숨겼어요.',
    },
    {
      question: 'It was a big secret.',
      answer: '그것은 큰 비밀이었어요.',
    },
    {
      question: 'Every month, the king got a haircut.',
      answer: '매달, 왕은 이발을 했어요.',
    },
    {
      question: 'After his haircut, he always sent the barber to prison.',
      answer: '이발이 끝난 후에, 그는 언제나 이발사를 감옥에 보냈어요.',
    },
    {
      question: 'Then one day, a young barber came to the palace.',
      answer: '그러던 어느 날, 한 젊은 이발사가 궁전에 왔어요.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <BoxWrap boxGap={10}>
          <Box width='145px' textAlign='center' height='fit-content' padding='4px 0' borderRadius='8px'>
            <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-grey-700)'>
              Narrator
            </Typography>
          </Box>
          <List<IListenAndAnswer>
            data={data}
            row={({ value }) => (
              <Box>
                <Typography useGap={true}>{value?.question}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen && value?.answer}
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </BoxWrap>
      </Scroll>
    </Container>
  );
};

export default P02;
