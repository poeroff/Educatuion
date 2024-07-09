import EEL03C04A02P05, { PageProps } from '@/Pages/EEL03C04A02P05';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '영상을 보고, 수호가 올리에게 ‘Don’t go, Please’라고 말한 이유를 써 보세요.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 3,
  mainKey: 3,
  subKey: 'TEXT-03',
  videos: {
    videoSrc: '/L04/C02/A02/EE4-L04-C02-A02-P03.mp4',
    srtFile: '/L04/C02/A02/EE4-L04-C02-A02-P03.srt',
    width: 480,
    height: 340,
  },
};

const P03 = () => {
  return <EEL03C04A02P05 {...pageInfo} />;
};

export default P03;
