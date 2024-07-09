import EEL03C04A02P05, { PageProps } from '@/Pages/EEL03C04A02P05';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '영상을 보고, 손목시계가 얼마인지 써 봅시다.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 3,
  mainKey: 3,
  subKey: 'TEXT-03',
  videos: {
    videoSrc: '/L08/C02/A02/EE4-L08-C02-A02-P03.mp4',
    srtFile: '/L08/C02/A02/EE4-L08-C02-A02-P03.srt',
    width: 480,
    height: 360,
  },
};

const P03 = () => {
  return <EEL03C04A02P05 {...pageInfo} />;
};

export default P03;
