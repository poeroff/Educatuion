import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EDefaultInequalitySignType,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, IInequalitySignBoxProps, InequalitySignBox } from '@maidt-cntn/ui/math';
import { C01_0011_31 } from './store';
import empty_circle from '@/assets/icon/math_empty_circle.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { checkAnswers } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
interface Tooltips {
  [key: string]: number;
}

const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0011_31);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [questionData, setQuestionData] = useState<Array<IInequalitySignBoxProps>>([
    { toolTipId: 'tooltip-1', leftQuestionText: '214+453', rightQuestionText: '670', value: cardData.p01.answer[0] as EDefaultInequalitySignType },
    { toolTipId: 'tooltip-2', leftQuestionText: '1460', rightQuestionText: '567+893', value: cardData.p01.answer[1] as EDefaultInequalitySignType },
    { toolTipId: 'tooltip-3', leftQuestionText: '856-315', rightQuestionText: '530', value: cardData.p01.answer[2] as EDefaultInequalitySignType },
    { toolTipId: 'tooltip-4', leftQuestionText: '320', rightQuestionText: '641-319', value: cardData.p01.answer[3] as EDefaultInequalitySignType },
  ]);

  const toolTipIdToIndex: Tooltips = {
    'tooltip-1': 0,
    'tooltip-2': 1,
    'tooltip-3': 2,
    'tooltip-4': 3,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='부등호' src={empty_circle} size='48px' />
          &nbsp;{'안에 >, =, < 를 알맞게 써 넣으세요.'}
        </Box>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = checkAnswers(cardData.p01.answer, cardData.p01.solution);
    const isAllCorrect = isCorrect.every(answer => answer);

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
            isCorrect: isCorrect[3],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const { userId } = useRecoilValue(studentAtom);
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
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
              ] || cardData.p01.answer,
            isCorrect:
              [
                userSubmissionList[0].inputData[0]?.isCorrect,
                userSubmissionList[0].inputData[1]?.isCorrect,
                userSubmissionList[0].inputData[2]?.isCorrect,
                userSubmissionList[0].inputData[3]?.isCorrect,
              ] || cardData.p01.isCorrect,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleOnChange = (type: EDefaultInequalitySignType, toolTipId: string) => {
    const subKey = toolTipIdToIndex[toolTipId] + 1;
    const inputAnswer = [...cardData.p01.answer];

    inputAnswer[toolTipIdToIndex[toolTipId]] = type;

    const newQuestionData = questionData.map(item => {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: inputAnswer } }));
      changeData('P01', 1, subKey, type);
      return item.toolTipId === toolTipId ? { ...item, value: type } : item;
    });
    setQuestionData(newQuestionData);
  };

  const isInputAnswer = () => {
    const answerList = [...cardData.p01.answer];
    const hasEmptyValue = answerList.some(element => element === '');

    return !hasEmptyValue;
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    setQuestionData([
      {
        ...questionData[0],
        value: cardData.p01.answer[0] as EDefaultInequalitySignType,
      },
      {
        ...questionData[1],
        value: cardData.p01.answer[1] as EDefaultInequalitySignType,
      },
      {
        ...questionData[2],
        value: cardData.p01.answer[2] as EDefaultInequalitySignType,
      },
      {
        ...questionData[3],
        value: cardData.p01.answer[3] as EDefaultInequalitySignType,
      },
    ]);
  }, [cardData.p01.answer]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isInputAnswer()}
      onSubmit={handleSubmit}
      useRound
    >
      <Box display='flex' justifyContent='center' flexWrap='wrap' gap='48px 24px'>
        {questionData.map(data => {
          return (
            <Box width='calc(50% - 12px)' hAlign='center' key={data.toolTipId}>
              <InequalitySignBox
                {...data}
                size='large'
                onChange={handleOnChange}
                isError={cardData.p01.isSubmitted && !cardData.p01.isCorrect[toolTipIdToIndex[data.toolTipId]]}
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
          );
        })}
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              {'<'},{'='},{'>'},{'<'}
            </Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box width='calc(50% - 12px)' marginTop='12px'>
            <Typography>214+453=667 ➡ 667{'<'}670</Typography>
            <Typography>567+893=1460 ➡ 1460{'='}1460</Typography>
            <Typography>856-315=1271 ➡ 541{'<'}530</Typography>
            <Typography>641-319=743 ➡ 320{'<'}322</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
