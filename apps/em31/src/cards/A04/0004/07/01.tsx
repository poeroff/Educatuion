import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EDefaultInequalitySignType,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Label,
  SvgIcon,
  Tag,
  Typography,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container, IInequalitySignBoxProps, InequalitySignBox } from '@maidt-cntn/ui/math';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A04_0004_07 } from './store';

import empty_circle from '@/assets/icon/math_empty_circle.svg';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A04_0004_07);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionData: Array<IInequalitySignBoxProps> = [
    { toolTipId: '1', leftQuestionText: '20×6', rightQuestionText: '42×3' },
    { toolTipId: '2', leftQuestionText: '93×2', rightQuestionText: '31×6' },
  ];

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='부등호' src={empty_circle} size='48px' />
          &nbsp;{'안에 >, =, < 를 알맞게 써 넣으세요.'}
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const setValue = (type: EDefaultInequalitySignType, toolTipId: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${toolTipId}`]: type } }));
    changeData('P01', 1, Number(toolTipId), type);
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

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
    const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
    const isCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const canSubmit = () => {
    return isNotEmptyString(cardData.p01.answer1) && isNotEmptyString(cardData.p01.answer2);
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p01.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return !isShow ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.GRAY;
    }
  };

  const answer = '<, =';
  const explanation = `20×6=120, 42×3=126이므로 20×6<42×3입니다. \n93×2=186, 31×6=186이므로 93×2=31×6입니다.`;

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      useRound
    >
      <Box display='flex' justifyContent='center' flexWrap='wrap' gap='48px 24px'>
        {questionData.map(data => {
          return (
            <Box width='calc(50% - 12px)' hAlign='center' key={data.toolTipId}>
              <InequalitySignBox
                {...data}
                size='large'
                value={cardData.p01[`answer${data.toolTipId}` as keyof typeof cardData.p01] as EDefaultInequalitySignType}
                onChange={setValue}
                isError={
                  cardData.p01.isSubmitted &&
                  cardData.p01[`answer${data.toolTipId}` as keyof typeof cardData.p01] !==
                    cardData.p01[`solution${data.toolTipId}` as keyof typeof cardData.p01]
                }
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
          );
        })}
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{answer}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
            <Typography usePre>{explanation}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
