import { Typography, TMainHeaderInfoTypes, IQuestionProps, EStyleFontSizes } from '@maidt-cntn/ui';
import ME10801, { IdataList } from '@maidt-cntn/pages/ME-108-01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'B',
    iconType: 'languageUse',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주황색 퍼즐에 유의하여 문장을 읽어 봅시다.',
  };

  const data: IdataList[] = [
    {
      backgroundImg: '/L05/C09/A05/ME1-L05-C09-A05-P01.jpg',
      puzzle: [
        {
          width: '140px',
          word: ['You'],
        },
        {
          width: '190px',
          word: ['should'],
        },
        {
          width: '150px',
          word: ['carry'],
        },
        {
          width: '330px',
          word: ['your own water bottle.'],
        },
      ],
      audioSrc: ['/L05/C09/A05/ME1-L05-C09-A05-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L05/C09/A05/ME1-L05-C09-A05-P01.jpg',
      puzzle: [
        {
          width: '140px',
          word: ['We'],
        },
        {
          width: '190px',
          word: ['should not'],
        },
        {
          width: '150px',
          word: ['waste'],
        },
        {
          width: '330px',
          word: ['paper and plastic.'],
        },
      ],
      audioSrc: ['/L05/C09/A05/ME1-L05-C09-A05-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];
  const title = <Typography>should ~해야 한다</Typography>;
  const tip = <Typography size={EStyleFontSizes['X-MEDIUM']}>should not = shouldn’t</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} tip={tip} />;
};

export default P01;
