import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C04A05P01 from '@/Pages/EEL01C04A05P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
  data: { text: (string | null)[]; mainKey: number; subKey: string }[];
  image: { src: string; alt: string; title: string; mainKey: number; subKey: string }[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Review 2' },
  questionInfo: { text: '단어를 잘 듣고, 빈칸에 들어갈 알파벳을 적은 후 알맞은 그림을 골라 봅시다.' },
  audioInfo: {
    audioSrc: '/L01/C04/A05/EE4-L01-C04-A05-P01.mp3',
    captionSrc: `
  1
00:00:00,000 --> 00:00:30,000
How are you, Suho?
`,
  },
  data: [
    /*
    { text: [null, 'p', 'p', 'l', 'e'], mainKey: 1, subKey: ['TEXT-1', null, null, null, null] },
    { text: ['c', null, 't'], mainKey: 2, subKey: [null, 'TEXT-1', null] },
    { text: [null, 'n', 't'], mainKey: 3, subKey: ['TEXT-1', null, null] },
    */
    { text: [null, 'p', 'p', 'l', 'e'], mainKey: 1, subKey: 'TEXT-1' },
    { text: ['c', null, 't'], mainKey: 2, subKey: 'TEXT-1' },
    { text: [null, 'n', 't'], mainKey: 3, subKey: 'TEXT-1' },
  ],
  image: [
    { mainKey: 1, subKey: 'LINE-1', src: '/L01/C04/A05/EE4-L01-C04-A05-P01-02.png', alt: '고양이 한 마리', title: '고양이 한 마리' },
    { mainKey: 2, subKey: 'LINE-1', src: '/L01/C04/A05/EE4-L01-C04-A05-P01-01.png', alt: '사과 한 개', title: '사과 한 개' },
    { mainKey: 3, subKey: 'LINE-1', src: '/L01/C04/A05/EE4-L01-C04-A05-P01-03.png', alt: '개미 한 마리', title: '개미 한마리' },
  ],
};

const P01 = () => {
  return (
    <EEL01C04A05P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      audioInfo={CONST.audioInfo}
      mainKey={1}
      image={CONST.image}
      data={CONST.data}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P01;
