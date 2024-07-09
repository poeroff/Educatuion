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
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (3)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'The success of AI-powered neural implants in health care is also expected to spread to other industries.',
      answer: '의료 분야에서 AI 기반 신경 임플란트의 성공은 다른 산업 분야로도 확산될것으로 예상됩니다.',
    },
    {
      question:
        'Some futurists predict that these implants will become commercially available in the next 20 to 30 years and significantly change our daily lives.',
      answer: '일부 미래학자들은 이러한 임플란트가 향후20~30년 내에 상용화되어 우리의 일상을 크게 변화시킬것이라고 예측합니다.',
    },
    {
      question: 'For example, advances in neural implant technology will make it possible to install in our brains software that can read our minds.',
      answer: '예를 들어, 신경임플란트 기술의 발전으로 우리의 마음을 읽을 수 있는 소프트웨어를 뇌에 설치하는 것이 가능해질 것입니다.',
    },
    {
      question: 'This could enable us to play games, type social media messages, and stream music simply by thinking.',
      answer: '이렇게 되면 생각만으로 게임을 하고, 소셜미디어 메시지를 입력하고, 음악을 스트리밍할 수 있게 될것입니다.',
    },
    {
      question: 'Such devices would allow us to capture and enhance memories, and even upload and download them using the digital cloud.',
      answer: '이러한 장치를 사용하면 기억을 캡처하고 강화할 수 있으며, 디지털 클라우드를 사용하여 업로드 및 다운로드할 수도 있습니다.',
    },
    {
      question:
        'We could look through our memories like a social media feed, vividly recall our favorite life moments, share memories with others, and back up our most valuable memories.',
      answer:
        '우리는 소셜 미디어 피드처럼 기억을 살펴보고, 인생에서 가장 좋았던순간을 생생하게 회상하고, 다른 사람들과 기억을 공유하고, 가장 소중한 기억을 백업할 수 있을 것입니다.',
    },
    {
      question: 'Finally, AI-powered neural implants would revolutionize the way our brains work.',
      answer: '마지막으로, AI 기반 신경 임플란트는 우리 뇌의 작동 방식에 혁명을 일으킬것입니다.',
    },
    {
      question:
        'The role of the brain would shift from learning and storing information to processing the vast amounts of data provided by the implants.',
      answer: '뇌의 역할이 정보를 학습하고 저장하는 것에서 임플란트가 제공하는 방대한 양의 데이터를 처리하는 것으로 바뀌게 될것입니다.',
    },
    {
      question:
        'Instead of simply memorizing information, we would be able to download knowledge, use our creativity to interpret it, and generate new ideas.',
      answer:
        '우리는 단순히 정보를 암기하는 대신 지식을 다운로드하고, 창의력을 발휘하여 그 지식을 해석하고, 새로운 아이디어를 창출할 수 있게 될것입니다.',
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
