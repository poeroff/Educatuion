import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'A. Listening',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C11/A02/HE2-L01-C11-A02.mp3',
  captionSrc: '/L01/C11/A02/HE2-L01-C11-A02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Hey, Yuna.',
    translation: '안녕, 유나. ',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Do you have any special plans this summer vacation?',
    translation: '이번 여름방학에 특별한 계획이 있니?',
    inLine: true,
  },
  {
    originText: 'Hi, Tom.',
    translation: '안녕, Tom. ',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'I’m actually thinking of working as a volunteer translator.',
    translation: '나는 사실 자원봉사 통역사로 일할 생각이야.',
    inLine: true,
  },
  {
    originText: 'A volunteer translator? ',
    translation: '통역 자원봉사자? ',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'What does that involve?',
    translation: '무슨 일을 하는 건데?',
    inLine: true,
  },
  {
    originText: 'I translate short Korean folk tales into English and then send them to a charity center.',
    translation: '저는 짧은 한국 민담을 영어로 번역해서 자선 센터에 보내.',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'That’s interesting! ',
    translation: '흥미롭네! ',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'What happens after that? ',
    translation: '그 다음엔 뭘 하는데?',
    inLine: true,
  },
  {
    originText: 'Other volunteers translate the stories into different languages. ',
    translation: '다른 자원봉사자들은 이 이야기를 다른 언어로 번역해. ',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'Then, the charity center sends them to children in other countries who don’t have enough books to read.',
    translation: '그리고 나서, 이 자선 센터는 책을 읽을 만큼 충분한 책이 없는 다른 나라의 어린이들에게 이 책들을 보내 줘.',
    inLine: true,
  },
  {
    originText: 'Very nice. ',
    translation: '진짜 좋다. ',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'That sounds quite rewarding. ',
    translation: '정말 보람될 것 같아.',
    inLine: true,
  },
  {
    originText: 'You’ll not only help out the charity but also promote Korean culture.',
    translation: '자선 활동을 도울 뿐만 아니라 한국 문화를 알리는 거잖아.',
    inLine: true,
  },
  {
    originText: 'That’s  right!  ',
    translation: '맞아! ',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'I’m  ready  to  do  something meaningful this summer.',
    translation: '나는 올 여름에도 뭔가 의미 있는 일을 할 준비가 되어 있어. ',
    inLine: true,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
