import { Typography, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
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
      backgroundImg: '/L07/C09/A05/ME1-L07-C09-A05-P01.jpg',
      puzzle: [
        {
          width: '240px',
          word: ['The Sahara is'],
        },
        {
          width: '290px',
          word: ['the largest'],
        },
        {
          width: '200px',
          word: ['hot desert'],
        },
        {
          width: '190px',
          word: ['in the world.'],
        },
      ],
      audioSrc: ['/L07/C09/A05/ME1-L07-C09-A05-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L07/C09/A05/ME1-L07-C09-A05-P01.jpg',
      puzzle: [
        {
          width: '240px',
          word: ['This is'],
        },
        {
          width: '290px',
          word: ['the most difficult'],
        },
        {
          width: '200px',
          word: ['question'],
        },
        {
          width: '190px',
          word: ['of all.'],
        },
      ],
      audioSrc: ['/L07/C09/A05/ME1-L07-C09-A05-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];
  const title = <Typography>the -est / the most ~ 가장 ~한</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={true} />;
};
export default P01;
