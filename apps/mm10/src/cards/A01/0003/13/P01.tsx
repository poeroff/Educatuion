import styled from 'styled-components';
import { useMemo } from 'react';
import { Box, Drawing, ESvgType, Input, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import BigPaperSVG from '@/assets/A01/0003/13/paper_big.svg';
import SmallPaperSVG from '@/assets/A01/0003/13/paper_small.svg';
import RightBrownSVG from '@/assets/A01/0003/13/right_brown.svg';
import ArrowTopSVG from '@/assets/A01/0003/13/arrow_top.svg';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    const values = [getValueInputData(0, 'TEXT-0') as string, getValueInputData(1, 'TEXT-0') as string];

    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <Container
      useScroll
      headerInfo={{ headerPattern: 'icon', iconType: 'thinkBigMathEmotion' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              <GradeCheck mainKey={0} />
            </span>
            세 수의 최대공약수와 최소공배수도 두 수의 최대공약수와
            <br />
            최소공배수를 구하는 것과 같은 방법으로 구할 수 있다.
          </Title>
        ),
      }}
      vAlign='start'
      useExtend
      onSubmit={gradeSubmitPageData}
      submitLabel='채점하기'
      submitDisabled={hasEmptyValue || pageSubmitted}
    >
      <ContentWrapper>
        <SectionWrapper>
          <Paper>
            <SvgIcon src={BigPaperSVG} type={ESvgType.IMG} width='480px' height='315px' />
            <TitleWrapper>
              <Typography useGap={false} weight={600}>
                30, 36, 54의 최대공약수 구하기
              </Typography>
            </TitleWrapper>
            <BodyWrapper>
              <Exam>
                <Typography useGap={false}>
                  30=<ColorCircle color='pink'>2</ColorCircle>×<ColorCircle color='blue'>3</ColorCircle>×5
                </Typography>
                <Typography useGap={false}>
                  36=2<Sup>2</Sup>×3<Sup>2</Sup>
                </Typography>
                <Typography useGap={false}>
                  54=2×3<Sup>3</Sup>
                </Typography>
              </Exam>
              <Answer>
                <Typography useGap={false}>
                  <span>
                    <ColorCircle color='pink'>2</ColorCircle>×<ColorCircle color='blue'>3</ColorCircle>
                  </span>
                  <span style={{ marginLeft: '20px' }}>=6</span>
                </Typography>
                <ArrowWrapper style={{ transform: 'translateX(15px)' }}>
                  <SvgIcon src={ArrowTopSVG} type={ESvgType.IMG} width='11px' />
                  <Typography fontSize='18px' lineHeight='27px' color='#0091FF' useGap={false} weight={600}>
                    최대공약수
                  </Typography>
                </ArrowWrapper>
              </Answer>
            </BodyWrapper>
          </Paper>
          <Paper>
            <SvgIcon src={BigPaperSVG} type={ESvgType.IMG} width='480px' height='315px' />
            <TitleWrapper>
              <Typography useGap={false} weight={600}>
                30, 36, 54의 최소공배수 구하기
              </Typography>
            </TitleWrapper>
            <BodyWrapper>
              <Exam>
                <Typography useGap={false}>
                  30=2×3×<ColorCircle color='yellow'>5</ColorCircle>
                </Typography>
                <Typography useGap={false}>
                  36=
                  <ColorCircle color='pink'>
                    2<Sup>2</Sup>
                  </ColorCircle>
                  ×3<Sup>2</Sup>
                </Typography>
                <Typography useGap={false}>
                  54=2×
                  <ColorCircle color='blue'>
                    3<Sup>3</Sup>
                  </ColorCircle>
                </Typography>
              </Exam>
              <Answer>
                <Typography useGap={false}>
                  <span>
                    <ColorCircle color='pink'>
                      2<Sup>2</Sup>
                    </ColorCircle>
                    ×
                    <ColorCircle color='blue'>
                      3<Sup>3</Sup>
                    </ColorCircle>
                    ×<ColorCircle color='yellow'>5</ColorCircle>
                  </span>
                  <span>=540</span>
                </Typography>
                <ArrowWrapper>
                  <SvgIcon src={ArrowTopSVG} type={ESvgType.IMG} width='11px' />
                  <Typography fontSize='18px' lineHeight='27px' color='#0091FF' useGap={false} weight={600}>
                    최소공배수
                  </Typography>
                </ArrowWrapper>
              </Answer>
            </BodyWrapper>
          </Paper>
        </SectionWrapper>
        <QuestionArrow>
          <SvgIcon src={RightBrownSVG} type={ESvgType.IMG} />
          <Typography useGap={false} weight={600}>
            위와 같은 방법으로 30, 45, 60의 최대공약수와 최소공배수를 각각 구해 보자
          </Typography>
        </QuestionArrow>
        <SectionWrapper>
          <DrawingWrapper>
            <Drawing width='480px' height='333px' />
            <SvgIcon src={SmallPaperSVG} type={ESvgType.IMG} />
            <DrawTitleWrapper>
              <Typography useGap={false} weight={600}>
                30, 45, 60의 최대공약수 구하기
              </Typography>
            </DrawTitleWrapper>
            <DrawBodyWrapper>
              <DrawExam>
                <Typography useGap={false}>30=</Typography>
                <Typography useGap={false}>45=</Typography>
                <Typography useGap={false}>60=</Typography>
              </DrawExam>
            </DrawBodyWrapper>
          </DrawingWrapper>
          <DrawingWrapper>
            <Drawing width='480px' height='333px' />
            <SvgIcon src={SmallPaperSVG} type={ESvgType.IMG} />
            <DrawTitleWrapper>
              <Typography useGap={false} weight={600}>
                30, 45, 60의 최소공배수 구하기
              </Typography>
            </DrawTitleWrapper>
            <DrawBodyWrapper>
              <DrawExam>
                <Typography useGap={false}>30=</Typography>
                <Typography useGap={false}>45=</Typography>
                <Typography useGap={false}>60=</Typography>
              </DrawExam>
            </DrawBodyWrapper>
          </DrawingWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <AnswerWrapper>
            <Typography useGap={false}>
              <div style={{ position: 'relative' }}>최대공약수:</div>
            </Typography>
            <Input
              inputSize='medium'
              width='339px'
              value={getValueInputData(0, 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(0, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(0, 'TEXT-0')}
            />
          </AnswerWrapper>
          <AnswerWrapper>
            <Typography useGap={false}>
              <div style={{ position: 'relative' }}>최소공배수:</div>
            </Typography>
            <Input
              inputSize='medium'
              width='339px'
              value={getValueInputData(1, 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(1, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(1, 'TEXT-0')}
            />
          </AnswerWrapper>
        </SectionWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default P01;

const Title = styled.div`
  margin-bottom: 38px;

  > span {
    position: absolute;
    top: 44px;
  }
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SectionWrapper = styled.section`
  display: flex;
  gap: 40px;
`;

const Paper = styled.div`
  position: relative;
`;

const QuestionArrow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DrawingWrapper = styled.div`
  position: relative;
  > img {
    position: absolute;
    bottom: 0;
  }
`;

const AnswerWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 9px;
  left: 63px;
  height: 42px;
`;

const DrawTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 69px;
  left: 63px;
  height: 42px;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 60px;
  left: 120px;
`;

const DrawBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 120px;
  left: 120px;
  width: 260px;
`;

const Exam = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-black);
  padding: 10px 0;
  span {
    line-height: 42px;
  }
`;

const DrawExam = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-black);
  padding: 10px 0;
  span {
    line-height: 42px;
  }
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-left: 50px;
`;

const Sup = styled.sup`
  vertical-align: super;
  font-size: initial;
`;

const ColorCircle = styled.div<{ color: 'yellow' | 'blue' | 'pink' }>`
  display: inline-block;
  text-align: center;
  line-height: 36px;
  background-color: var(
    ${({ color }) =>
      color === 'yellow' ? '--color-yellow-200' : color === 'blue' ? '--color-blue-100' : color === 'pink' ? '--color-pink-100' : '--color-white'}
  );
  width: 36px;
  height: 36px;
  border-radius: 100px;
  margin: 0 3px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: relative;
  top: 2px;
  left: 15px;
  width: fit-content;
`;
