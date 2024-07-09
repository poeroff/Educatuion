import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  PinchZoom,
  Image,
  EStyleButtonTypes,
  IQuestionProps,
  Textarea,
  BoxWrap,
  BottomSheet,
  ETagLine,
  Tag,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C09A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const PAGE_NUMBER = 'P05';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };
  const questionInfo: IQuestionProps = {
    text: 'Write about the experiment based on Page 1~4 and revise it.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p05.answer,
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const answerChecker = (answer: string) => {
    const formattedInput = answer.replace(/\s+/g, '').toLowerCase();

    if (answer.trim().includes(' ')) {
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    const { answer, isSubmitted } = cardData.p05;
    if (!isSubmitted) {
      const isCorrect = answerChecker(answer);
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const handleAnswerChange = (event: any) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
  };

  const getButtonColor = () => {
    const { isSubmitted, answer } = cardData.p05;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p05.isSubmitted ? '완료하기' : !isAnswerShow ? '답안 보기' : '답안 닫기'}
      submitDisabled={(cardData.p05.isSubmitted || !cardData.p05.answer) && !cardData.p05.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L03/C09/A03/HE1-L03-C09-A03-P05.jpg'}
              width='450px'
              height='280px'
              alt='여학생이 연단에 서서 연설을 하는 모습'
              title='여학생이 연단에 서서 연설을 하는 모습'
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea value={cardData.p05.answer} onChange={e => handleAnswerChange(e)} placeholder='내용을 넣어 주세요.' />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='25px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Scroll>{cardData.p05.solution}</Scroll>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
