import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const CONST = {
  headerInfo: { headerText: 'Play Together 2' },
  questionInfo: { text: '영상을 보며 때에 따라 인사말이 다른 나라들을 알아 봅시다.' },
  videoInfo: {
    videoSrc: '/L01/C02/A07/EE4-L01-C02-A07-P01.mp4',
    srtFile: '/L01/C02/A07/EE4-L01-C02-A07-P01.srt',
    height: '394px',
  },
};

const P01 = () => {
  return <EEL01C01A04P02 headerInfo={CONST.headerInfo} questionInfo={CONST.questionInfo} videoInfo={CONST.videoInfo} />;
};

export default P01;
