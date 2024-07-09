import { Typography, TMainHeaderInfoTypes, IQuestionProps, EStyleFontSizes } from '@maidt-cntn/ui';
import ME10801, { IdataList } from '@maidt-cntn/pages/ME-108-01';

const P02 = () => {
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
      backgroundImg: '/L03/C09/A02/ME1-L03-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '240px',
          word: ['She'],
        },
        {
          width: '260px',
          word: ['got'],
        },
        {
          width: '300px',
          word: ['the ball.'],
        },
      ],
      audioSrc: ['/L03/C09/A02/ME1-L03-C09-A02-P02-01.mp3'],
      alt: '퍼즐 조각 배경',
    },
    {
      backgroundImg: '/L03/C09/A02/ME1-L03-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '240px',
          word: ['I'],
        },
        {
          width: '260px',
          word: ['did not watch'],
        },
        {
          width: '300px',
          word: ['the game.'],
        },
      ],
      audioSrc: ['/L03/C09/A02/ME1-L03-C09-A02-P02-02.mp3'],
      alt: '퍼즐 조각 배경',
    },
  ];

  const title = <Typography>was/were, -(e)d ~이었다, ~했다</Typography>;
  const tip = <Typography size={EStyleFontSizes['X-MEDIUM']}>did not = didn’t</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} tip={tip} />;
};

export default P02;
