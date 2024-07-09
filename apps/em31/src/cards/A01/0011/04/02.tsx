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
} from '@maidt-cntn/ui';
import { Container, IInequalitySignBoxProps, InequalitySignBox } from '@maidt-cntn/ui/math';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A01_0011_04 } from './store';

import empty_circle from '@/assets/icon/math_empty_circle.svg';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01_0011_04);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [isShow, setShow] = useState(false);

  const questionData: Array<IInequalitySignBoxProps> = [
    { toolTipId: '1', leftQuestionText: '367+232', rightQuestionText: '590' },
    { toolTipId: '2', leftQuestionText: '1810', rightQuestionText: '946+871' },
    { toolTipId: '3', leftQuestionText: '678-345', rightQuestionText: '333' },
    { toolTipId: '4', leftQuestionText: '166', rightQuestionText: '470-305' },
  ];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='부등호' src={empty_circle} size='48px' />
          &nbsp;{'안에 >, =, < 를 알맞게 써 넣으세요.'}
        </Box>
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const setValue = (type: EDefaultInequalitySignType, toolTipId: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, [`answer${toolTipId}`]: type } }));
    changeData('P02', 1, Number(toolTipId), type);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
    const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
    const isCorrect3 = isAnswer(cardData.p02.answer3, cardData.p02.solution3);
    const isCorrect4 = isAnswer(cardData.p02.answer4, cardData.p02.solution4);
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p02.answer4,
            isAnswer: true,
            isCorrect: isCorrect4,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const canSubmit = () => {
    return (
      isNotEmptyString(cardData.p02.answer1) &&
      isNotEmptyString(cardData.p02.answer2) &&
      isNotEmptyString(cardData.p02.answer3) &&
      isNotEmptyString(cardData.p02.answer4)
    );
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p02.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return !isShow ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.GRAY;
    }
  };

  const answer = '>, <, =, >';
  const explanation = `367+232=599 ➡ 599 > 590\n946+871=1817 ➡ 1810 < 1817\n678-345=333 ➡ 333=333\n470-305=165 ➡ 166 > 165`;

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center' flexWrap='wrap' gap='48px 24px'>
        {questionData.map(data => {
          return (
            <Box width='calc(50% - 12px)' hAlign='center' key={data.toolTipId}>
              <InequalitySignBox
                {...data}
                size='large'
                value={cardData.p02[`answer${data.toolTipId}` as keyof typeof cardData.p02] as EDefaultInequalitySignType}
                onChange={setValue}
                isError={
                  cardData.p02.isSubmitted &&
                  cardData.p02[`answer${data.toolTipId}` as keyof typeof cardData.p02] !==
                    cardData.p02[`solution${data.toolTipId}` as keyof typeof cardData.p02]
                }
                readOnly={cardData.p02.isSubmitted}
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
            <BoxWrap>
              <Box display={'flex'} flexDirection={'column'} marginLeft='96px' marginTop='12px' gap={'20px'}>
                <Typography usePre>{explanation}</Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
