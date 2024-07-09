import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

import usePageData from '@/hooks/usePageData';
import { useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';

import { studentAtom } from '@/stores/student';

import HE02701, { IApiInfo, IImageList } from '@maidt-cntn/pages/HE-027-01';

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
    headerText: 'Listen and Answer',
  };

  const questionText = 'Which form of ice will melt slowest unser the same conditions?';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.mp3',
    captionSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.srt',
  };

  const imageList: IImageList[] = [
    {
      src: '/L03/C02/A03/HE1-L03-C02-A03-01-1.jpg',
      alt: '둥그런 구 형태의 얼음',
      answer: false,
    },
    {
      src: '/L03/C02/A03/HE1-L03-C02-A03-01-2.jpg',
      alt: '각진 육면체 형태의 얼음',
      answer: false,
    },
    {
      src: '/L03/C02/A03/HE1-L03-C02-A03-01-3.jpg',
      alt: '윗면과 아랫면이 하트모양인, 기둥 형태의 얼음',
      answer: true,
    },
  ];

  return <HE02701 apiInfo={apiInfo} headerInfo={headerInfo} questionText={questionText} audioInfo={audioInfo} imageList={imageList} />;
};

export default P01;
