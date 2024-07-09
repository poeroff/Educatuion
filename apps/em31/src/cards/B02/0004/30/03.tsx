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
import { isAnswer, isNotEmptyString, isNumber } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';

const P03 = ({ pageKey = 'P03' }: { pageKey?: string }) => {
  const storeKey = 'P03';

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
        <Label value='3' type='icon' />
        도형에서 찾을 수 있는 크고 작은 각은 모두 몇 개인가요?
      </>
    ),
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, subKey: number) => {
    const { name, value } = e.target;

    if (!isNumber(value)) return;

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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[storeKey].isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = isAnswer(cardData[storeKey].answer.value1, cardData[storeKey].solution.value1);

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
      <Box tabIndex={101} display='flex' vAlign='center' flexDirection='column' useFull>
        <Box width='800px' padding='24px' hAlign='center' useRound>
          <Image src='/C02/0004/10/DIC312005.png' alt='세 각이 붙어서 하나의 큰 각으로 그려진 그림입니다.' height='300px' />
        </Box>
        <Box vAlign='center' marginTop='15px'>
          <Box flexDirection='column' vAlign='center'>
            <Box display='flex' flexDirection='row'>
              <Box>
                <Label
                  value='답'
                  color='var(--color-yellow-800)'
                  background='var(--color-yellow-100)'
                  lineColor='var(--color-yellow-700)'
                  marginRight={10}
                />
                <Input
                  name='value1'
                  value={cardData[storeKey].answer.value1}
                  onChange={e => handleInputChangeEvent(e, 1)}
                  width='52px'
                  maxLength={1}
                  ariaLabel='답란'
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
                <Typography>개</Typography>
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
            <Typography usePre>6</Typography>
          </Box>
          <Box marginTop='10px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='풀이' />
            </Box>
            <Box marginTop='12px'>
              <Box display='flex' flexDirection='row' marginBottom='20px'>
                <Box>
                  <Image src='/C02/0004/10/DIC312005(sol).png' alt='세 각이 붙어서 하나의 큰 각으로 그려진 그림입니다.' width='150px' />
                </Box>
                <Box display='flex' flexDirection='column' marginLeft='10px'>
                  <Typography>• 작은 각 1개짜리: ①, ②, ③ ➡ 3개</Typography>
                  <Typography>• 작은 각 2개짜리: ① + ②, ② + ③ ➡ 2개</Typography>
                  <Typography>• 작은 각 3개짜리: ① + ② + ③ ➡ 1개</Typography>
                </Box>
              </Box>
              <Typography>따라서 찾을 수 있는 크고 작은 각은 모두 ③ + ② + ① = 6(개)입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
