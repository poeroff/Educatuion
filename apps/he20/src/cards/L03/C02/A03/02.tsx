import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, Label, ToggleButton, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: React.ReactNode;
  answer: string;
  color: string;
  label?: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C02/A03/HE2-L03-C02-A03-01.mp3',
  captionSrc: '/L03/C02/A03/HE2-L03-C02-A03-01.srt',
};

const data: IListenAndAnswer[] = [
  {
    question: `Hey, Mina.`,
    answer: `안녕 , 미나야 .`,
    color: 'var(--color-blue-100)',
    label: 'B',
  },
  {
    question: `Have you seen that latest comedy movie starring George Nicholson?`,
    answer: `George Nicholson 주연의 최신 코미디 영화 봤어 ?`,
    color: 'var(--color-blue-100)',
  },
  {
    question: (
      <>
        Yeah,{' '}
        <Typography useGap={false} fontStyle='italic'>
          Man in Dark.
        </Typography>
      </>
    ),
    answer: `응 , <Man in Dark> .`,
    color: 'var(--color-yellow-100)',
    label: 'G',
  },
  {
    question: `I saw it yesterday.`,
    answer: `어제 봤어 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Oh, good!`,
    answer: `잘 됐다 !`,
    color: 'var(--color-blue-100)',
    label: 'B',
  },
  {
    question: `How did you like it?`,
    answer: `어땠어 ?`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `It was so funny.`,
    answer: `너무 재밌었어 .`,
    color: 'var(--color-yellow-100)',
    label: 'G',
  },
  {
    question: `I laughed from the start to the very end.`,
    answer: `처음부터 끝까지 웃었어 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `I was really impressed by George Nicholson’s performance.`,
    answer: `George Nicholson 의 연기가 정말 인상적이었어 . `,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `I agree!`,
    answer: `동감이야 !`,
    color: 'var(--color-blue-100)',
    label: 'B',
  },
  {
    question: `I think comedy acting is very difficult, but he did a great job.`,
    answer: `코미디 연기는 정말 어렵다고 생각하는데 그 사람은 정말 잘했어 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `Absolutely!`,
    answer: `맞아 !`,
    color: 'var(--color-yellow-100)',
    label: 'G',
  },
  {
    question: `I’m even thinking about going to see it again.`,
    answer: `다시 보러 갈까 생각 중이야 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Hmm, I don’t like watching the same movie twice, but I definitely want to see more movies with that actor.`,
    answer: `같은 영화를 두 번 보는 건 별로 안 좋아하는데 , 그 배우가 나오는 영화는 꼭 더 보고 싶어 .`,
    color: 'var(--color-blue-100)',
    label: 'B',
  },
  {
    question: (
      <>
        Well, in that case, you should watch{' '}
        <Typography useGap={false} fontStyle='italic'>
          Comedy King
        </Typography>
        , one of his earlier movies from before he was famous.
      </>
    ),
    answer: `그렇다면 그 배우가 유명해지기 전의 영화 중 하나인 <Comedy King> 을 봐야겠네 .`,
    color: 'var(--color-yellow-100)',
    label: 'G',
  },
  {
    question: `Nice, I’ll watch it.`,
    answer: `좋아 , 꼭 봐야겠다 .`,
    color: 'var(--color-blue-100)',
    label: 'B',
  },
  {
    question: `Thanks!`,
    answer: `고마워 !`,
    color: 'var(--color-blue-100)',
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
          gap={10}
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              {value?.label ? (
                <Box padding={'4px 0px'}>
                  <Label value={value?.label ? value.label : null} type={'paint'} background={value?.color} />
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
