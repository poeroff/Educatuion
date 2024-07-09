import { Box, BoxWrap, Typography, Tag, ETagLine } from '@maidt-cntn/ui';

export default () => {
  return (
    <Box background='lightGray' borderRadius='12px' marginTop='108px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='답안' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>51</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <BoxWrap>
          <Typography>예 ) 지민이가 봉지에 담은 땅콩은 한 봉지에 담은 땅콩 수와 봉지 수의 곱이므로 28x2=56( 개 ) 입니다.</Typography>
        </BoxWrap>
      </Box>
    </Box>
  );
};
