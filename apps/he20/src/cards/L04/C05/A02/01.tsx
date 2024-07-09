import { Box, BoxWrap, EStyleButtonTypes, Image, Typography, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the online news titles below.',
  };

  return (
    <Container useExtend headerInfo={headerInfo} questionInfo={questionInfo} submitBtnColor={EStyleButtonTypes.PRIMARY}>
      <Box borderBottom='2px solid #8D9299' minHeight='50px' vAlign='center' background='var(--color-grey-50)'>
        <Typography weight={800}>Most Viewed News</Typography>
      </Box>
      <BoxWrap marginTop='12px' useFull height='calc(100% - 62px)'>
        <Box useFull>
          <Image
            width='377px'
            height='214px'
            style={{ borderRadius: '8px' }}
            src={'/L04/C05/A02/HE2-L04-C05-A02-01.jpg'}
            alt='사람의 뇌에 컴퓨터 침이 이식되어 작동하고 있다.'
          />
          <Box paddingTop='4px' paddingBottom='4px'>
            <Typography>Exploring the Fascinating World of Neurocience: Computer Chips in the Brain?</Typography>
          </Box>
        </Box>
        <Box useFull>
          <Box borderBottom='1px solid #47494D' paddingBottom='12px' vAlign='center'>
            <Image
              width='238px'
              height='159px'
              style={{ borderRadius: '8px' }}
              src={'/L04/C05/A02/HE2-L04-C05-A02-02.jpg'}
              alt='척추에 AI라고 쓰여진 칩이 신경과 연결되어 작동하고 있다.'
            />
            <Box useFull marginLeft='12px' vAlign='center'>
              <Typography>
                Paralyzed Man <br /> Walks Again with <br /> Brain and Spinal <br />
                Cord Implants
              </Typography>
            </Box>
          </Box>
          <Box marginTop='12px' vAlign='center'>
            <Image
              width='238px'
              height='159px'
              style={{ borderRadius: '8px' }}
              src={'/L04/C05/A02/HE2-L04-C05-A02-03.jpg'}
              alt='두뇌에 이식된 컴퓨터 칩에 전원버튼을 사다리를 타고 올라간 과학자가 켜고 있다.'
            />
            <Box useFull marginLeft='12px' vAlign='center'>
              <Typography>AI and Neural Implants Bring Innovation to Our Future</Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
