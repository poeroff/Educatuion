import { useState } from 'react';
import { Box, Scroll, BoxWrap, List, ListHeader, Typography, ToggleButton, EStyleFontSizes, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface ITranslation {
  en: string;
  ko: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Tuning Out: The Science of Noise-Cancellation (3)',
};

const P03 = () => {
  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  const questionInfo = {
    text: 'Translations',
  };

  const contents: ITranslation[] = [
    {
      en: 'The Science Behind Noise-Cancelling Headphones',
      ko: '노이즈 캔슬링 헤드폰의 과학적 원리',
    },
    {
      en: 'Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are microphones and noise-cancelling circuitry.',
      ko: '우리가 음악을 들을 때 헤드폰의 소음 제거 기능에는 상쇄 간섭이 사용됩니다. 헤드폰 내부에는 마이크와 소음 제거 회로가 있습니다.',
    },
    {
      en: 'The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves. ',
      ko: '마이크는 외부 소리를 포착하고 회로는 이를 분석하여 반대 음파를 생성합니다.',
    },
    {
      en: 'For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of -1 and transmit it to the speakers.',
      ko: '예를 들어, 외부 소음 값이 +1이면 회로는 -1의 반대 소음을 생성하여 스피커로 전송합니다.',
    },
    {
      en: 'This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume.',
      ko: '시끄러운 주변 환경에서도 원하지 않는 소리를 상쇄시켜 볼륨을 높이지 않고도 음악 사운드를 또렷하게 들을 수 있습니다.',
    },
    {
      en: 'However, it is not easy to entirely eliminate external noise with this technology.',
      ko: '하지만 이 기술로 외부 소음을 완전히 제거하는 것은 쉽지 않습니다.',
    },
    {
      en: 'To achieve full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones.',
      ko: '완전한 소음 제거를 달성하려면 회로는 소음을 디지털 데이터로 변환하고 소음이 마이크에 도달하는 즉시 반대 소리를 스피커로 전송해야 합니다.',
    },
    {
      en: 'Therefore, this noise-cancellation technology is effective for predictable sounds like those of car engines and subways that occur regularly or over a period of time.',
      ko: '따라서 이 소음 제거 기술은 자동차 엔진 소리, 지하철 소리 등 예측 가능한 소리가 규칙적으로 또는 일정 기간에 걸쳐 발생하는 경우에 효과적입니다.',
    },
    {
      en: 'However, it’s relatively less effective for inconsistent sounds such as those of people talking close to you.',
      ko: '하지만 가까이에서 대화하는 사람들의 소리와 같이 일관되지 않은 소리에는 상대적으로 덜 효과적입니다.',
    },
  ];

  const handleClickToggle = () => {
    setIsTranslated(!isTranslated);
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='1'
          isChecked={isTranslated}
          onClick={handleClickToggle}
          isTranslation
          width={64}
          height={32}
          buttonSize={25}
          clickedLeft={33}
        />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<ITranslation>
          data={contents}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box>
                <Typography>{value?.en}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isTranslated && value?.ko}
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
