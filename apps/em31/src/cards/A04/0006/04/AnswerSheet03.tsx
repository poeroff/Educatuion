import { Box, Typography, ETagLine, Tag, Image } from '@maidt-cntn/ui';

const AnswerSheet03 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>1, 2, 1, 9, 2</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>
            - 32는 <Image10 />
            3개와 <Image1 />
            2개로 나타낼 수 있고, 32x6은 <Image10 />
            3개와 <Image1 />
            2개를 6번 놓아야합니다.
          </Typography>
          <Typography>
            - 32x6은 <Image1 />이 2x6=12(개)이고, <Image10 />이 3x6=18(개)입니다.
          </Typography>
          <Typography>
            - <Image1 />은 1을 나타내므로 <Image1 /> 12개는 12이고, <Image10 />은 10을 나타내므로 <Image10 />
            18개는 180입니다.
          </Typography>
          <Typography>- 32x6은 12와 180을 더한 192입니다.</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet03;

const Image10 = () => <Image src={'/A04/0004/04/MC31402-2.png'} alt='숫자 10' width='30px' />;
const Image1 = () => <Image src={'/A04/0004/04/MC31404-1.png'} alt='숫자 1' width='30px' />;
