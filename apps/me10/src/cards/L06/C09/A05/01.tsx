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
      backgroundImg: '/L06/C09/A05/ME1-L06-C09-A05-P01-01.jpg',
      puzzle: [
        {
          width: '170px',
          word: ['When'],
        },
        {
          width: '260px',
          word: ['I was young'],
        },
        {
          width: '490px',
          word: ['I wanted to be an astronaut.'],
        },
      ],
      audioSrc: ['/L06/C09/A05/ME1-L06-C09-A05-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L06/C09/A05/ME1-L06-C09-A05-P01-02.jpg',
      puzzle: [
        {
          width: '420px',
          word: ['What do you want to be'],
        },
        {
          width: '200px',
          word: ['when'],
        },
        {
          width: '300px',
          word: ['you grow up?'],
        },
      ],
      audioSrc: ['/L06/C09/A05/ME1-L06-C09-A05-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];
  const title = <Typography>when ~할 때</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={true} />;
};
export default P01;
