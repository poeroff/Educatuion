import styled from '@emotion/styled';
import { Box, TMainHeaderInfoTypes, TextView, Image, BoxWrap, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import { Container, ArrowLine } from '@maidt-cntn/ui/en';
import { useRef } from 'react';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const HE02204 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);
  const startRef3 = useRef<HTMLSpanElement>(null);
  const endRef3 = useRef<HTMLSpanElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point1',
  };

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap flexDirection='column'>
        <Box width='100%' height='71px'>
          <Image src={'/HE1-L01-C08-A02.jpg'} width='100%' />
          <Box type='hidden'>
            They set up a device which required two individuals to pull both ends of a rope at the same time. 빨간 색자 which가 이끄는 절이 which 앞의
            파란 색자 a device를 수식하는 모습을 나타낸다.
          </Box>
        </Box>
        <Box marginTop='30px' vAlign='flex-start' flexDirection='column'>
          <Box vAlign='flex-start' gap='4px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Box>
              <span aria-describedby='contents-1-1 phrase'>
                <Sentence weight='var(--font-weight-bold)' color='var(--color-blue-800)' title='파란색 글씨'>
                  The
                </Sentence>
                <Sentence weight='var(--font-weight-bold)' color='var(--color-blue-800)' ref={startRef1} title='파란색 글씨'>
                  athlete
                </Sentence>
              </span>
              <WordContainer>
                <Sentence
                  weight='var(--font-weight-bold)'
                  color='var(--color-red-800)'
                  id='content-1-1'
                  aria-describedby='content-1-2'
                  ref={endRef1}
                  title='빨간색 글씨'
                >
                  who
                </Sentence>
                <SubText>
                  <Sentence color='var(--color-grey-500)' id='content-1-2'>
                    (=that)
                  </Sentence>
                </SubText>
              </WordContainer>
              <Sentence>broke the world record has inspired other players.</Sentence>
              <ArrowLine
                startRef={startRef1}
                endRef={endRef1}
                color='var(--color-grey-600)'
                startArrow={true}
                endArrow={false}
                vLineLength={10}
                thickness={2}
                offsetY={7}
                cornerRadius={5}
              />
            </Box>
          </Box>
          <Box vAlign='flex-start' gap='4px' marginTop='30px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Box>
              <Sentence>Media literacy is the ability to critically assess perspectives in</Sentence>
              <Box marginTop='20px'>
                <span aria-describedby='content-2-1 phrase'>
                  <Sentence weight='var(--font-weight-bold)' color='var(--color-blue-800)' title='파란색 글씨'>
                    the
                  </Sentence>
                  <Sentence weight='var(--font-weight-bold)' color='var(--color-blue-800)' ref={startRef2} title='파란색 글씨'>
                    news
                  </Sentence>
                </span>
                <WordContainer>
                  <Sentence
                    weight='var(--font-weight-bold)'
                    color='var(--color-red-800)'
                    aria-describedby='content-2-2'
                    id='content-2-1'
                    ref={endRef2}
                    title='빨간색 글씨'
                  >
                    (which)
                  </Sentence>
                  <SubText>
                    <Sentence weight='var(--font-weight-bold)' color='var(--color-grey-500)' id='content-2-2'>
                      (=that)
                    </Sentence>
                  </SubText>
                </WordContainer>
                <Sentence>we encounter.</Sentence>
                <ArrowLine
                  startRef={startRef2}
                  endRef={endRef2}
                  color='var(--color-grey-600)'
                  startArrow={true}
                  endArrow={false}
                  vLineLength={10}
                  thickness={2}
                  offsetY={10}
                  cornerRadius={5}
                />
              </Box>
            </Box>
          </Box>
          <Box vAlign='flex-start' gap='4px' marginTop='40px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Box>
              <span aria-describedby='content-3-1 phrase'>
                <Sentence weight='var(--font-weight-bold)' color='var(--color-blue-800)' title='파란색 글씨'>
                  The
                </Sentence>
                <Sentence weight='var(--font-weight-bold)' color='var(--color-blue-800)' ref={startRef3} title='파란색 글씨'>
                  economists
                </Sentence>
              </span>
              <WordContainer>
                <Sentence
                  weight='var(--font-weight-bold)'
                  color='var(--color-red-800)'
                  aria-describedby='content-3-2'
                  id='content-3-1'
                  ref={endRef3}
                  title='빨간색 글씨'
                >
                  (who(m))
                </Sentence>
                <SubText>
                  <Sentence color='var(--color-grey-500)' id='content-3-2'>
                    (=that)
                  </Sentence>
                </SubText>
              </WordContainer>
              <Sentence>
                <Sentence weight='var(--font-weight-bold)' color='var(--color-green-800)'>
                  interviewed
                </Sentence>
                predicted the economy will
              </Sentence>
              <ArrowLine
                startRef={startRef3}
                endRef={endRef3}
                color='var(--color-grey-600)'
                startArrow={true}
                endArrow={false}
                vLineLength={10}
                thickness={2}
                offsetY={10}
                cornerRadius={5}
              />
              <Sentence>flourish next year.</Sentence>
            </Box>
          </Box>
        </Box>
        <HiddenArea>
          <span id='phrase'>수식 받음</span>
        </HiddenArea>
      </BoxWrap>
    </Container>
  );
};

export default HE02204;

const Sentence = styled.span<{ color?: string; weight?: string }>`
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
  padding: 4px 2px;
  line-height: 1.2;
`;

const WordContainer = styled.span`
  position: relative;
  display: inline-block;
`;

const SubText = styled.span`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: gray;
`;

const HiddenArea = styled.div`
  display: none;
`;
