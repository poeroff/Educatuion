import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL02C03A06P01 from '@/Pages/EEL02C03A06P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL02C03A06P01';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 2',
  };

  const questionInfo: IQuestionProps = {
    text: '그림에 알맞은 낱말을 보기에서 골라 써 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L02/C03/A06/EE4-L02-C03-A06-P04.JPG',
    alt: '긴 머리를 묶은 채 양 손을 턱에 괴고 버스 안에서 창 밖을 보며 미소 짓고 있는 여자 아이',
    title: '긴 머리를 묶은 채 양 손을 턱에 괴고 버스 안에서 창 밖을 보며 미소 짓고 있는 여자 아이',
    width: '480px',
    height: '234px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 4,
    mainKey: 4,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [{ text: 'sister' }, { text: 'mom' }, { text: 'dad' }, { text: 'brother' }];

  return (
    <EEL02C03A06P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P04;
