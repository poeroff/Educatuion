import { Box, ETagLine, Tag, Typography } from '@maidt-cntn/ui';

const AnswerSheet05 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='답안' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>496, 508, 1004 / 1004, 있습니다.</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='해설' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>마을 사람들이 이틀 동안 기부한 쌀 봉투가 1000개가 넘으므로 행복 기업은 약속한 대로 쌀을 기부할 수 있습니다.</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default AnswerSheet05;
