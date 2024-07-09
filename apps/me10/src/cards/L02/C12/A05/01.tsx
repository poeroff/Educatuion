import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C12A05, getUserSubmissionStoreP01 } from './store';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission } from '@maidt-cntn/api';

const PAGE = 'P01';

const P01 = () => {
  const content1 = `Jihun and Minjun `;
  const content2 = ` . Jihun goes to the library. He needs some books for his homework. Minjun turns on the computer and surfs the Internet. He gets help from the Internet.`;

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C12A05);
  const defaultSubmission = getUserSubmissionStoreP01(0, false);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            10.
          </Typography>
          <Typography fontSize='32px'>다음 글의 빈칸에 들어갈 말로 알맞은 것을 골라 봅시다.</Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const buttons = [
    {
      text: 'are going to school',
    },
    {
      text: 'are doing their homework',
    },
    {
      text: 'are reading different books',
    },
  ];

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData(PAGE, 1, 1, index);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p01.answer === cardData.p01.solution;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    submitDataWithResult(PAGE, getUserSubmissionStoreP01(cardData.p01.answer, isCorrect), isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0].isCorrect,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      submitLabel={!cardData.p01.isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={cardData.p01.answer === -1}
      submitBtnColor={cardData.p01.answer === -1 ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={!cardData.p01.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap useFull marginTop={10} alignItems='center'>
        <Box background='white' useRound useFull height='350px' lineHeight='40px' alignItems='center'>
          <Scroll tabIndex={0}>
            <Typography usePre>
              {content1}
              <Typography type='blank' title='빈칸' width='100px' boxColor='var(--color-black)' />
              {content2}
            </Typography>
          </Scroll>
        </Box>

        <Box hAlign={'center'} useFull>
          <List
            data={buttons}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                ariaLabel={index + '번 보기'}
                value={index === cardData.p01.answer}
                onClick={() => handleChangeValue(index)}
                readOnly={cardData.p01.isSubmitted}
                isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                gap={10}
              >
                <Box height='50px' alignContent='center'>
                  <Label value={index} /> {value?.text}
                </Box>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
