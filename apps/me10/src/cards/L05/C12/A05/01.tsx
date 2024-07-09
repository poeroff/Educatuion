import { ChangeEvent, useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L05C12A05 } from './store';

const PAGE = 'P01';

const P01 = () => {
  const content1 = `Minsu takes his own water bottle everywhere for the e`;
  const content2 = `. Today, he went to cafe for a drink. They filled his bottle with lemonade. They also gave him a discount. Why don’t you carry your own water bottle? It helps the environment. It saves money, too.`;

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C12A05);
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
          <Typography fontSize='32px'>다음 글에서 빈칸에 알맞은 말을 찾아 써 봅시다.</Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData(PAGE, 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect = isAnswer(cardData.p01.answer, cardData.p01.solution);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE, userSubmission, isCorrect);
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
      initData(PAGE, userSubmissionList, [], isSubmitted);
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
      submitDisabled={!isNotEmptyString(cardData.p01.answer)}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer) ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={!cardData.p01.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap useFull marginTop={10} alignItems='center'>
        <Box background='white' useRound useFull lineHeight='40px' alignItems='center'>
          <Typography useGap={false}>
            &nbsp;&nbsp;&nbsp;{content1}
            <Typography type='blank' title='빈칸' width='100px' boxColor='var(--color-black)' />
            {content2}
          </Typography>
        </Box>

        <Box hAlign={'center'} useFull>
          <Textarea
            width='100%'
            height='200px'
            value={cardData.p01.answer}
            onChange={handleChangeValue}
            placeholder='내용을 넣어주세요.'
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='텍스트 입력란'
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution.join(', ')}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
