import EEL03C04A02P05, { PageProps } from '@/Pages/EEL03C04A02P05';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '피노키오가 누구라고 대답했는지 낱말로 써 봅시다.',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  videos: {
    videoSrc: '/L03/C04/A02/EE4-L03-C04-A02-P05.mp4',
    srtFile: '/L03/C04/A02/EE4-L03-C04-A02-P05.srt',
    width: 480,
    height: 360,
  },
};

const P05 = () => {
  return <EEL03C04A02P05 {...pageInfo} />;
};

export default P05;
