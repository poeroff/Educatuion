import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  ListHeader,
  Scroll,
  TMainHeaderInfoTypes,
  ToggleButton,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerPattern: 'icon',
  iconType: 'listenAndChoose',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C02/A05/ME1-L01-C02-A05-P02.mp3',
  captionSrc: '/L01/C02/A05/ME1-L01-C02-A05-P02.srt',
};

const data: IListenAndAnswer[] = [
  {
    question: `Mira, do you like music?`,
    answer: `Mira, 너는 음악을 좋아하니?`,
  },
  {
    question: `Yes, I do. K-pop is my favorite music. Do you like music, too?`,
    answer: `응, 좋아해. K-pop이 가장 좋아. 너도 음악을 좋아하니?`,
  },
  {
    question: `No, I don’t. I like sports. My favorite sport is baseball.`,
    answer: `아니, 그렇지 않아. 나는 운동을 좋아해. 가장 좋아하는 운동은 야구야.`,
  },
  {
    question: `Cool!`,
    answer: `멋진데!`,
  },
];

const labelStr = (index: number) => {
  return index % 2 === 0 ? 'G' : 'B';
};

const labelColor = (index: number) => {
  const str = labelStr(index);
  return str === 'B' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
};

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' useExtend audioInfo={audioInfo}>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box padding='4px 0'>
                <Label value={labelStr(index)} type={'paint'} background={labelColor(index)} />
              </Box>
              <Box>
                <Typography>{value?.question}</Typography>
                <Box height='72px'>
                  {isOpen && (
                    <Typography fontSize='22px' lineHeight='32px' color='var(--color-blue-900)'>
                      {value?.answer}
                    </Typography>
                  )}
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
