import { Box, Typography, ETagLine, Tag, Image } from '@maidt-cntn/ui';

const AnswerSheet02 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>3, 1, 2, 0, 1, 2, 3</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>
            - 41은 <Image10 />
            4개와 <Image1 />
            1개로 나타낼 수 있고, 41x3은 <Image10 />
            4개와 <Image1 />
            1개를 3번 놓아야 합니다.
          </Typography>
          <Typography>
            - 41x3은 <Image1 />이 1x3=3(개)이고, <Image10 />이 4x3=12(개)입니다
          </Typography>
          <Typography>
            - <Image10 />은 10을 나타내고 <Image10 />
            12개는 120이므로 41x3은 3과 120을 더한 123입니다.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet02;

const Image10 = () => <Image src={'/A04/0004/04/MC31402-2.png'} alt='숫자 10' width='30px' />;
const Image1 = () => <Image src={'/A04/0004/04/MC31404-1.png'} alt='숫자 1' width='30px' />;
