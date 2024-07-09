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
  headerInfo: { headerText: 'Mission 1_Quiz 2' },
  questionInfo: { text: '잘 듣고, 그림에 알맞은 응답을 골라 봅시다.' },
  audioInfo: { audioSrc: '/L01/C01/A08/EE4-L01-C01-A08-P02.mp3' },
  data: [{ text: 'a' }, { text: 'b' }, { text: 'c' }],
  image: {
    src: '/L01/C01/A08/EE4-L01-C01-A08-P02.webp',
    alt: '총 네 개의 장면으로 이루어진 만화로, 첫 번째와 두 번째 장면에는 남자아이 두 명과 여자 아이 한 명이 공원에서 돗자리를 깔고 그 위에서 바나나와 사과를 먹고 있는 모습. 세 번째 장면에는 미끄럼틀을 타고 내려 온 올리가 파란 색 상의를 입은 남자 아이와 인사를 하는 모습. 네 번째 장면에는 올리가 트렘폴린 위에서 뛰고 있는 모습을 세 친구들이 보고 있는 모습',
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
