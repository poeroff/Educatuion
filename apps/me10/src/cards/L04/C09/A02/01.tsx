import { Typography, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
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
      backgroundImg: '/L04/C09/A02/ME1-L04-C09-A02-P01-01.jpg',
      puzzle: [
        {
          width: '340px',
          word: ['Taking family photos'],
        },
        {
          width: '300px',
          word: ['is'],
        },
        {
          width: '280px',
          word: ['fun.'],
        },
      ],
      audioSrc: ['/L04/C09/A02/ME1-L04-C09-A02-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L04/C09/A02/ME1-L04-C09-A02-P01-02.jpg',
      puzzle: [
        {
          width: '340px',
          word: ['Dad and I'],
        },
        {
          width: '300px',
          word: ['enjoyed riding'],
        },
        {
          width: '280px',
          word: ['on the train.'],
        },
      ],
      audioSrc: ['/L04/C09/A02/ME1-L04-C09-A02-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];
  const title = <Typography>동사 + -ing ~하는 것 / ~하기</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={true} />;
};
export default P01;
