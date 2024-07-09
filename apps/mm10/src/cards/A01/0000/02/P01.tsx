import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import FirstSVG from '@/assets/A01/0000/02/MM1-0100-02-1.svg';
import SecondSVG from '@/assets/A01/0000/02/MM1-0100-02-2.svg';
import { ESvgType, SvgIcon, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  return (
    <Container headerInfo={{}} vAlign='center'>
      <FlexWrapper>
        <ContentWrapper>
          <SvgIcon type={ESvgType.IMG} src={FirstSVG} width='215px' height='157px' />
          <Typography>
            <IndentDiv>소인수분해를 이용하여 최대공약수와 최소공배수를 구하는 것은 자연수의 성질을 이해하는 데 기반이 된다.</IndentDiv>
          </Typography>
        </ContentWrapper>
        <ContentWrapper>
          <SvgIcon type={ESvgType.IMG} src={SecondSVG} width='215px' height='157px' />
          <Typography>
            <NumberingDiv>
              <span className='numbering'>1</span>
              <span>소수와 합성수</span>
            </NumberingDiv>
            <NumberingDiv>
              <span className='numbering'>2</span>
              <span>소인수분해</span>
            </NumberingDiv>
            <NumberingDiv>
              <span className='numbering'>3</span>
              <span>최대공약수와 최소공배수</span>
            </NumberingDiv>
          </Typography>
        </ContentWrapper>
      </FlexWrapper>
    </Container>
  );
};

export default P01;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 115px;
  padding: 0 16px;
`;

const ContentWrapper = styled.div`
  position: relative;
  img {
    position: absolute;
    top: -34px;
  }
`;

const IndentDiv = styled.div`
  text-indent: 20px;
  width: 600px;
  margin: 8px 0px 0px 76px;
`;

const NumberingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0px 0px 76px;
  .numbering {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 22px;
    background-color: #ed704f;
    padding: 4px 16px 4px 16px;
    font-size: 18px;
    color: white;
    font-weight: 700;
    line-height: 28px;
  }
`;
