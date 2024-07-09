import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, Label, ToggleButton, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
  color: string;
  labelStr?: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C02/A03/HE2-L04-C02-A03-01.mp3',
};

const data: IListenAndAnswer[] = [
  {
    question: `Grandpa!`,
    answer: `할아버지 !`,
    color: 'var(--color-blue-100)',
    labelStr: `G`,
  },
  {
    question: `I heard you’re going to Italy next week! `,
    answer: `다음 주에 이탈리아에 가신다고 들었어요 !`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `Yes, I’m so excited, but I’m worried about ordering food.`,
    answer: `그렇단다 , 너무 기대되는데 음식 주문이 걱정이구나 .`,
    color: 'var(--color-yellow-100)',
    labelStr: `M`,
  },
  {
    question: `What if the menu is written only in Italian?`,
    answer: `메뉴가 이탈리아어로만 쓰여 있으면 어떡하지 ?`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Don’t worry, Grandpa.`,
    answer: `걱정 마세요 , 할아버지 .`,
    color: 'var(--color-blue-100)',
    labelStr: `G`,
  },
  {
    question: `I’ll download a photo translator application on your phone.`,
    answer: `제가 휴대폰에 사진 번역기 앱을 다운로드해 드릴게요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `A photo translator?`,
    answer: `사진 번역기 ?`,
    color: 'var(--color-yellow-100)',
    labelStr: `M`,
  },
  {
    question: `What’s that?`,
    answer: `그게 뭔데 ?`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `When you take a picture of text you don’t understand, the app tells you what it means in English.`,
    answer: `모르는 문자를 사진으로 찍으면 앱이 영어로 그 의미를 알려줘요 .`,
    color: 'var(--color-blue-100)',
    labelStr: `G`,
  },
  {
    question: `That would be wonderful!`,
    answer: `멋지구나 !`,
    color: 'var(--color-yellow-100)',
    labelStr: `M`,
  },
  {
    question: `Can you show me how to do that?`,
    answer: `어떻게 하는지 알려줄 수 있니 ?`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Okay.`,
    answer: `알았어요 .`,
    color: 'var(--color-blue-100)',
    labelStr: `G`,
  },
  {
    question: `Let’s translate the Italian title of this book.`,
    answer: `이 책의 이탈리아어 제목을 번역해 볼게요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `First, open the app, press the camera button here, and just wait . `,
    answer: `먼저 앱을 열고 여기 카메라 버튼을 누른 다음 기다리세요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `Look!`,
    answer: `보세요 !`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `It’s translated like this.`,
    answer: `이렇게 번역됐어요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `Wow, this is cool!`,
    answer: `와 , 멋지구나 !`,
    color: 'var(--color-yellow-100)',
    labelStr: `M`,
  },
  {
    question: `Thank you, dear.`,
    answer: `고맙다 .`,
    color: 'var(--color-yellow-100)',
  },
];

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} vAlign='flex-start' useExtend>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              {value?.labelStr ? (
                <Box padding={'4px 0px'}>
                  <Label value={value?.labelStr ? value.labelStr : null} type={'paint'} background={value?.color} />
                </Box>
              ) : (
                <Box marginRight={51}></Box>
              )}
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

export default P02;
