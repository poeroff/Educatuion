import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, Label, ToggleButton, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
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
  audioSrc: '/L03/C02/A03/HE2-L03-C02-A03-02.mp3',
  captionSrc: '/L03/C02/A03/HE2-L03-C02-A03-02.srt',
};

const data: IListenAndAnswer[] = [
  {
    question: `Hey, Daniel.`,
    answer: `안녕하세요 , 다니엘 .`,
    label: 'W',
    color: 'var(--color-blue-100)',
  },
  {
    question: `How was your tour of Gyeongbok Palace?`,
    answer: `경복궁 투어는 어땠나요 ?`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `It was amazing!`,
    answer: `놀라웠어요 !`,
    label: 'M',
    color: 'var(--color-yellow-100)',
  },
  {
    question: `I was completely captivated by the traditional Korean-style coloring of the buildings.`,
    answer: `한국 전통 스타일의 건물 색채에 완전히 매료되었어요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `The color combinations were so beautiful.`,
    answer: `색의 조합이 정말 아름다웠어요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Ah, you’re talking about dancheong, right?`,
    answer: `아 , 단청 얘기하시는 거 맞죠 ?`,
    label: 'W',
    color: 'var(--color-blue-100)',
  },
  {
    question: `The pattern uses blue, white, red, black, and yellow colors in combination.`,
    answer: `파란색 , 흰색 , 빨간색 , 검은색 , 노란색을 조합한 문양이에요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `Yes, exactly!`,
    answer: `네 , 맞아요 !`,
    label: 'M',
    color: 'var(--color-yellow-100)',
  },
  {
    question: `The guide explained that dancheong is not only used for decoration but also protects the buildings from bad weather and insects.`,
    answer: `단청은 장식용뿐만 아니라 악천후와 벌레로부터 건물을 보호하는 역할도 한다고 가이드가 설명해줬어요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `I thought that was really interesting.`,
    answer: `정말 흥미로웠어요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `I’m glad you enjoyed it.`,
    answer: `재미있게 보셨다니 다행이네요 .`,
    label: 'W',
    color: 'var(--color-blue-100)',
  },
  {
    question: `Did you also see the changing of the guard ceremony?`,
    answer: `수문장 교대식도 보셨나요 ?`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `I did.`,
    answer: `네 , 봤어요 .`,
    label: 'M',
    color: 'var(--color-yellow-100)',
  },
  {
    question: `It was really fascinating to see the guards dressed in traditional clothes.`,
    answer: `전통 의상을 입은 근위병들을 보니 정말 흥미로웠어요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `It reminded me of a similar ceremony at Buckingham Palace.`,
    answer: `버킹엄 궁전의 비슷한 의식이 생각났어요 .`,
    color: 'var(--color-yellow-100)',
  },
  {
    question: `Oh, right.`,
    answer: `아 , 그렇군요 .`,
    label: 'W',
    color: 'var(--color-blue-100)',
  },
  {
    question: `I’ve heard the U.K. has a similar event as well.`,
    answer: `영국에서도 비슷한 행사가 있다고 들었어요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `I hope I can go and see it someday. `,
    answer: `언젠가 꼭 가보고 싶네요 .`,
    color: 'var(--color-blue-100)',
  },
  {
    question: `I’m sure you won’t be disappointed.`,
    answer: `아마 실망하지 않으실 거예요 .`,
    label: 'M',
    color: 'var(--color-yellow-100)',
  },
  {
    question: `So, what are your plans for the rest of your time in Korea?`,
    answer: `남은 한국에서의 계획은 어떻게 되나요 ?`,
    label: 'W',
    color: 'var(--color-blue-100)',
  },
  {
    question: `I really liked Gyeongbok Palace, so I’m thinking about going to see some other Korean palaces.`,
    answer: `경복궁을 정말 좋아해서 다른 한국의 궁궐도 가볼까 생각 중이에요 .`,
    label: 'M',
    color: 'var(--color-yellow-100)',
  },
  {
    question: `That sounds like a great idea.`,
    answer: `좋은 생각이네요 .`,
    label: 'W',
    color: 'var(--color-blue-100)',
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

export default P04;
