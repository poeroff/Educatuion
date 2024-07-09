import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE02701, { IApiInfo, IImageList } from '@maidt-cntn/pages/HE-027-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useRecoilValue } from 'recoil';

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
    headerText: 'Weather Report: Step 1',
  };

  const questionText = '기상 캐스터의 말을 잘 듣고, 스웨덴 키루나의 현재 날씨를 골라 봅시다.';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A02/ME1-L02-C04-A02.mp3',
    captionSrc: '/L02/C04/A02/ME1-L02-C04-A02.srt',
  };

  const imageList: IImageList[] = [
    {
      src: '/L02/C04/A02/ME1-L02-C04-A02-P01-01.jpg',
      alt: '맑음',
      answer: false,
    },
    {
      src: '/L02/C04/A02/ME1-L02-C04-A02-P01-02.jpg',
      alt: '눈',
      answer: true,
    },
    {
      src: '/L02/C04/A02/ME1-L02-C04-A02-P01-03.jpg',
      alt: '비',
      answer: false,
    },
  ];

  return <HE02701 apiInfo={apiInfo} headerInfo={headerInfo} questionText={questionText} audioInfo={audioInfo} imageList={imageList} />;
};

export default P01;
