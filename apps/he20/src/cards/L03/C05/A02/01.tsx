import { Box, BoxWrap, EStyleButtonTypes, Image, Typography, TMainHeaderInfoTypes, IQuestionProps, ETypographyTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Look at the pictures.',
  };

  return (
    <Container useExtend headerInfo={headerInfo} questionInfo={questionInfo} submitBtnColor={EStyleButtonTypes.PRIMARY}>
      <BoxWrap useFull>
        <Box useFull>
          <Box hAlign='center' flexDirection='column'>
            <Image
              width='300px'
              height='240px'
              style={{ borderRadius: '8px' }}
              src={'/L03/C05/A02/HE2-L03-C05-A02-01.jpg'}
              alt='피아노 앞에 앉아 있는 작곡가 베토벤'
            />
            <Typography styleType={ETypographyTypes.CAPTION}>Beethoven</Typography>
          </Box>
          <Box paddingTop='4px' paddingBottom='4px'>
            <Typography>a great German classical musician who had trouble hearing</Typography>
          </Box>
        </Box>
        <Box useFull>
          <Box hAlign='center' flexDirection='column'>
            <Image
              width='300px'
              height='240px'
              style={{ borderRadius: '8px' }}
              src={'/L03/C05/A02/HE2-L03-C05-A02-02.jpg'}
              alt='인터뷰를 하는 소설가 J. K. Rowling'
            />
            <Typography styleType={ETypographyTypes.CAPTION}>J. K. Rowling</Typography>
          </Box>
          <Box paddingTop='4px' paddingBottom='4px'>
            <Typography>a best-selling British writer who struggled with financial difficulties as a single parent</Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
