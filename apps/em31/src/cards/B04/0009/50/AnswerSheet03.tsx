import { Box, BoxWrap, Typography, Tag, ETagLine } from '@maidt-cntn/ui';

export default () => {
  return (
    <Box background='lightGray' borderRadius='12px' marginTop='108px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='답안' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>지민, 5</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <BoxWrap>
          <Typography>예 ) 51&lt;56 이므로 지민이가 현수보다 땅콩을 56-51=5( 개 ) 더 많이 봉지에 담았습니다.</Typography>
        </BoxWrap>
      </Box>
    </Box>
  );
};
