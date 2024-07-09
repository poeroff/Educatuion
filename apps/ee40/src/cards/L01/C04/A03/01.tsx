import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const EE40L01C04A03P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Act Out',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: ' ‘오즈의 마법사‘ 영상을 다시 한번 봅시다.',
  };

  const videoInfo = {
    videoSrc: '/L01/C04/A03/EE4-L01-C04-A03-P01.mp4',
    srtFile: '',
    width: '684px',
    height: '363px',
    // srtFile: '/L01/C04/A03/EE4-L01-C04-A02-P02.srt',
  };

  return <EEL01C01A04P02 headerInfo={headerInfo} questionInfo={questionInfo} videoInfo={videoInfo} />;
};

export default EE40L01C04A03P01;
