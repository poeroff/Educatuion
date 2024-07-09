import { IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A08P01 from '@/Pages/EEL01C01A08P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
  data: { text: string }[];
  image: { src: string; alt: string };
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Mission 2_Quiz 2' },
  questionInfo: { text: '잘 듣고, 그림에 알맞은 응답을 골라 봅시다.' },
  audioInfo: { audioSrc: '/L08/C02/A07/EE4-L08-C02-A07-P02.mp3', captionSrc: '/L08/C02/A07/EE4-L08-C02-A07-P02.srt' },
  data: [{ text: 'a.' }, { text: 'b.' }, { text: 'c.' }],
  image: {
    src: '/L08/C02/A07/EE4-L08-C02-A07-P02.png',
    alt: '2,000원이라고 쓰여 있는 가격표가 달린 우산을 들고 있는 남자아이가 여자와 이야기하고 있는 모습',
  },
  label: ['답안', '대본', '해석'],
};

const P02 = () => {
  return (
    <EEL01C01A08P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      audioInfo={CONST.audioInfo}
      image={CONST.image}
      data={CONST.data}
      label={CONST.label}
      mainKey={2}
      subKey={'P02'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P02;
