import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE02701, { IApiInfo, IImageList } from '@maidt-cntn/pages/HE-027-01';
import { useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';

interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}

const P01 = ({ headerInfo, audioInfo }: IProps) => {
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

  const imageList: IImageList[] = [
    {
      src: '/L01/C02/A03/HE2-L01-C02-A03-01-1.jpg',
      alt: '프라이팬에서 볶아지고 있는 요리',
      answer: false,
    },
    {
      src: '/L01/C02/A03/HE2-L01-C02-A03-01-2.jpg',
      alt: '마이크를 잡고 노래를 하고 있는 모습의 여자',
      answer: true,
    },
    {
      src: '/L01/C02/A03/HE2-L01-C02-A03-01-3.jpg',
      alt: '사람들에게 책을 읽어주는 듯한 모습의 남자',
      answer: false,
    },
  ];

  return (
    <HE02701
      apiInfo={apiInfo}
      audioInfo={audioInfo}
      headerInfo={headerInfo}
      imageList={imageList}
      questionText='What are the speakers going to do together this weekend?'
    />
  );
};

export default P01;
