import HE02701, { IApiInfo, IImageList } from '@maidt-cntn/pages/HE-027-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    pageId: 'P01',
    changeData,
    initData,
    pageIds,
    saveData,
    submitDataWithResult,
    userId,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C11/A02/HE1-L04-C11-A02.mp3',
    captionSrc: '/L04/C11/A02/HE1-L04-C11-A02.srt',
  };

  const questionText = '1. Which graph are the speakers looking at?';

  const imageList: IImageList[] = [
    {
      src: '/L04/C11/A02/HE1-L04-C11-A02-01.jpg',
      alt: 'Causes of Global Warming을 나타내는 원 그래프',
      answer: false,
    },
    {
      src: '/L04/C11/A02/HE1-L04-C11-A02-02.jpg',
      alt: 'Sea Surface Temperature을 나타내는 막대 그래프',
      answer: false,
    },
    {
      src: '/L04/C11/A02/HE1-L04-C11-A02-03.jpg',
      alt: 'Average Global Temperature을 나타내는 선 그래프',
      answer: true,
    },
    {
      src: '/L04/C11/A02/HE1-L04-C11-A02-04.jpg',
      alt: 'Top 5 Solutions to Global Warming을 나타내는 역삼각형 그래프',
      answer: false,
    },
  ];
  return <HE02701 apiInfo={apiInfo} headerInfo={headerInfo} audioInfo={audioInfo} questionText={questionText} imageList={imageList} />;
};

export default P01;
