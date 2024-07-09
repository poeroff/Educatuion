import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'tellYourStory',
  };

  const questionInfo: IQuestionProps = {
    text: '아래 예시를 보고, 자신의 school survival kit에 넣고 싶은 물건을 생각해 봅시다.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C07/A04/ME1-L01-C07-A04-P01.mp3',
  };

  const imageSrc = '/L01/C07/A04/ME1-L01-C07-A04-P01.jpg';
  const imageAlt = '책가방을 맨 여학생 두 명이 마주 보고 대화를 나누고 있다.';

  return (
    <HE00601
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imageHeight='280px'
      imageWidth='840px'
    />
  );
};

export default P01;
