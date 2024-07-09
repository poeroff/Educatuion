import styled from 'styled-components';
import { Box, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import BlueDotSVG from '@/assets/A01/0099/01/blueDot.svg';
import BlueRightArrowSVG from '@/assets/A01/0099/01/blueRightArrow.svg';
import BaseArrowSVG from '@/assets/A01/0099/01/baseArrow.svg';
import ExpArrowSVG from '@/assets/A01/0099/01/ExpArrow.svg';
import Factorization50SVG from '@/assets/A01/0099/01/factorization_50.svg';
import HiddenTextButton from './components/HiddenTextButton';
import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';

const P02 = () => {
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
        소인수분해
      </HeaderTitle>
      <Box display='flex' flexDirection='column' gap='20px' margin='30px 0 0 -40px'>
        <Box display='flex'>
          <Number>(1)</Number>
          &nbsp;
          <Box display='flex' flexDirection='column' height='96px'>
            <Box
              display='flex'
              alignItems='center'
              height='40px'
              onClick={() => {
                setIsVisible(prev => !prev);
              }}
            >
              <HiddenTextButton
                width='155px'
                height='40px'
                textStyle={{
                  fontFamily: 'SUIT',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '40px',
                }}
              >
                거듭제곱
              </HiddenTextButton>
            </Box>
            <Box display='flex' alignItems='center' gap='15px'>
              <ContentNumber>
                3×3×3×3 =&nbsp;
                <BaseNumberCircle $getBgColor={isVisible}>3</BaseNumberCircle>
                <Sup>
                  <ExponentNumberCircle $getBgColor={isVisible}>4</ExponentNumberCircle>
                </Sup>
              </ContentNumber>

              {isVisible && (
                <>
                  <Box marginTop='10px'>
                    <SvgIcon src={BlueRightArrowSVG} width='44px' height='23px' />
                  </Box>
                  <Box>
                    <ContentNumber>
                      <BaseNumberCircle $getBgColor>
                        3
                        <BaseNumberDescriptionText>
                          <SvgIcon src={BaseArrowSVG} width='38px ' height='20px' /> 밑
                        </BaseNumberDescriptionText>
                      </BaseNumberCircle>
                      <Sup>
                        <ExponentNumberCircle $getBgColor>
                          4
                          <ExponentNumberDescriptionText>
                            <SvgIcon src={ExpArrowSVG} width='13px' height='7px' /> 지수
                          </ExponentNumberDescriptionText>
                        </ExponentNumberCircle>
                      </Sup>
                    </ContentNumber>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Number>(2)</Number>
          &nbsp;
          <Box display='flex' flexDirection='column' gap='20px'>
            <Box display='flex' alignItems='center' height='40px' fontSize='28px' lineHeight='40px' fontWeight='600'>
              소인수분해
            </Box>
            <Box display='flex' gap='10px' fontFamily='SUIT' fontSize='28px' lineHeight='36px' fontWeight='600'>
              <NumberCircle>1</NumberCircle>
              <HiddenTextButton
                width='74px'
                height='36px'
                textStyle={{
                  fontFamily: 'SUIT',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '36px',
                }}
              >
                소인수
              </HiddenTextButton>
              : 어떤 자연수의 약수 중에서 소수인 것
            </Box>
            <Box display='flex' gap='10px' fontFamily='SUIT' fontSize='28px' lineHeight='36px' fontWeight='600'>
              <NumberCircle>2</NumberCircle>
              <HiddenTextButton
                width='123px'
                height='36px'
                textStyle={{
                  fontFamily: 'SUIT',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '36px',
                }}
              >
                소인수분해
              </HiddenTextButton>
              : 어떤 자연수를 그 수의 소인수들만의 곱으로 나타내는 것
            </Box>
            <Box display='flex' marginLeft='52px'>
              <img src={Factorization50SVG} alt='50 소인수분해' width='199px' height='122px' />
              {/* Object Storage 사용하게 되면 수정 */}
              {/* <Image src={Factorization50SVG} alt='50 소인수분해' width='199px' height='122px' /> */}
              <Box display='flex' alignItems='center' margin='0 0 0 26px'>
                <Box marginRight='15px'>
                  <SvgIcon src={BlueRightArrowSVG} width='44px' height='23px' />
                </Box>
                <ContentNumber>50 =&nbsp;</ContentNumber>
                <HiddenTextButton
                  width='93px'
                  height='40px'
                  textStyle={{
                    fontFamily: 'SUIT',
                    fontSize: '28px',
                    fontWeight: 500,
                    lineHeight: '40px',
                  }}
                >
                  <Box marginTop='-6px'>
                    <ContentNumber>
                      2×5<Sup>2</Sup>
                    </ContentNumber>
                  </Box>
                </HiddenTextButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;

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
`;

const Number = styled.span`
  font-family: SUIT;
  font-size: 28px;
  font-weight: 500;
  line-height: 40px;
`;

const ContentNumber = styled(Number)`
  line-height: 36px;
`;

const BaseNumberCircle = styled(Number)<{ $getBgColor: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ $getBgColor }) => ($getBgColor ? '#f4f8ff' : 'none')};

  font-family: SUIT;
  font-weight: 500;
  font-size: 28px;
  line-height: 22px;
`;

const ExponentNumberCircle = styled(Number)<{ $getBgColor: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $getBgColor }) => ($getBgColor ? '#ffecf1' : 'none')};

  font-family: SUIT;
  font-weight: 500;
  font-size: 16px;
  line-height: 12px;
`;

const NumberCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-top: 1px;
  background-color: #6a6d73;
  color: white;

  font-family: SUIT;
  font-size: 24px;
  font-weight: 700;
  line-height: 38px;
  text-align: center;
`;

const DescriptionText = styled.span`
  position: absolute;
  font-family: SUIT;
  font-size: 18px;
  line-height: 20px;
  font-weight: 600;
  white-space: nowrap;
`;

const BaseNumberDescriptionText = styled(DescriptionText)`
  top: 24px;
  left: 11px;
  color: #0091ff;
`;

const ExponentNumberDescriptionText = styled(DescriptionText)`
  top: -4px;
  left: 14px;
  color: #fe5663;
`;
