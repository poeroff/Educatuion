import { Typography, TMainHeaderInfoTypes, IQuestionProps, EStyleFontSizes } from '@maidt-cntn/ui';
import ME10801, { IdataList } from '@maidt-cntn/pages/ME-108-01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'A',
    iconType: 'languageUse',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주황색 퍼즐에 유의하여 문장을 읽어 봅시다.',
  };

  const data: IdataList[] = [
    {
      backgroundImg: '/L06/C09/A02/ME1-L06-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '150px',
          word: ['I'],
        },
        {
          width: '180px',
          word: ['want'],
        },
        {
          width: '170px',
          word: ['to be'],
        },
        {
          width: '300px',
          word: ['a robot designer.'],
        },
      ],
      audioSrc: ['/L06/C09/A02/ME1-L06-C09-A02-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L06/C09/A02/ME1-L06-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '150px',
          word: ['She'],
        },
        {
          width: '180px',
          word: ['plans'],
        },
        {
          width: '170px',
          word: ['to travel'],
        },
        {
          width: '300px',
          word: ['to Busan.'],
        },
      ],
      audioSrc: ['/L06/C09/A02/ME1-L06-C09-A02-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];

  const title = <Typography>want to＋동사 ~하고 싶다</Typography>;
  const tip = <Typography size={EStyleFontSizes['X-MEDIUM']}>want, plan, hope 다음에는 ‘to+동사’ 형태를 씁니다.</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} tip={tip} />;
};

export default P01;
