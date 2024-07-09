import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

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

  const questionText = 'Which book is the girl going to borrow?';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.mp3',
    captionSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.srt',
  };

  const imageList: IImageList[] = [
    {
      src: '/L02/C02/A03/HE1-L02-C02-A03-01-1.jpg',
      alt: '분홍빛 하늘, 어두운 건물들, UFO 그림들과 Space Invasion이라는 제목이 표시된 책의 표지',
      answer: false,
    },
    {
      src: '/L02/C02/A03/HE1-L02-C02-A03-01-2.jpg',
      alt: '빨간색 배경에 빨간색과 파란색 건물들과 Lost Cites라는 제목이 표시된 책의 표지',
      answer: false,
    },
    {
      src: '/L02/C02/A03/HE1-L02-C02-A03-01-3.jpg',
      alt: '황량한 배경에 우주복을 입은 사람의 뒷모습과 The Martian’s Return 이라는 제목이 표시된 책의 표지',
      answer: true,
    },
  ];

  return <HE02701 apiInfo={apiInfo} headerInfo={headerInfo} questionText={questionText} audioInfo={audioInfo} imageList={imageList} />;
};

export default P01;
