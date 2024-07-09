import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/ME1-L01-C02-A03-P02.mp3',
    captionSrc: '/L01/C02/A03/ME1-L01-C02-A03-P02.srt',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Hi, Minjun.',
      translation: '안녕, 민준아.',
    },
    {
      label: 'B1',
      labelColor: 'var(--color-orange-200)',
      originText: 'Hi, Kelly. This is my twin brother Hajun.',
      translation: '안녕, Kelly. 이 아이는 내 쌍둥이 동생 하준이야.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Hi, Hajun. I’m Kelly. Nice to meet you.',
      translation: '안녕, 하준아. 나는 Kelly야. 만나서 반가워.',
    },
    {
      label: 'B2',
      labelColor: 'var(--color-green-200)',
      originText: 'Nice to meet you, too.',
      translation: '나도 만나서 반가워.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Do we all go to the same school?',
      translation: '우리 모두 같은 학교에 다니는 거지?',
    },
    {
      label: 'B1',
      labelColor: 'var(--color-orange-200)',
      originText: 'Yes, we do. Let’s have a great year.',
      translation: '그래, 맞아. 멋진 한 해 보내자.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
