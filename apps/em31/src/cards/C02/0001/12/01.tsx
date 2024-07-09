import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  SvgIcon,
  Table,
  Tag,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { DialogContainer } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C02000112_store } from '@/cards/C02/0001/12/store';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02000112_store);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageKey = 'p01';
  const pageNo = 'P01';
  const td_arr = ['삼각형의 변의 수(개)', '사각형의 꼭짓점의 수(개)'];
  const explanation = '삼각형은 변이 3개인 도형이고, 사각형은 꼭짓점이 4개인 도형입니다.';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size={'36px'} />
        <Typography> 빈칸에 알맞은 수를 써넣으세요.</Typography>
      </Box>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleChangeInput = (value: string, index: number) => {
    if (!Number.isNaN(Number(value))) {
      const newValues = [...cardData[pageKey].answers];
      newValues[index] = value;

      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answers: newValues } }));
      changeData(pageNo, 1, 1, newValues);
    }
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShowAnswer(!showAnswer);
      return;
    }
    const markings = cardData[pageKey].solutions.map((ans, idx) => isAnswer(cardData[pageKey].answers[idx], ans));
    const isCorrect = markings.every(marking => marking);

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answers,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const checkDisableInput = (): boolean => {
    return !cardData[pageKey].answers?.every(val => val);
  };

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer.toString())
      ? InputStatus.DEFAULT
      : cardData[pageKey].isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answers: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitBtnColor={
        cardData[pageKey].isSubmitted || cardData[pageKey].answers?.every(val => val)
          ? showAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData[pageKey].isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={checkDisableInput()}
      bodyId={'dialogContainer1'}
    >
      <Box justifyContent={'center'} vAlign='center' useFull>
        <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['421px', '221px']}>
          <TBody>
            {td_arr.map((value, index) => (
              <TR key={index}>
                <TH scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                  {value}
                </TH>
                <TD key={index} hAlign='center' vAlign='middle' color={EStyleTableTypes.YELLOW_SECONDARY}>
                  <Input
                    value={cardData[pageKey].answers[index]}
                    onChange={e => handleChangeInput(e.target.value, index)}
                    ariaLabel={`${index + 1}번째 답란`}
                    readOnly={cardData[pageKey].isSubmitted}
                    status={getStatus(cardData[pageKey].answers[index], cardData[pageKey].solutions[index])}
                  />
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>

      <BottomSheet bottomSheetTargetId='dialogContainer1' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData[pageKey].solutions.join(', ').toString()}</Typography>
          </Box>
          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{explanation}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P01;
