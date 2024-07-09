import { ChangeEvent, useEffect, useState } from 'react';
import {
  BottomSheet,
  Typography,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Input,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L05C12A05 } from './store';

const PAGE = 'P02';

const P02 = () => {
  const content1 = `Minsu takes his own water bottle everywhere for the e`;
  const content2 = `. Today, he went to cafe for a drink. They filled his bottle with lemonade. They also gave him a discount. Why don’t you carry your own water bottle? It helps the environment. It saves money, too.`;

  const content3 = 'He brought';

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
            11.
          </Typography>
          <Typography fontSize='32px'> How did Minsu get a discount?</Typography>
        </Box>
      </>
    ),
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(PAGE, 1, 1, value);
  };

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect: false,
          },
        ],
        isCorrect: false,
      },
    ];
    submitDataWithResult(PAGE, userSubmission, false);
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
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer) ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={!cardData.p02.isSubmitted ? handleSubmit : handleShowAnswer}
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
          <Typography>
            {content3}
            <Input
              width='65%'
              value={cardData.p02.answer}
              placeholder='내용을 넣어주세요.'
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='텍스트 입력란'
              onChange={handleChangeValue}
              tabIndex={103}
              maxLength={999}
            />
          </Typography>
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
