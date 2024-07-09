import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  ListHeader,
  Typography,
  Label,
  ToggleButton,
  IAudioPlayerProps,
  EStyleFontSizes,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  type: 'text',
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-01.mp3',
};

const data: IListenAndAnswer[] = [
  {
    question: `Andy, you look upset. What’s bothering you?`,
    answer: `Andy, 화가 나 보이네. 왜 그러니?`,
  },
  {
    question: `Hi, Mom. You know, I’ve been working on that group project with Brian, but I’ve been having some problems.`,
    answer: `안녕, 엄마. Brian이랑 모둠 프로젝트를 하고 있는데 문제가 좀 생겼어요.`,
  },
  {
    question: `Oh, no. I thought you would enjoy working with your best friend. What kind of problems?`,
    answer: `어머. 어쩌니. 난 네가 제일 친한 친구와 함께 하는 걸 좋아할 줄 알았는데. 어떤 문제인데?`,
  },
  {
    question: `I thought we were getting along, but he’s not really doing his fair share. We have to hand in our project in two days, 	but he hasn’t finished his work. I’m really stressed out.`,
    answer: `전 저희가 잘 하고 있다고 생각했는데 Brian이 제 몫을 제대로 하지 않아요. 이틀 안에 프로젝트를 제출해야 하는데 아직 작업을 끝내지 않았어요. 정말 스트레스가 심해요.`,
  },
  {
    question: `I understand how you feel. Why don’t you tell him about your concern instead of worrying about it too much?`,
    answer: `어떤 기분인지 이해해. 너무 걱정만 하지 말고 친구에게 고민을 털어놓는 건 어떨까?`,
  },
  {
    question: `I don’t want our friendship to be affected.`,
    answer: `우리 우정에 영향을 미치고 싶지 않아요.`,
  },
  {
    question: `You and Brian have known each other for a long time. I’m sure he’ll understand how you feel.`,
    answer: `너와 Brian은 오랫동안 알고 지낸 사이잖아. Brian도 네 마음을 이해해줄 거야.`,
  },
  {
    question: `Hmm, I hope so. I guess I’ll give it a try.`,
    answer: `음, 저도 그럼 좋겠어요. 한 번 시도해 볼게요.`,
  },
];

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'B' : 'W';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'W' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box padding={'4px 0px'}>
                <Label value={labelStr(index)} type={'paint'} background={labelColor(index)} />
              </Box>
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
        </List>
      </Scroll>
    </Container>
  );
};

export default P02;
