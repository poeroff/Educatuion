import styled from 'styled-components';
import { Box, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import BlueDotSVG from '@/assets/A01/0099/01/blueDot.svg';
import BlueRightArrowSVG from '@/assets/A01/0099/01/blueRightArrow.svg';
import RedUpArrowSVG from '@/assets/A01/0099/01/redUpArrow.svg';
import BlueUpArrowSVG from '@/assets/A01/0099/01/blueUpArrow.svg';
import GreenUpArrowSVG from '@/assets/A01/0099/01/greenUpArrow.svg';
import { Container } from '@maidt-cntn/ui/math';
import HiddenTextButton from './components/HiddenTextButton';
import { useState } from 'react';

const P03 = () => {
  const [isVisible, setIsVisible] = useState(false);

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
        최대공약수와 최소공배수
      </HeaderTitle>
      <Box
        display='flex'
        flexDirection='column'
        gap='20px'
        margin='30px 0 0 -40px'
        fontFamily='SUIT'
        fontSize='28px'
        fontWeight='600'
        lineHeight='36px'
      >
        <Box display='flex' marginBottom={isVisible ? '90px' : undefined}>
          <IndexNumber>(1)</IndexNumber>
          <Box display='flex' flexDirection='column'>
            <Box marginBottom='20px'>&nbsp;소인수분해를 이용하여 최대공약수 구하는 방법</Box>

            <Box display='flex' flexDirection='column' alignItems='center' width='457px'>
              <Box marginBottom='20px'>
                <ContentNumber>
                  24=2
                  <Sup>3</Sup>×<NumberCircle $backgroundColor='#F4F8FF'>3</NumberCircle>
                </ContentNumber>
              </Box>
              <Box marginBottom='20px'>
                <ContentNumber>
                  60=
                  <NumberCircle $backgroundColor='#FFECF1'>
                    2<Sup>2</Sup>
                  </NumberCircle>
                  ×3×5
                </ContentNumber>
              </Box>

              <Box display='flex' alignItems='center' justifyContent='center' gap='20px' borderTop='1px solid #000000' paddingTop='20px' width='100%'>
                최대공약수
                <SvgIcon src={BlueRightArrowSVG} width='44px' height='23px' />
                <Box
                  onClick={() => {
                    setIsVisible(prev => !prev);
                  }}
                >
                  <HiddenTextButton
                    width='141px'
                    height='40px'
                    textStyle={{
                      fontFamily: 'SUIT',
                      fontSize: '28px',
                      fontWeight: 400,
                      lineHeight: '40px',
                    }}
                  >
                    <NumberCircle $backgroundColor='#FFECF1'>
                      2<Sup>2</Sup>
                      <DescriptionText $color='red' $width='104px' $align='right'>
                        <SvgIcon src={RedUpArrowSVG} width='7.5px' height='12px' />
                        지수가 다르면 작은 것으로
                      </DescriptionText>
                    </NumberCircle>
                    ×
                    <NumberCircle $backgroundColor='#F4F8FF'>
                      3
                      <DescriptionText $color='blue' $width='104px' $align='left'>
                        <SvgIcon src={BlueUpArrowSVG} width='7.5px' height='12px' />
                        지수가 같으면 그대로
                      </DescriptionText>
                    </NumberCircle>
                    =12
                  </HiddenTextButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display='flex' alignItems='center' gap='10px' lineHeight='40px'>
          <IndexNumber>(2)</IndexNumber>
          <HiddenTextButton
            width='93px'
            height='40px'
            textStyle={{
              fontFamily: 'SUIT',
              fontSize: '28px',
              fontWeight: 600,
              lineHeight: '40px',
            }}
          >
            서로소
          </HiddenTextButton>
          : 최대공약수가 1인 두 자연수
        </Box>

        <Box display='flex'>
          <IndexNumber>(3)</IndexNumber>
          <Box display='flex' flexDirection='column'>
            <Box marginBottom='20px'>&nbsp;소인수분해를 이용하여 최소공배수 구하는 방법</Box>

            <Box display='flex' flexDirection='column' alignItems='center' width='457px'>
              <Box marginBottom='20px'>
                <ContentNumber>
                  24=
                  <NumberCircle $backgroundColor='#FFECF1'>
                    2<Sup>3</Sup>
                  </NumberCircle>
                  ×<NumberCircle $backgroundColor='#F4F8FF'>3</NumberCircle>
                </ContentNumber>
              </Box>
              <Box marginBottom='20px'>
                <ContentNumber>
                  60= 2<Sup>2</Sup>
                  ×3×<NumberCircle $backgroundColor='#E5F4EA'>5</NumberCircle>
                </ContentNumber>
              </Box>

              <Box display='flex' alignItems='center' justifyContent='center' gap='20px' borderTop='1px solid #000000' paddingTop='20px' width='100%'>
                최소공배수
                <SvgIcon src={BlueRightArrowSVG} width='44px' height='23px' />
                <HiddenTextButton
                  width='217px'
                  height='40px'
                  textStyle={{
                    fontFamily: 'SUIT',
                    fontSize: '28px',
                    fontWeight: 400,
                    lineHeight: '40px',
                  }}
                >
                  <NumberCircle $backgroundColor='#FFECF1'>
                    2<Sup>3</Sup>
                    <DescriptionText $color='red' $width='104px' $align='right'>
                      <SvgIcon src={RedUpArrowSVG} width='7.5px' height='12px' />
                      지수가 다르면 큰 것으로
                    </DescriptionText>
                  </NumberCircle>
                  ×
                  <NumberCircle $backgroundColor='#F4F8FF'>
                    3
                    <DescriptionText $color='blue' $width='48px' $align='center'>
                      <SvgIcon src={BlueUpArrowSVG} width='7.5px' height='12px' />
                      지수가 같으면 그대로
                    </DescriptionText>
                  </NumberCircle>
                  ×
                  <NumberCircle $backgroundColor='#E5F4EA'>
                    5
                    <DescriptionText $color='green' $width='83px' $align='left'>
                      <SvgIcon src={GreenUpArrowSVG} width='7.5px' height='12px' />
                      공통이{'\n'}아닌 소인수
                    </DescriptionText>
                  </NumberCircle>
                  =120
                </HiddenTextButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P03;

const HeaderTitle = styled.div`
  margin: -2px 0 0 -40px;
  font-size: 32px;
  font-weight: 600;
  line-height: 50px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Sup = styled.sup`
  vertical-align: super;
  font-size: smaller;
  font-size: 20px;
`;

const IndexNumber = styled.div`
  font-size: 28px;
  font-weight: 400;
  line-height: 32px;
`;

const ContentNumber = styled.div`
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
`;

const NumberCircle = styled.div<{ $backgroundColor?: string }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  width: fit-content;
  height: 38px;
  line-height: 38px;
  border-radius: 50%;
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? '#f4f8ff'};

  & sup {
    margin-top: -16px;
  }
`;

const DescriptionText = styled.span<{ $color: string; $width: string; $align: string }>`
  position: absolute;
  font-family: SUIT;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;

  display: flex;
  flex-direction: column;
  width: max-content;
  white-space: pre-wrap;
  max-width: ${({ $width }) => $width};
  text-align: ${({ $align }) => $align};
  align-items: ${({ $align }) => ($align === 'left' ? 'self-start' : $align === 'right' ? 'self-end' : 'center')};
  top: 40px;
  left: ${({ $align }) => ($align === 'right' ? '-83px' : $align === 'left' ? '15px' : 'undefined')};
  color: ${({ $color }) => ($color === 'red' ? '#FE5663' : $color === 'blue' ? '#0091FF' : '#1EAA58')};
`;
