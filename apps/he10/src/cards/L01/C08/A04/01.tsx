import { useRef } from 'react';
import { Box, TMainHeaderInfoTypes, Image, BoxWrap, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import { ArrowLine, Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P01 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point2',
  };

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap flexDirection='column'>
        <Image src='/L01/C08/A04/HE1-L01-C08-A04.jpg' height='77px' alt='' ariaDescribedby='example_desc' />
        <Box type='hidden' id='example_desc'>
          (When) Paired with new partners, the chimpanzees usually failed to get the food. 빨간 색자 (When) Paired가 파란 색자 the chimpanzees와
          선으로 연결되어 있다.
        </Box>
        <Box marginTop='30px' vAlign='flex-start' flexDirection='column' gap='10px'>
          <Box vAlign='flex-start' gap='4px' marginTop='20px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
            <Box paddingLeft='12px'>
              <Sentence ref={startRef1} color='var(--color-pink-600)' aria-describedby='phrase_desc_1' title='this car를 수식하는 분사 구문' bold>
                Powered
              </Sentence>
              <Sentence> by electricity, </Sentence>
              <Sentence ref={endRef1} color='var(--color-blue-800)' title='주절의 주어' bold>
                this car
              </Sentence>
              <Sentence> produces fewer pollutants than a gasoline-fueled one.</Sentence>
              <ArrowLine
                startRef={startRef1}
                endRef={endRef1}
                color='var(--color-grey-600)'
                startArrow={false}
                endArrow={false}
                vLineLength={15}
                thickness={2}
                offsetY={10}
                cornerRadius={5}
              />
            </Box>
          </Box>
          <Box vAlign='flex-start' gap='4px' marginTop='30px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} alt='' />
            <Box paddingLeft='12px'>
              <Sentence ref={startRef2} color='var(--color-green-700)' aria-describedby='phrase_desc_2' title='we를 수식하는 분사 구문' bold>
                Waiting
              </Sentence>
              <Sentence> for our bus in the morning, </Sentence>
              <Sentence ref={endRef2} color='var(--color-blue-800)' title='주절의 주어' bold>
                we
              </Sentence>
              <Sentence>saw a fire in the building across the street.</Sentence>
              <ArrowLine
                startRef={startRef2}
                endRef={endRef2}
                color='var(--color-grey-600)'
                startArrow={false}
                endArrow={false}
                vLineLength={15}
                thickness={2}
                offsetX={5}
                offsetY={5}
                cornerRadius={5}
              />
              <Box type='hidden' id='phrase_desc_2'>
                초록 색자 Waiting이 파란 색자 we와 선으로 연결되어 있다.
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;

const Sentence = styled.span<{ color?: string; bold?: boolean }>`
  color: ${({ color }) => color};
  padding: 4px 2px;
  line-height: 1.2;
  ${({ bold }) => bold && 'font-weight: var(--font-weight-bold);'}
`;
