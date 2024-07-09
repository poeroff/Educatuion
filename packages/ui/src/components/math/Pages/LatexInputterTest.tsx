import { Container, LatexInputter, ButtonInputter } from '@maidt-cntn/ui/math';
import { Box, BoxWrap, EStyleFontSizes, SvgIcon, Typography } from '@maidt-cntn/ui';
import LessonLogo from '@/assets/icon/unit-number.svg';

const LatexInputterTest = () => {
  const handleLatexChange = (latex: string) => {
    console.log(latex);
  };

  return (
    <Container headerInfo={null} useExtend useScroll={false}>
      <Box position='absolute' display='flex' alignItems='center' top={58} left={32}>
        <SvgIcon src={LessonLogo} size='50px' />
        <Box marginLeft='10px'>
          <Typography color='var(--color-green-900)' weight='800' size={EStyleFontSizes['X-LARGE']} useGap={false}>
            수식입력기 TEST
          </Typography>
        </Box>
      </Box>

      <BoxWrap flexDirection='column' justifyContent='center' marginTop='24px' useFull>
        <Box useFull>
          <LatexInputter school='hm' handleChange={handleLatexChange} />
        </Box>
        <Box useFull>
          <LatexInputter school='em' handleChange={handleLatexChange} />
        </Box>
        <Box useFull>
          <LatexInputter school='mm' handleChange={handleLatexChange} />
        </Box>
        <Box useFull>
          <LatexInputter school='hm' handleChange={handleLatexChange} />
        </Box>
      </BoxWrap>
      <ButtonInputter />
    </Container>
  );
};

export default LatexInputterTest;
