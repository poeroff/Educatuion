import { getCorrectData, getDefaultData } from './pageData';
import EEL02C02A02P03 from '@/Pages/EEL02C02A02P03';

const EE04EEL02C02A02P03 = () => {
  const videoInfo = {
    videoSrc: '/L02/C02/A02/EE4-L02-C02-A02-P03.mp4',
    srtFile: '',
    // srtFile: '/L02/C02/A02/EE4-L02-C02-A02-P03.srt',
    width: 448,
    height: 336,
  };

  const inputInfo = [
    {
      text: 'b',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-0',
      answer: 'r',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-1',
      answer: 'o',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-2',
      answer: 't',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-3',
      answer: 'h',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-4',
      answer: 'e',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-5',
      answer: 'r',
    },
  ];

  const answers = getCorrectData(3)[0].inputDatas[0];

  const PageInfo = {
    headerText: 'Story 2',
    questionText: '영상을 보고, 엘라가 카밀라에가 앤디를 누구라고 소개했는지 써 봅시다.',
    mainKeyNum: 1,
    pageNumber: 3,
  };

  return (
    <EEL02C02A02P03
      videoInfo={videoInfo}
      pageInfo={PageInfo}
      inputInfo={inputInfo}
      answerInfo={answers}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default EE04EEL02C02A02P03;
