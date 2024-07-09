import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, Label, ToggleButton, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Reading',
};

const questionInfo = {
  text: '해석을 확인해 봅시다.',
};

const data: IListenAndAnswer[] = [
  {
    question: `Tomorrow is the first day of school. `,
    answer: `내일은 학교 첫날이다.`,
  },
  {
    question: `I make my own school survival kit.`,
    answer: `나는 나만의 학교 생존 키트를 만든다.`,
  },
  {
    question: `In my survival kit, I have a tennis ball.  `,
    answer: `나의 생존 키트에는 테니스 공이 있다.`,
  },
  {
    question: `I hold it tightly. `,
    answer: `나는 그것을 꽉 쥔다.`,
  },
  {
    question: `Then I am not nervous anymore. `,
    answer: `그러면 나는 더 이상 긴장되지 않는다.`,
  },
  {
    question: `Also, I have many pens. `,
    answer: `나는 또한 많은 펜을 가지고 있다. `,
  },
  {
    question: `I love colors!`,
    answer: `나는 색깔을 무척 좋아한다!`,
  },
];

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' useExtend>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) =>
            value ? (
              <BoxWrap boxGap={10}>
                <Box>
                  <Label type={'paint'} />
                </Box>
                <Box>
                  <Typography>{value.question}</Typography>
                  <Box height='72px'>
                    <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                      {isOpen ? value.answer : ''}
                    </Typography>
                  </Box>
                </Box>
              </BoxWrap>
            ) : null
          }
        />
      </Scroll>
    </Container>
  );
};

export default P03;
