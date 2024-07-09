import { Box, Typography, ETagLine, Tag, Image } from '@maidt-cntn/ui';

const AnswerSheet02 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>8, 4, 0, 4, 8</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' justifyItems={'baseline'}>
          <Typography>
            - 12는 <Image10 />
            1개와 <Image1 />
            2개로 나타낼 수 있고, 12x4는 <Image10 />
            1개와 <Image1 />
            2개를 4번 놓아야합니다.
          </Typography>
          <Typography>
            - 12x4는 <Image1 />이 2x4=8(개)이고, <Image10 />이 1x4=4(개)입니다.
          </Typography>
          <Typography>
            - <Image10 />은 10을 나타내고 <Image10 />
            4개는 40이므로 12x4는 8과 40을 더한 48입니다.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet02;

const Image10 = () => <Image src={'/A04/0004/04/MC31402-2.png'} alt='숫자 1' width='30px' />;
const Image1 = () => <Image src={'/A04/0004/04/MC31404-1.png'} alt='숫자 1' width='30px' />;
