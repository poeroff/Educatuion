import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C04/A04/pageData';
import EEL01C04A04P01, { IImageProps, IPageInfo } from '@/Pages/EEL01C04A04P01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '잘 듣고, 그림에 알맞은 응답을 골라 봅시다.',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'NUMBER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C04/A04/EE4-L01-C04-A04-P02.png',
    alt: '낮 시간에 자전거를 끌고 있는 여자아이와 가방을 매고 서 있는 남자아이가 인사하는 모습',
    title: '낮 시간에 자전거를 끌고 있는 여자아이와 가방을 매고 서 있는 남자아이가 인사하는 모습',
    width: '480px',
    height: '394px',
    style: { padding: '90px 0px' },
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A04/EE4-L01-C04-A04-P02.mp3',
    captionSrc: '/L01/C04/A04/EE4-L01-C04-A04-P02.srt',
    // top: -5,
  };

  const data = [
    {
      text: 'a',
    },
    {
      text: 'b',
    },
  ];

  return (
    <EEL01C04A04P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
      audioInfo={audioInfo}
    />
  );
};

export default P02;
