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
} from '@maidt-cntn/ui';
import { ChangeEvent, useEffect, useState } from 'react';
import { B02_0004_30 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';

const P02 = ({ pageKey = 'P02' }: { pageKey?: string }) => {
  const storeKey = 'P02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B02_0004_30);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const isDisabled = Object.keys(cardData[storeKey].answer).some(key => !cardData[storeKey].answer[key]);

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='2' type='icon' />
        각의 수가 가장 많은 도형부터 차례로 기호를 써 보세요.
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
        {
          subKey: 3,
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
      const isCorrect3 = isAnswer(cardData[storeKey].answer.value3, cardData[storeKey].solution.value3);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

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
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData[storeKey].answer.value3,
              isAnswer: true,
              isCorrect: isCorrect3,
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
              {
                value1: userSubmissionList[0].inputData[0]?.value,
                value2: userSubmissionList[0].inputData[1]?.value,
                value3: userSubmissionList[0].inputData[2]?.value,
              } || cardData[storeKey].answer,
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
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel={cardData[storeKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
      useExtend
    >
      <Box display='flex' vAlign='center' flexDirection='column' useFull>
        <Box width='800px' marginTop={24} padding='24px' type='dashed' hAlign='center' useRound>
          <Image src='/C02/0004/10/EC31217.png' alt='가는 사각형, 나는 원, 다는 삼각형이 그려진 그림입니다.' width='700px' />
        </Box>
        <Box vAlign='center' marginTop='70px'>
          <Box flexDirection='column' vAlign='center'>
            <Box display='flex' flexDirection='row'>
              <Box>
                <Input
                  name='value1'
                  value={cardData[storeKey].answer.value1}
                  onChange={e => handleInputChangeEvent(e, 1)}
                  width='52px'
                  maxLength={1}
                  ariaLabel='첫 번째로 가장 많은 각을 가진 도형의 기호'
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
                <Typography>,</Typography>
              </Box>
              <Box marginLeft='5px'>
                <Input
                  name='value2'
                  value={cardData[storeKey].answer.value2}
                  onChange={e => handleInputChangeEvent(e, 2)}
                  width='52px'
                  maxLength={1}
                  ariaLabel='두 번째로 가장 많은 각을 가진 도형의 기호'
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
                <Typography>,</Typography>
              </Box>
              <Box marginLeft='5px'>
                <Input
                  name='value3'
                  value={cardData[storeKey].answer.value3}
                  onChange={e => handleInputChangeEvent(e, 3)}
                  width='52px'
                  maxLength={1}
                  ariaLabel='세 번째로 가장 많은 각을 가진 도형의 기호'
                  readOnly={cardData[storeKey].isSubmitted}
                  status={
                    cardData[storeKey].isSubmitted &&
                    !cardData[storeKey].isCorrect &&
                    !isAnswer(cardData[storeKey].answer.value3, cardData[storeKey].solution.value3)
                      ? InputStatus.ERROR
                      : cardData[storeKey].isSubmitted
                      ? InputStatus.ENABLE
                      : isNotEmptyString(cardData[storeKey].answer.value3)
                      ? InputStatus.ENABLE
                      : InputStatus.DEFAULT
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>가, 다, 나</Typography>
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
    </Container>
  );
};

export default P02;
