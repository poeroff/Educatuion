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
    question: `Wow! Your new sunglasses look so cool!`,
    answer: `와 ! 새 선글라스가 너무 멋져요 !`,
    color: 'var(--color-blue-100)',
    labelStr: `M`,
  },
  {
    question: `Thanks.`,
    answer: `고마워요 .`,
    color: 'var(--color-yellow-100)',
    labelStr: `W`,
  },
  {
    question: `These are smart sunglasses.`,
    answer: `스마트 선글라스예요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `They’re useful when I exercise or do other activities outside.`,
    answer: `운동할 때나 밖에서 다른 활동을 할 때 유용할 것 같아요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `I’ve never seen smart glasses before.`,
    answer: `스마트 선글라스는 처음 봐요 .`,
    color: 'var(--color-blue-100)',
    labelStr: `M`,
  },
  {
    question: `How do they work?`,
    answer: `어떻게 작동하나요 ?`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `They have built-in Bluetooth headphones and microphones, so you can listen to music and make phone calls.`,
    answer: `블루투스 헤드폰과 마이크가 내장되어 있어서 음악을 듣거나 전화를 걸 수 있어요 .`,
    color: 'var(--color-yellow-100)',
    labelStr: `W`,
  },
  {
    question: `Sounds amazing!`,
    answer: `멋지네요 ! 사용법을 알려주실 수 있나요 ?`,
    color: 'var(--color-blue-100)',
    labelStr: `M`,
  },
  {
    question: `It’s quite simple. `,
    answer: `아주 간단합니다 .`,
    color: 'var(--color-yellow-100)',
    labelStr: `W`,
  },
  {
    question: `You can just press the button on the frame for each function.`,
    answer: `각 기능별로 프레임에 있는 버튼을 누르기만 하면 됩니다 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Also, the arms can be automatically set for a more comfortable fit.`,
    answer: `또한 편안한 착용감을 위해 안경 다리가 자동으로 설정될 수 있습니다 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Really? `,
    answer: `정말요 ?`,
    color: 'var(--color-blue-100)',
    labelStr: `M`,
  },
  {
    question: `Let me try it. `,
    answer: `제가 해볼게요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `Oh!`,
    answer: `오 !`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `The arms are moving!`,
    answer: `팔이 움직이네요 !`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `That’s really cool.`,
    answer: `정말 멋지네요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `There are other kinds of smart glasses with high-tech features, too.`,
    answer: `첨단 기능을 갖춘 다른 종류의 스마트 안경도 있어요 .`,
    color: 'var(--color-yellow-100)',
    labelStr: `W`,
  },
  {
    question: `My glasses don’t have this feature, but some of them can even take 3D photos.`,
    answer: `제 안경에는 이 기능이 없지만 3D 사진도 찍을 수 있는 것도 있어요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Technology is developing so fast!`,
    answer: `기술이 정말 빠르게 발전하고 있네요 !`,
    color: 'var(--color-blue-100)',
    labelStr: `M`,
  },
];

const P04 = () => {
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

export default P04;
