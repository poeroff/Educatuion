import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C04/A06/pageData';
import EEL01C04A07P01 from '@/Pages/EEL01C04A07P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL01C04A07P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림에 알맞은 낱말을 <보기>에서 골라 영어 노트 위에 쓰고, 그 때에 알맞은 인사를 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C04/A06/EE4-L01-C04-A06-P01.png',
    alt: '해가 떠오르는 그림과 오전 7시를 나타내는 카드',
    title: '해가 떠오르는 그림과 오전 7시를 나타내는 카드',
    width: '404px',
    height: '272px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 0,
    subKey: 'RECORDER-01',
  };

  const audioSrc = '/L01/C04/A07/EE4-L01-C04-A07-P01.mp3';
  const data: IData[] = [{ text: 'evening' }, { text: 'morning' }, { text: 'afternoon' }];

  return (
    <EEL01C04A07P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      audioSrc={audioSrc}
      data={data}
      number='1'
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
