import { ChangeEvent, useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Typography,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission } from '@maidt-cntn/api';
import { L04C12A05, getUserSubmissionStore } from './store';

const PAGE = 'P02';

const P02 = () => {
  const content = `Today was my little brother’s birthday. My family went on a picnic. We bought a cake, a birthday hat, and nice presents for him. The weather was good and we took nice pictures. We all were happy. We had a good time.`;

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C12A05);
  const defaultSubmission = getUserSubmissionStore('', false);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            11.
          </Typography>
          <Typography fontSize='32px'>What did we buy for our little brother’s birthday?</Typography>
        </Box>
      </>
    ),
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(PAGE, 1, 1, value);
  };

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    submitDataWithResult(PAGE, getUserSubmissionStore(cardData.p02.answer, false), false);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
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
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer) ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={!cardData.p02.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap useFull marginTop={10} alignItems='center'>
        <Box background='white' useRound useFull lineHeight='40px' alignItems='center'>
          &nbsp;&nbsp;&nbsp;{content}
        </Box>

        <Box hAlign={'center'} useFull>
          <Textarea
            width='100%'
            height='200px'
            value={cardData.p02.answer}
            onChange={handleChangeValue}
            placeholder='내용을 넣어주세요.'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel='텍스트 입력란'
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
