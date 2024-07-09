import { Box, Typography, ETagLine, Tag, Image } from '@maidt-cntn/ui';

const AnswerSheet03 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>6, 8</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>
            - 17은 <Image10 />
            1개와 <Image1 />
            7개로 나타낼 수 있고, 17x4는 <Image10 />
            1개와 <Image1 />
            7개를 4번 놓아야 합니다.
          </Typography>
          <Typography>
            - 17x4는 <Image1 />이 7x4=28(개)이고, <Image10 />이 1x4=4(개)입니다
          </Typography>
          <Typography>
            - <Image1 />은 1을 나타내고 <Image1 />
            28개는 28이므로 17x4는 28과 40을 더한 68입니다.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet03;

const Image10 = () => <Image src={'/A04/0004/04/MC31402-2.png'} alt='숫자 10' width='30px' />;
const Image1 = () => <Image src={'/A04/0004/04/MC31404-1.png'} alt='숫자 1' width='30px' />;
