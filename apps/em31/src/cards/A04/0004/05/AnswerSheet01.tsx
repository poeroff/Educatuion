import { Box, Typography, ETagLine, Tag, Image } from '@maidt-cntn/ui';

const AnswerSheet01 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>3, 1, 2</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
          <Typography>
            - <Image10 />은 4개와 <Image1 />
            1개를 3번 놓은 것과 같습니다.
          </Typography>
          <Typography>
            - <Image1 />이 1개씩 3줄이므로 <Image1 />은 3개입니다.
          </Typography>
          <Typography>
            - <Image10 />이 4개씩 3줄이므로 <Image10 />은 12개입니다.
          </Typography>
          <Typography>
            - <Image10 />
            10개를 <Image100 />
            1개로 바꾸어 나타낼 수 있으므로 <Image10 />
            12개를 <Image100 />
            1개와 <Image1 />
            2개로 바꾸어 나타낼 수 있습니다.
          </Typography>
          <Typography>
            - 41x3은 <Image100 />이 1개, <Image10 />이 2개, <Image1 />이 3개와 같으므로 123입니다.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet01;

const Image100 = () => <Image src={'/A04/0004/05/MC31405_02-1.png'} alt='숫자 100' width='30px' />;
const Image10 = () => <Image src={'/A04/0004/04/MC31402-2.png'} alt='숫자 10' width='30px' />;
const Image1 = () => <Image src={'/A04/0004/04/MC31404-1.png'} alt='숫자 1' width='30px' />;
