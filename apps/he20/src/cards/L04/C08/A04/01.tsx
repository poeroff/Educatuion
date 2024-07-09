import { useRef } from 'react';
import styled from '@emotion/styled';
import { Box, TMainHeaderInfoTypes, Image, BoxWrap, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import { Container, ArrowLine } from '@maidt-cntn/ui/en';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P01 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  const altText = `파란 색자로 a risk와 organizations could access personal data without permission이 강조되고 동격의 의미로 =으로 연결되어 있고 빨간 색자로 that이 강조되어 있다.`;

  const emphasisBlue = { color: 'var(--color-blue-800)', weight: 'var(--font-weight-bold)', title: '파란색 글씨' };
  const emphasisRed = { color: 'var(--color-red-800)', weight: 'var(--font-weight-bold)', title: '빨간색 글씨' };

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap flexDirection='column' useFull>
        <Box width='100%' height='71px' margin='40px 0'>
          <Image
            src={'/L04/C08/A04/HE2-L04-C08-A04.jpg'}
            width='100%'
            alt="There's a risk taht organizations could access personal data without permission."
          />
          <Box type='hidden'>{altText}</Box>
        </Box>
        <Box marginTop='40px' vAlign='flex-start' flexDirection='column'>
          <Box vAlign='flex-start' gap='4px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Box>
              <span aria-describedby='contents-1-1 phrase'>
                <Sentence {...emphasisBlue}>The</Sentence>
                <Sentence {...emphasisBlue} ref={startRef1}>
                  fact
                </Sentence>
              </span>
              <WordContainer>
                <Sentence id='content-1-1' aria-describedby='content-1-2' {...emphasisRed}>
                  that
                </Sentence>
                <SubText>
                  <Sentence color='var(--color-grey-500)' id='content-1-2'>
                    =
                  </Sentence>
                </SubText>
              </WordContainer>
              <Sentence ref={endRef1} {...emphasisBlue}>
                Dokdo
              </Sentence>
              <Sentence {...emphasisBlue}>belongs to Korea</Sentence>
              <ArrowLine
                startRef={startRef1}
                endRef={endRef1}
                color='var(--color-grey-600)'
                startArrow={true}
                endArrow={false}
                vLineLength={10}
                thickness={2}
                offsetY={8}
                cornerRadius={5}
              />
              <Sentence>should be known to the world.</Sentence>
            </Box>
          </Box>

          <Box vAlign='flex-start' gap='4px' marginTop='30px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Box>
              <Sentence>I was surprised at</Sentence>
              <span aria-describedby='content-2-1 phrase'>
                <Sentence {...emphasisBlue}>the</Sentence>
                <Sentence {...emphasisBlue} ref={startRef2}>
                  news
                </Sentence>
              </span>
              <WordContainer>
                <Sentence aria-describedby='content-2-2' id='content-2-1' {...emphasisRed}>
                  that
                </Sentence>
                <SubText>
                  <Sentence weight='var(--font-weight-bold)' color='var(--color-grey-500)' id='content-2-2'>
                    =
                  </Sentence>
                </SubText>
              </WordContainer>
              <Sentence {...emphasisBlue} ref={endRef2}>
                George
              </Sentence>
              <Sentence {...emphasisBlue}>didn't make it do the final.</Sentence>
              <ArrowLine
                startRef={startRef2}
                endRef={endRef2}
                color='var(--color-grey-600)'
                startArrow={true}
                endArrow={false}
                vLineLength={10}
                thickness={2}
                offsetY={8}
                cornerRadius={5}
              />
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

export default P01;

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
  top: -70%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: gray;
  background-color: var(--color-white);
  z-index: 1;
`;

const HiddenArea = styled.div`
  display: none;
`;
