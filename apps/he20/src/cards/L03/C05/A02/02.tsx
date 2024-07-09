import { Box, BoxWrap, EStyleButtonTypes, Image, Typography, TMainHeaderInfoTypes, IQuestionProps, ETypographyTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Look at the pictures.',
  };

  return (
    <Container useExtend headerInfo={headerInfo} questionInfo={questionInfo} submitBtnColor={EStyleButtonTypes.PRIMARY}>
      <BoxWrap useFull>
        <Box useFull hAlign='center' vAlign='start'>
          <Box>
            <Box hAlign='center' flexDirection='column'>
              <Image width='300px' height='240px' style={{ borderRadius: '8px' }} src={'/L03/C05/A02/HE2-L03-C05-A02-03.jpg'} alt='Usain Bolt' />
              <Typography styleType={ETypographyTypes.CAPTION}>Usain Bolt</Typography>
            </Box>
            <Box paddingTop='4px' paddingBottom='4px'>
              <Typography>a world-famous Jamaican runner who has a curved spine</Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
