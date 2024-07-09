import { Box, TMainHeaderInfoTypes, Image, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import arrowRight from '@/assets/icon/arrow_right.svg';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' hAlign='center' gap='20px' useFull>
        <Box>
          <Image
            src={'/L02/C08/A04/HE1-L02-C08-A04.jpg'}
            width={'811px'}
            alt='I felt as if people from the past were looking over the shoulders of the old men. I felt가 다른 퍼즐로 분리되어 있으며 as if 와 were이 빨간 색자로 강조되어 있다.'
          />
        </Box>
        <Box display='flex' flexDirection='column' gap='26px' padding='0 26px'>
          <Box display='flex' justifyItems='center' gap='10px'>
            <SvgIcon src={arrowRight} size='38px' />
            <Sentence>
              Eric looks{' '}
              <DescriptionWrapper>
                <HighlightedWord>as if</HighlightedWord>
                <ExtraWrap>
                  <ExtraWord>(</ExtraWord>
                  <ArrowStyle>&rarr; </ArrowStyle>
                  <ExtraWord>In fact, he doesn’t own the world.)</ExtraWord>
                </ExtraWrap>
              </DescriptionWrapper>{' '}
              he <HighlightedWord>owned</HighlightedWord> the whole world these days.
            </Sentence>
          </Box>
          <Box display='flex' justifyItems='center' gap='10px'>
            <SvgIcon src={arrowRight} size='38px' />
            <Sentence>
              I am , but my grandmother still treats me{' '}
              <DescriptionWrapper>
                <HighlightedWord>as if</HighlightedWord>
                <ExtraWrap>
                  <ExtraWord>(</ExtraWord>
                  <ArrowStyle>&rarr; </ArrowStyle>
                  <ExtraWord>In fact, I’m not a baby.)</ExtraWord>
                </ExtraWrap>
              </DescriptionWrapper>{' '}
              I <HighlightedWord>were</HighlightedWord> a baby.
            </Sentence>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;

const Sentence = styled.span`
  font-weight: var(--font-weight-medium);
  height: 38px;
  line-height: 38px;
  display: inline-block;
`;

const DescriptionWrapper = styled.div`
  position: Relative;
  display: inline-flex;
  flex-direction: column;
`;

const HighlightedWord = styled.strong`
  font-weight: var(--font-weight-bold);
  color: var(--color-red-800);
  display: inline-block;
  position: relative;
`;

const ExtraWord = styled.span`
  font-size: 22px;
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-500);
`;

const ArrowStyle = styled.span`
  font-family: Arial, sans-serif;
  color: var(--color-grey-500);
  font-size: 22px;
`;

const ExtraWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: max-content;
  top: 26px;
`;
