import styled from 'styled-components';
import { Box, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import BlueDotSVG from '@/assets/A01/0099/01/blueDot.svg';
import BlueRightArrowSVG from '@/assets/A01/0099/01/blueRightArrow.svg';
import HiddenTextButton from './components/HiddenTextButton';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  return (
    <Container
      headerInfo={{
        headerPattern: 'icon',
        iconType: 'finish',
      }}
      vAlign='baseline'
    >
      <HeaderTitle>
        <Box padding='4px 2px'>
          <SvgIcon src={BlueDotSVG} type={ESvgType.IMG} width='13px' />
        </Box>
        소수와 합성수
      </HeaderTitle>
      <Box display='flex' flexDirection='column' gap='20px' margin='30px 0 0 -40px'>
        <Box display='flex'>
          <IndexNumber>(1)</IndexNumber>
          &nbsp;
          <Box display='flex' flexDirection='column' gap='20px'>
            <Box
              display='flex'
              alignItems='center'
              height='40px'
              fontFamily='SUIT'
              fontSize='28px'
              fontWeight='600'
              lineHeight='40px'
              textAlign='left'
            >
              <HiddenTextButton
                width='75px'
                height='40px'
                textStyle={{
                  fontFamily: 'SUIT',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '56px',
                }}
              >
                소수
              </HiddenTextButton>
              &nbsp; :&nbsp;<Span>1</Span>보다 큰 자연수 중에서&nbsp;<Span>1</Span>과 자기 자신만을 약수로 갖는 수
            </Box>
            <Box display='flex' alignItems='center' gap='9px'>
              <SvgIcon src={BlueRightArrowSVG} width='44px' height='23px' />
              <ContentNumber>2, 3, 5, 7, ...</ContentNumber>
            </Box>
          </Box>
        </Box>

        <Box display='flex'>
          <IndexNumber>(2)</IndexNumber>
          &nbsp;
          <Box display='flex' flexDirection='column' gap='20px'>
            <Box
              display='flex'
              alignItems='center'
              height='40px'
              fontFamily='SUIT'
              fontSize='28px'
              fontWeight='600'
              lineHeight='40px'
              textAlign='left'
            >
              <HiddenTextButton
                width='95px'
                height='40px'
                textStyle={{
                  fontFamily: 'SUIT',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '56px',
                }}
              >
                합성수
              </HiddenTextButton>
              &nbsp; :&nbsp;<Span>1</Span>보다 큰 자연수 중에서 소수가 아닌 수
            </Box>
            <Box display='flex' alignItems='center' gap='9px'>
              <SvgIcon src={BlueRightArrowSVG} width='44px' height='23px' />
              <ContentNumber>4, 6, 8, 9, ...</ContentNumber>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;

const HeaderTitle = styled.div`
  margin: -2px 0 0 -40px;
  font-size: 32px;
  font-weight: 600;
  line-height: 50px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Number = styled.span`
  font-family: SUIT;
  font-size: 28px;
`;

const IndexNumber = styled(Number)`
  font-weight: 500;
  line-height: 40px;
`;

const ContentNumber = styled(Number)`
  font-weight: 400;
  line-height: 36px;
`;

const Span = styled.span`
  font-weight: 500;
  margin-top: -4px;
`;
