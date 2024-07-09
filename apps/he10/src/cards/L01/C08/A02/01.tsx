import { useRef } from 'react';
import styled from '@emotion/styled';
import { Box, TMainHeaderInfoTypes, Image, BoxWrap, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import { ArrowLine, Container } from '@maidt-cntn/ui/en';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P01 = () => {
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
        <Image src='/L01/C08/A02/HE1-L01-C08-A02.jpg' height='70px' alt='' ariaDescribedby='example_desc' />
        <Box type='hidden' id='example_desc'>
          They set up a device which required two individuals to pull both ends of a rope at the same time. 빨간 색자 which가 이끄는 절이 which 앞의
          파란 색자 a device를 수식하는 모습을 나타낸다.
        </Box>
        <Box marginTop='30px' vAlign='flex-start' flexDirection='column'>
          <Box vAlign='flex-start' gap='4px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
            <Box>
              <span aria-describedby='contents-1-1 phrase'>
                <Sentence color='var(--color-blue-900)'>The</Sentence>
                <Sentence color='var(--color-blue-900)' ref={startRef1}>
                  athlete
                </Sentence>
              </span>
              <WordContainer>
                <Sentence
                  color='var(--color-pink-600)'
                  id='content-1-1'
                  aria-describedby='content-1-2'
                  ref={endRef1}
                  title='The athlete의 관계대명사'
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
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
            <Box>
              <Sentence>Media literacy is the ability to critically assess perspectives in</Sentence>
              <Box marginTop='20px'>
                <span aria-describedby='content-2-1 phrase'>
                  <Sentence color='var(--color-blue-900)'>the</Sentence>
                  <Sentence color='var(--color-blue-900)' ref={startRef2}>
                    news
                  </Sentence>
                </span>
                <WordContainer>
                  <Sentence color='var(--color-pink-600)' aria-describedby='content-2-2' id='content-2-1' ref={endRef2} title='the news의 관계대명사'>
                    (which)
                  </Sentence>
                  <SubText>
                    <Sentence color='var(--color-grey-500)' id='content-2-2'>
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
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
            <Box>
              <span aria-describedby='content-3-1 phrase'>
                <Sentence color='var(--color-blue-900)'>The</Sentence>
                <Sentence color='var(--color-blue-900)' ref={startRef3}>
                  economists
                </Sentence>
              </span>
              <WordContainer>
                <Sentence
                  color='var(--color-pink-600)'
                  aria-describedby='content-3-2'
                  id='content-3-1'
                  ref={endRef3}
                  title='The economists의 관계대명사'
                >
                  (who(m))
                </Sentence>
                <SubText>
                  <Sentence color='var(--color-grey-500)' id='content-3-2'>
                    (=that)
                  </Sentence>
                </SubText>
              </WordContainer>
              <Sentence> we interviewed predicted the economy will</Sentence>
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
        <Box type='hidden' id='phrase'>
          수식 받음
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;

const Sentence = styled.span<{ color?: string }>`
  color: ${({ color }) => color};
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
