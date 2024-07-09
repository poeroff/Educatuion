import { Box, Typography, ETagLine, Tag } from '@maidt-cntn/ui';

const AnswerSheet03 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='답안' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>581</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>
            405 {'>'} 338 {'>'} 329 {'>'} 176이므로 가장 큰 수는 405, 가장 작은 수는 176입니다.{' '}
          </Typography>
          <Typography>405 + 176 = 581</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AnswerSheet03;
