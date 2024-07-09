import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

import HE02701, { IApiInfo, IImageList } from '@maidt-cntn/pages/HE-027-01';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';

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

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE1-L01-C02-A03-01.mp3',
    captionSrc: '/L01/C02/A03/HE1-L01-C02-A03-01.srt',
  };

  const imageList: IImageList[] = [
    {
      src: '/L01/C02/A03b/01/HE1-L01-C02-A03b-01-1.jpg',
      alt: '여학생 2명, 남학생 2명이 책상에 둘러 앉아 각자 밝은 표정으로 책을 읽고 있다.',
      answer: false,
    },
    {
      src: '/L01/C02/A03b/01/HE1-L01-C02-A03b-01-2.jpg',
      alt: '여자 리포터가 양복을 입은 남자에게 마이크를 향하며 인터뷰 하고 있다.',
      answer: false,
    },
    {
      src: '/L01/C02/A03b/01/HE1-L01-C02-A03b-01-3.jpg',
      alt: '태블릿을 통해 신문을 읽고 있는 사람의 손만 보이는 모습.',
      answer: true,
    },
  ];

  return (
    <HE02701
      apiInfo={apiInfo}
      audioInfo={audioInfo}
      headerInfo={headerInfo}
      imageList={imageList}
      questionText='What is the girl going to do tomorrow?'
    />
  );
};

export default P01;
