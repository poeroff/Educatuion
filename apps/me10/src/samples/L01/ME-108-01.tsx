import styled from '@emotion/styled';
import { Box, Typography, TMainHeaderInfoTypes, IQuestionProps, SvgIcon, EStyleFontSizes, SimpleAudioPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import backgroundImg1 from '../../assets/example/ME1-L01-C09-A02-P01.jpg';
import tipBox from '../../assets/icon/gift-box.svg';

interface IdataList {
  backgroundImg: string;
  puzzle: IPuzzleData[];
}

interface IPuzzleData {
  width: string;
  word: string[];
}

const ME10801 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Language Use A',
  };

  const questionInfo: IQuestionProps = {
    text: '주황색 퍼즐에 유의하여 문장을 읽어 봅시다.',
  };

  const data: IdataList[] = [
    {
      backgroundImg: backgroundImg1,
      puzzle: [
        {
          width: '252px',
          word: ['I'],
        },
        {
          width: '262px',
          word: ['am', 'am not'],
        },
        {
          width: '276px',
          word: ['nervous.'],
        },
      ],
    },
    {
      backgroundImg: backgroundImg1,
      puzzle: [
        {
          width: '252px',
          word: ['They'],
        },
        {
          width: '262px',
          word: ['are', 'are not'],
        },
        {
          width: '276px',
          word: ['sweet.'],
        },
      ],
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box width='fit-content' padding='10px' border='2px solid var(--color-yellow-600)' borderRadius='32px'>
        <Typography>am/are/is ~이다. ~이 있다.</Typography>
      </Box>
      <Box vAlign='flex-start' flexDirection='column'>
        {data.map((item, index) => (
          <Box vAlign='center' marginTop='12px' key={index}>
            <BackgroundImageBox bckImg={item.backgroundImg}>
              {item.puzzle.map(puzzleItem => (
                <Box width={puzzleItem.width} hAlign='center' flexWrap='wrap' gap='8px'>
                  {puzzleItem.word.map(wordItem => (
                    <Box width='100%' height='60px' hAlign='center'>
                      <Typography>{wordItem}</Typography>
                    </Box>
                  ))}
                </Box>
              ))}
            </BackgroundImageBox>
            <Box padding='10px 0' vAlign='flex-start' flexDirection='column' gap='24px' marginLeft='10px'>
              <SimpleAudioPlayer audioSrc={''} />
              <SimpleAudioPlayer audioSrc={''} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box hAlign='flex-end' marginTop='4px'>
        <Box width='fit-content' padding='4px 10px' border='1px dashed var(--color-grey-500)' borderRadius='16px'>
          <SvgIcon src={tipBox} size='20px' />
          <Typography size={EStyleFontSizes['X-MEDIUM']} weight={'var(--font-weight-bold)'} color='var(--color-blue-800)'>
            Tip
          </Typography>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>are not = aren’t</Typography>
        </Box>
      </Box>
    </Container>
  );
};

const BackgroundImageBox = styled.div<{ bckImg: string }>`
  min-width: 790px;
  min-height: 95px;
  max-height: 130px;
  display: flex;
  ${({ bckImg }) => `background : url(${bckImg})`};
  background-size: cover;
`;

export default ME10801;
