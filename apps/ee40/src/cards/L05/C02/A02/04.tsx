import EEL03C04A02P05, { PageProps } from '@/Pages/EEL03C04A02P05';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '영상을 보고, 잭이 민지의 제안을 거절한 이유를 써 보세요.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 4,
  mainKey: 4,
  subKey: 'TEXT-04',
  videos: {
    videoSrc: '/L05/C02/A02/EE4-L05-C02-A02-P04.mp4',
    srtFile: '/L05/C02/A02/EE4-L05-C02-A02-P04.srt',
    width: 480,
    height: 360,
  },
};

const P04 = () => {
  return <EEL03C04A02P05 {...pageInfo} />;
};

export default P04;
