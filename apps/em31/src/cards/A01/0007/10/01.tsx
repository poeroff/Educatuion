import { Box, EStyleFontSizes, ETextViewColor, TextView, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const textviewTitle = '다음 시간에 배울 내용';
  const contentText = '7. 어림셈을 해요';
  return (
    <Container headerInfo={null} background={'var(--color-white)'} useRound>
      <Box hAlign='center' useFull>
        <TextView height='fit-content' type={ETextViewColor.LIGHT_YELLOW} title={textviewTitle}>
          <Box padding='34px 24px 22px 24px' display='flex' flexDirection='column'>
            <Typography weight={'var(--font-weight-semiBold)'} size={EStyleFontSizes.MEDIUM}>
              {contentText}
            </Typography>
          </Box>
        </TextView>
      </Box>
    </Container>
  );
};

export default P01;
