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
  headerInfo: { headerText: 'Mission 2_Quiz 1' },
  questionInfo: { text: '잘 듣고, 그림과 내용이 일치하면 O, 일치하지 않으면 X 를 골라 봅시다.' },
  audioInfo: { audioSrc: '/L03/C02/A08/EE4-L03-C02-A08-P01.mp3', captionSrc: '/L03/C02/A08/EE4-L03-C02-A08-P01.srt' },
  data: [{ text: 'O' }, { text: 'X' }],
  image: {
    src: '/L03/C02/A08/EE4-L03-C02-A08-P01.png',
    alt: '여자아이와 선생님이 교실 앞에 서 있는 모습이 담겨 있는 액자와 그 액자를 보고 있는 남자아이와 여자아이',
  },
  label: ['답안', '대본', '해석'],
};

const P01 = () => {
  return (
    <EEL01C01A08P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      audioInfo={CONST.audioInfo}
      image={CONST.image}
      data={CONST.data}
      label={CONST.label}
      mainKey={1}
      subKey={'P01'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P01;