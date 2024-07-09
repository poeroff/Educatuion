import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo = {
  text: 'Scripts',
};

const data: IListenAndAnswer[] = [
  {
    label: 'M',
    labelColor: 'var(--color-blue-100)',
    originText: 'Welcome to the National Museum of Korea.',
    translation: '국립중앙박물관에 오신 것을 환영합니다.',
  },
  {
    inLine: true,
    originText: 'We’re glad to have you here today.',
    translation: '오늘 여러분을 만나게 되어 반갑습니다.',
  },
  {
    inLine: true,
    originText:
      'This museum is the perfect place to explore Korean history and culture, with our vast collection of approximately 400,000 cultural heritage pieces.',
    translation: '국립중앙박물관은 약 40만 점의 방대한 문화유산을 소장하고 있어 한국의 역사와 문화를 탐구하기에 완벽한 장소입니다.',
  },
  {
    inLine: true,
    originText: 'These include iconic treasures, such as the gold crown from Silla and the famous white pottery from the Joseon period.',
    translation: '여기에는 신라의 금관과 조선 시대의 유명한 백자와 같은 상징적인 보물이 포함되어 있습니다.',
  },
  {
    inLine: true,
    originText: 'Don’t miss our special exhibition of paintings and sculptures from the Vienna Museum of Art History.',
    translation: '비엔나 미술사 박물관의 회화 및 조각 특별전도 놓치지 마세요.',
  },
  {
    inLine: true,
    originText: 'Visitors who saw this special exhibition said it was a truly stunning and magnificent display.',
    translation: '이 특별전을 본 방문객들은 정말 놀랍고 웅장한 전시라고 입을 모았어요.',
  },
  {
    inLine: true,
    originText: 'Please note that photography is allowed, but you’re not allowed to use flash as it may damage the exhibits.',
    translation: '사진 촬영은 가능하지만 전시품이 손상될 수 있으므로 플래시는 사용할 수 없습니다.',
  },
  {
    inLine: true,
    originText: 'We also ask that any phone calls be made outside for the comfort of other visitors.',
    translation: '또한 다른 관람객의 편의를 위해 전화 통화는 외부에서 해주시기 바랍니다.',
  },
  {
    inLine: true,
    originText: 'We hope you will have an unforgettable time during your visit, engaging with the rich history and culture of Korea.',
    translation: '방문 기간 동안 한국의 풍부한 역사와 문화를 체험하며 잊지 못할 시간을 보내시기 바랍니다.',
  },
  {
    inLine: true,
    originText: 'Enjoy!',
    translation: '즐기세요!',
  },
];

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C04/A02/HE2-L03-C04-A02.mp3',
  captionSrc: '/L03/C04/A02/HE2-L03-C04-A02.srt',
};

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
