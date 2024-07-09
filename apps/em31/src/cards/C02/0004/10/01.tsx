import {
  Box,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Image,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  BoxWrap,
} from '@maidt-cntn/ui';
import { ChangeEvent, useEffect, useState } from 'react';
import { C02_0004_10 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P01 = ({ pageKey = 'P01' }: { pageKey?: string }) => {
  const storeKey = 'P01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C02_0004_10);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const isDisabled = Object.keys(cardData[storeKey].answer).some(key => !cardData[storeKey].answer[key]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        알맞은 각을 그린 것을 찾아 기호를 써 보세요.
      </>
    ),
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, subKey: number) => {
    const { name, value } = e.target;

    const userInputs = {
      ...cardData[storeKey].answer,
      [name]: value,
    };

    setCardData(prev => ({
      ...prev,
      [storeKey]: {
        ...prev[storeKey],
        answer: userInputs,
      },
    }));
    changeData(pageKey, 1, subKey, userInputs);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[storeKey].isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect1 = isAnswer(cardData[storeKey].answer.value1, cardData[storeKey].solution.value1);
      const isCorrect2 = isAnswer(cardData[storeKey].answer.value2, cardData[storeKey].solution.value2);
      const isCorrect = isCorrect1 && isCorrect2;

      setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[storeKey].answer.value1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[storeKey].answer.value2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            answer:
              { value1: userSubmissionList[0].inputData[0]?.value, value2: userSubmissionList[0].inputData[1]?.value } || cardData[storeKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, [pageKey]);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      bodyId='targetContainer1'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[storeKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box display='flex' vAlign='center' flexDirection='column' useFull>
          <Box width='750px' marginTop={24} padding='24px' type='dashed' hAlign='center' useRound>
            <Image
              src='/C02/0004/10/DIC312004.png'
              alt='㉠은 점 ᄆ에서 반직선 ᄆᄃ과 반직선 ᄆᄅ을 그은 그림입니다. ㉡은 점 ᄅ에서 반직선 ᄅᄆ과 반직선 ᄅᄃ을 그은 그림입니다. ㉢은 점 ᄃ에서 반직선 ᄃᄆ과 반직선 ᄃᄅ을 그은 그림입니다.'
              width='700px'
            />
          </Box>
          <Box vAlign='center' marginTop='24px'>
            <Box flexDirection='column' vAlign='center'>
              <Box display='flex' flexDirection='row'>
                <Box>
                  <Typography>각 ㄷㅁㄹ:</Typography>
                  <Input
                    name='value1'
                    value={cardData[storeKey].answer.value1}
                    onChange={e => handleInputChangeEvent(e, 1)}
                    width='52px'
                    maxLength={1}
                    ariaLabel='각 ㄷㅁㄹ의 답란'
                    readOnly={cardData[storeKey].isSubmitted}
                    status={
                      cardData[storeKey].isSubmitted &&
                      !cardData[storeKey].isCorrect &&
                      !isAnswer(cardData[storeKey].answer.value1, cardData[storeKey].solution.value1)
                        ? InputStatus.ERROR
                        : cardData[storeKey].isSubmitted
                        ? InputStatus.ENABLE
                        : isNotEmptyString(cardData[storeKey].answer.value1)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                  />
                </Box>
                <Box marginLeft='50px'>
                  <Typography>각 ㅁㄷㄹ:</Typography>
                  <Input
                    name='value2'
                    value={cardData[storeKey].answer.value2}
                    onChange={e => handleInputChangeEvent(e, 2)}
                    width='52px'
                    maxLength={1}
                    ariaLabel='각 ㅁㄷㄹ의 답란'
                    readOnly={cardData[storeKey].isSubmitted}
                    status={
                      cardData[storeKey].isSubmitted &&
                      !cardData[storeKey].isCorrect &&
                      !isAnswer(cardData[storeKey].answer.value2, cardData[storeKey].solution.value2)
                        ? InputStatus.ERROR
                        : cardData[storeKey].isSubmitted
                        ? InputStatus.ENABLE
                        : isNotEmptyString(cardData[storeKey].answer.value2)
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer1' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>㉠, ㉢</Typography>
          </Box>
          <Box marginTop='10px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='풀이' />
            </Box>
            <Box marginTop='12px'>
              <Typography usePre>{cardData[storeKey].commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P01;
