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
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Before we can fully embrace the era of AI-powered neural implants, many tricky ethical issues should be addressed.',
      answer: '우리가 AI 기반 신경 임플란트 시대를 완전히 받아들이기 전에, 여러 가지 까다로운 윤리적 문제들이 해결되어야 합니다',
    },
    {
      question: 'The integration of AI technology with the human brain raises concerns about what it means to be human.',
      answer: 'AI 기술과 인간의  뇌를 통합하는 것은 인간이라는 게 무엇을 의미하는가에 대한 우려를 제기할 수 있습니다.',
    },
    {
      question: 'Our brains are believed to be central to our identity, existence, and value as human beings.',
      answer: '인간의 두뇌는 인간으로서의 정체성, 존재, 가치의 중심이라고 여겨집니다.',
    },
    {
      question:
        'However, an over-reliance on technology may delay our natural development and create confusion about whether we are human, AI, or something in between.',
      answer:
        '그러나 기술에 대한 지나친 의존은 인간의 자연스러운 발달을 지연시키고 우리가 인간인지, AI인지, 아니면 그 중간인지에 대한 혼란을 야기할 수 있습니다.',
    },
    {
      question: 'Another critical issue is privacy.',
      answer: '또 다른 중요한 문제는 프라이버시입니다.',
    },
    {
      question: 'There’s a risk that organizations or hackers could access personal data without permission through AI-connected implants.',
      answer: '즉, 우리의 생각, 감정, 행동이 해커에 의해 통제될 수 있다는 뜻입니다.',
    },
    {
      question:
        'There’s an additional risk that this technology could lead to even greater social inequality, given that it may not be available to all due to its high cost.',
      answer:
        '또한 이 기술은 높은 비용으로 인해 모든 사람에게 제공되지 않을 수 있다는 점에서 사회적 불평등을 더욱  심화시킬 수 있는 위험도 있습니다.',
    },
    {
      question: 'Such unequal access to the technology could intensify the division between those who can afford the implants and those who cannot.',
      answer: '이러한 기술에 대한 불평등한 접근은 임플란트 비용을 감당할 수 있는 사람과 그렇지 않은 사람 사이의 격차를 심화시킬 수 있습니다.',
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
            <BoxWrap>
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
