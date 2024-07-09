import { Box, Label, SvgIcon, Typography } from '@maidt-cntn/ui';
import Style from './BingoGame.style';
import star from '../../../assets/icons/bingo_star.svg';

interface Bingo {
  title: { chapter: string; chapterName: string }[];
  bingoColorData: string[];
  onClickBingo: (index: number) => void;
}

export const BingoGame = ({ title, bingoColorData, onClickBingo }: Bingo) => {
  return (
    <Box height='100%' width='calc(50% + 168px)' display='flex'>
      <Box paddingTop='42px' display='grid' gridTemplateRows='repeat(3, 1fr)' minWidth='156px' marginRight='12px'>
        {title.map((value, index) => (
          <Box key={index} hAlign='center' flexDirection='column'>
            <Typography
              usePre
              align='center'
              fontSize='var(--font-size-20)'
              weight='var(--font-weight-bold)'
              lineHeight='30px'
              color='var(--color-h-math-yellow-strong)'
            >
              {value.chapter}
            </Typography>
            <Typography
              usePre
              align='center'
              fontSize='var(--font-size-24)'
              weight='var(--font-weight-bold)'
              lineHeight='30px'
              color='var(--color-h-math-yellow-strong)'
            >
              {value.chapterName}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box useFull>
        <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' height='42px'>
          <Style.StarWrap title='별 한개'>
            <SvgIcon src={star} size='18px' />
          </Style.StarWrap>
          <Style.StarWrap title='별 두개'>
            <SvgIcon src={star} size='18px' />
            <SvgIcon src={star} size='18px' />
          </Style.StarWrap>
          <Style.StarWrap title='별 세개'>
            <SvgIcon src={star} size='18px' />
            <SvgIcon src={star} size='18px' />
            <SvgIcon src={star} size='18px' />
          </Style.StarWrap>
        </Box>
        <Style.BingoWrap>
          {Array(9)
            .fill(null)
            .map((__, index) => (
              <Style.BingoBox key={index} type='button' onClick={() => onClickBingo(index)} backgroundColor={bingoColorData[index]}>
                <Label value={index + 1} color='var(--color-white)' lineColor='var(--color-white)' />
              </Style.BingoBox>
            ))}
        </Style.BingoWrap>
      </Box>
    </Box>
  );
};

export default BingoGame;
