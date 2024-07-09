import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  EStyleFontSizes,
  EStyleTableTypes,
  Table,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TD,
  Symbol,
  Dialog,
  Carousel,
  BoxWrap,
  DotIndicator,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';
import Slider from 'react-slick';

export interface IApiInfo {
  userId: number;
  pageIds: pageId[];
}

export interface IEM01901 {
  linkPageNodes: JSX.Element[];
  problemPages: string[];
  apiInfo?: IApiInfo;
  setCorrectCount?: Dispatch<SetStateAction<number>>;
}

const EM01901 = ({ linkPageNodes, problemPages, apiInfo, setCorrectCount }: IEM01901) => {
  let correctCount = 0;
  const tempScoreResult = Array(problemPages.length).fill('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<string[]>(Array(problemPages.length).fill(''));
  const sliderRef = useRef<Slider>(null);

  const onChangeSlide = (idx: number) => {
    setActiveIndex(idx);
  };

  const retrieveResult = async (index: number, userId: number, pageId: number) => {
    const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
    if (!isSubmitted) {
      return;
    } else {
      if (userSubmissionList[0].isCorrect) {
        correctCount++;
      }
      tempScoreResult[index] = userSubmissionList[0].isCorrect ? 'correct' : 'incorrect';
    }
  };

  const init = async () => {
    Promise.all(
      problemPages.map((value, index) => {
        const pageId = apiInfo?.pageIds.find(page => page.page === value)?.pageId;
        if (pageId) {
          return retrieveResult(index, apiInfo.userId, pageId);
        }
      }),
    ).then(() => {
      setScoreResult(tempScoreResult);
      setCorrectCount && setCorrectCount(correctCount);
    });
  };

  useEffect(() => {
    if (apiInfo?.pageIds.length && apiInfo?.pageIds.length > 0) {
      init();
    }
  }, [apiInfo?.pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={null}
      background={'var(--color-white)'}
      useRound
      submitDisabled={scoreResult.some(value => !value)}
      submitBtnColor={scoreResult.some(value => !value) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW}
      submitLabel='맞춤 학습하기'
      onSubmit={() => {
        setDialogOpen(!isDialogOpen);
      }}
    >
      <Box useFull>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['154px', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto']}>
          <TableMathCaption math={[]} caption='최종 결과' hidden />
          <THead hidden>
            <TR>
              <TH scope='row'>문제</TH>
              <TH scope='row'>결과</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                문제
              </TH>
              {scoreResult.map((value, index) => (
                <TD key={index} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT} width={100 / (problemPages.length + 1) + '%'}>
                  {index + 1}
                </TD>
              ))}
            </TR>
            <TR>
              <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                결과
              </TH>
              {scoreResult.map((value, index) => (
                <TD key={index} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {value === 'correct' ? <Symbol type='correct' /> : value === 'incorrect' ? <Symbol type='incorrect' /> : <></>}
                </TD>
              ))}
            </TR>
          </TBody>
        </Table>
        <Box marginTop='24px' hAlign='center'>
          <Typography>나는 {scoreResult.length}문제 중에서</Typography>
          <Typography size={EStyleFontSizes.LARGE} color='var(--color-blue-800)'>
            {scoreResult.filter(item => item === 'correct').length}
          </Typography>
          <Typography>문제를 맞혔어요.</Typography>
        </Box>
      </Box>
      <Dialog
        isShow={isDialogOpen}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setDialogOpen(false);
        }}
        onConfirm={() => {
          setDialogOpen(false);
        }}
      >
        <Box hAlign='center'>
          <Carousel
            slideWidth={930}
            infinite={false}
            arrowGap={0}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            dots={false}
            controller={({ goto }) => (
              <BoxWrap justifyContent='center' alignItems='center' position='absolute' left={0} right={0} bottom={0}>
                <DotIndicator length={linkPageNodes.length} activeNumber={activeIndex} onClick={idx => goto(idx)} />
              </BoxWrap>
            )}
          >
            {linkPageNodes}
          </Carousel>
        </Box>
      </Dialog>
    </Container>
  );
};

export default EM01901;
