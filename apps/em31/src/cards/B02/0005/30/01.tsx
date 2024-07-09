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
import { B02_0005_30 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';

const P01 = ({ pageKey = 'P01' }: { pageKey?: string }) => {
  const storeKey = 'P01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B02_0005_30);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const isDisabled = Object.keys(cardData[storeKey].answer).some(key => !cardData[storeKey].answer[key]);

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        직각을 모두 찾아 써 보세요.
      </>
    ),
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, subKey: number) => {
    const { name, value } = e.target;

    const userInputs = {
      ...cardData[storeKey].answer,
      [name]: value.trim(),
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

  const isAnswer = (input1: string, input2: string): boolean => {
    if (input1 === 'ㄱㅁㄴ' || input1 === 'ㄴㅁㄱ') {
      return input2 === 'ㄷㅁㄹ' || input2 === 'ㄹㅁㄷ';
    } else if (input1 === 'ㄷㅁㄹ' || input1 === 'ㄹㅁㄷ') {
      return input2 === 'ㄱㅁㄴ' || input2 === 'ㄴㅁㄱ';
    }
    return false;
  };

  const handleSubmit = () => {
    if (cardData[storeKey].isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = isAnswer(cardData[storeKey].answer.value1, cardData[storeKey].answer.value2);
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
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[storeKey].answer.value2,
              isAnswer: true,
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
      <BoxWrap>
        <Box display='flex' vAlign='center' flexDirection='column' useFull>
          <Box width='500px' marginTop={24} padding='20px' type='dashed' hAlign='center' useRound>
            <Image
              src='/C02/0005/10/EC31223.png'
              alt='반직선 ㅁㄱ, 반직선 ㅁㄴ, 반직선 ㅁㄷ, 반직선 ㅁㄹ에서 각 ㄱㅁㄹ은 직각보다 큰 각, 각 ㄴㅁㄷ은 직각보다 작은 각, 나머지 두 각은 직각이 그려진 그림입니다.'
              height='300px'
            />
          </Box>
          <Box vAlign='center' marginTop='15px'>
            <Box flexDirection='column' vAlign='center'>
              <Box display='flex' flexDirection='row'>
                <Box>
                  <Typography>각 </Typography>
                  <Input
                    name='value1'
                    value={cardData[storeKey].answer.value1}
                    onChange={e => handleInputChangeEvent(e, 1)}
                    width='120px'
                    maxLength={3}
                    ariaLabel='첫번째 직각 답란'
                    readOnly={cardData[storeKey].isSubmitted}
                    status={
                      cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect
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
                <Box marginLeft='10px'>
                  <Typography>각 </Typography>
                  <Input
                    name='value2'
                    value={cardData[storeKey].answer.value2}
                    onChange={e => handleInputChangeEvent(e, 2)}
                    width='120px'
                    maxLength={3}
                    ariaLabel='두번째 직각 답란'
                    readOnly={cardData[storeKey].isSubmitted}
                    status={
                      cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>ㄱㅁㄴ 또는 ㄴㅁㄱ, ㄷㅁㄹ 또는 ㄹㅁㄷ</Typography>
          </Box>
          <Box marginTop='10px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='풀이' />
            </Box>
            <Box marginTop='12px'>
              <Box display='flex' justifyContent='center' width='150px'>
                <Image src='/C02/0005/10/EC31223(sol).png' alt='각 ㄱㅁㄴ, 각 ㄷㅁㄹ에 직각 표시가 그려진 그림입니다.' width='150px' />
              </Box>
              <Typography usePre>{cardData[storeKey].commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
