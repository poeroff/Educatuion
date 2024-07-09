import { getCorrectData, getDefaultData } from './pageData';
import EEL03C02A02P03 from '@/Pages/EEL03C02A02P03';

const P03 = () => {
  const videoInfo = {
    videoSrc: '/L03/C02/A02/EE4-L03-C02-A02-P03.mp4',
    srtFile: '/L03/C02/A02/EE4-L03-C02-A02-P03.srt',
    width: 448,
    height: 336,
  };

  const inputInfo = [
    {
      text: 'd',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-0',
      answer: 'o',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-1',
      answer: 'g',
    },
  ];

  const answers = getCorrectData(1)[0].inputDatas[0];

  const PageInfo = {
    headerText: 'Story 2',
    questionText: '영상을 보고, 수호와 엘라가 좋아하는 것이 무엇인지 써 봅시다.',
    mainKeyNum: 3,
    pageNumber: 3,
  };

  return (
    <EEL03C02A02P03
      videoInfo={videoInfo}
      pageInfo={PageInfo}
      inputInfo={inputInfo}
      answerInfo={answers}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P03;
