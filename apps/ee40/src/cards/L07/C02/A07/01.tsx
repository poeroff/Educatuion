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
  audioInfo: { audioSrc: '/L07/C02/A07/EE4-L07-C02-A07-P01.mp3', captionSrc: '/L07/C02/A07/EE4-L07-C02-A07-P01.srt' },
  data: [{ text: 'O' }, { text: 'X' }],
  image: {
    src: '/L07/C02/A07/EE4-L07-C02-A07-P01.png',
    alt: '해가 지고 있는 창 밖 풍경, 7시를 가리키는 시계, 스테이크를 떠올리고 있는 여자가 남자에게 말하는 모습',
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
