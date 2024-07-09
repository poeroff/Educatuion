import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  SvgIcon,
  Symbol,
  Tag,
  TextView,
  TextViewTitle,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { DialogContainer } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { C02000111_store } from '@/cards/C02/0001/11/store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02000111_store);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageKey = 'p01';
  const pageNo = 'P01';

  const imgSrc = '/C02/0001/11/DEC312002.png';
  const imgAlt =
    '첫 번째 빈칸은 삼각형과 사각형에서 곧은 선을 가리키는 그림입니다. 두 번째 빈칸은 삼각형과 사각형에서 두 곧은 선이 만나는 점을 가리키는 그림입니다.';

  const explanation = '삼각형과 사각형에서 곧은 선은 변, 두 곧은 선이 만나는 점은 꼭짓점입니다.';

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
      <Box vAlign='center' hAlign={'center'}>
        <SvgIcon src={headerIcon} size={'36px'} />
        <TextViewTitle title={'보기'} />
        <Typography>
          에서 알맞은 말을 찾아 <Symbol type='blank' blankType='square' size={36} /> 안에 써넣으세요.
        </Typography>
      </Box>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleChangeInput = (value: string, index: number) => {
    const newValues = [...cardData[pageKey].answers];
    newValues[index] = value;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answers: newValues } }));
    changeData(pageNo, 1, 1, newValues);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShowAnswer(!showAnswer);
      return;
    }
    const markings = cardData[pageKey].solutions.map((ans, idx) => isAnswer(cardData[pageKey].answers[idx], ans));
    const isCorrect = markings.every(marking => marking);

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

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
      vAlign='flex-start'
      submitDisabled={checkDisableInput()}
      bodyId={'dialogContainer1'}
    >
      <Box gap={20} vAlign={'center'} hAlign={'center'} useFull>
        <Box>
          <TextView title='보기' hAlign='center' vAlign={'center'}>
            <Typography size={EStyleFontSizes.MEDIUM}>꼭짓점</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>변</Typography>
          </TextView>
        </Box>
        <Box>
          <Image src={imgSrc} width='450px' height={'250px'} altText={imgAlt} />
          <Typography style={{ position: 'absolute', top: '20px', left: '510px' }}>꼭짓점</Typography>
          <Box position={'absolute'} top={'120px'} left={'505px'}>
            <Input
              width={'120px'}
              value={cardData[pageKey].answers[0]}
              onChange={e => handleChangeInput(e.target.value, 0)}
              ariaLabel={`1번째 답란`}
              readOnly={cardData[pageKey].isSubmitted}
              status={getStatus(cardData[pageKey].answers[0], cardData[pageKey].solutions[0])}
            />
          </Box>
          <Box position={'absolute'} top={'240px'} left={'505px'}>
            <Input
              width={'120px'}
              value={cardData[pageKey].answers[1]}
              onChange={e => handleChangeInput(e.target.value, 1)}
              ariaLabel={`2번째 답란`}
              readOnly={cardData[pageKey].isSubmitted}
              status={getStatus(cardData[pageKey].answers[1], cardData[pageKey].solutions[1])}
            />
          </Box>
        </Box>
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
