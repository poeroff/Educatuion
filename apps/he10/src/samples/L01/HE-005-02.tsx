import { useState } from 'react';
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
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const HE00502 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'What’s in Your School Survival Kit? (P3)',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Now, what do you want in your school survival kit?',
      answer: '자, 여러분의 학교 생존 키트에는 무엇을 원하시나요?',
    },
    {
      question: 'A mirror!\nI look in the mirror and say, “Just be you!”',
      answer: '거울이요!\n저는 거울을 보고 "그냥 너답게 해!"라고 말해요.',
    },
    {
      question: 'For me, a stress ball.',
      answer: '자, 여러분의 학교 생존 키트에는 무엇을 원하시나요?',
    },
  ];

  const labelStr = (index: number) => {
    if (index % 3 === 1) return 'Mrs. Seo';
    if (index % 3 === 2) return 'Somin';
    return 'Jiwon';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    if (str === 'Mrs. Seo') return 'var(--color-blue-100)';
    if (str === 'Somin') return 'var(--color-yellow-100)';
    return 'var(--color-pink-100)';
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box width='145px' textAlign='center' background={labelColor(index)} height='fit-content' padding='4px 0' borderRadius='8px'>
                <Typography useGap={false} weight='var(--font-weight-bold)'>
                  {labelStr(index)}
                </Typography>
              </Box>
              <Box>
                <Typography useGap={true}>{value?.question}</Typography>
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

export default HE00502;
