import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, Label, ToggleButton, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-02.mp3',
};

const data: IListenAndAnswer[] = [
  {
    question: `Congratulations on winning the dance competition, Jiho. You must be really proud of yourself.`,
    answer: `춤 경연대회에서 우승한 것을 축하해, Jiho. 정말 자랑스럽겠다.`,
  },
  {
    question: `Thank you so much, Jessie. I still can’t believe we did it.`,
    answer: `정말 고마워, Jessie. 우리가 해냈다는 것이 아직도 믿기지 않아.`,
  },
  {
    question: `Your team deserved to win. It was amazing to see all five of you dancing in harmony like that.`,
    answer: `너희 팀은 우승할 만했어. 너희 다섯 명 모두 그렇게 화합을 이루어 춤추는 것을 본 게 놀라웠어.`,
  },
  {
    question: `It wasn’t easy. We must have done that same routine a hundred times.`,
    answer: `쉽지 않았어. 우리는 그 똑같은 루틴을 백 번은 했을 거야.`,
  },
  {
    question: `A hundred! Now I understand why the performance was perfect.`,
    answer: `백 번이나! 왜 그 공연이 완벽했는지 이제 알겠어.`,
  },
  {
    question: `Without my other team members, I could never have done so well. They were so awesome. And I’m so grateful for their help and support.`,
    answer: `다른 팀원들이 없었으면, 나는 그렇게 잘 해내지 못했을 거야. 그들은 정말 대단했어. 그리고 나는 그들의 도움과 지지에 정말 고마워하고 있어.`,
  },
  {
    question: `That’s nice of you to say. I know exactly how you feel. Do you remember when I organized the school festival last year? The student council members helped me in a similar way.`,
    answer: `그렇게 말해주니 좋다. 네가 어떤 기분일지 나도 잘 알아. 내가 작년에 학교 축제를 준비했을 때를 기억해? 학생회 일원들이 나를 비슷한 방법으로 도와줬어.`,
  },
  {
    question: `Oh, yes, I remember.`,
    answer: `오 맞아, 나 기억나.`,
  },
  {
    question: `We had a lot of things to do, but all the members were such a good team, and really friendly, too. It was very demanding but ultimately a rewarding experience.`,
    answer: `할 일이 많았지만, 모든 멤버들이 정말 좋은 팀이고 정말 친절했어. 진짜 힘들었지만 궁극적으로는 보람찬 경험이었지.`,
  },
  {
    question: `We were both pretty lucky to be part of such a good team.`,
    answer: `우리 둘 다 좋은 팀의 일원이 된 게 정말 행운이었어.`,
  },
  {
    question: `You’re absolutely right.`,
    answer: `정말 네 말이 맞아.`,
  },
];
const P04 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'B' : 'G';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'G' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

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
        />
      </Scroll>
    </Container>
  );
};

export default P04;
