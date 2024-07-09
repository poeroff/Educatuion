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

import empty_circle from '@/assets/icon/math_empty_circle.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C04_0009_32 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C04_0009_32);
  const [isShow, setShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const [questionData, setQuestionData] = useState<IInequalitySignBoxProps>({
    toolTipId: 'tooltip-1',
    leftQuestionText: '51×7',
    rightQuestionText: '78×4',
    value: undefined,
  });

  const handleOnChange = (type: EDefaultInequalitySignType, toolTipId: string) => {
    const newQuestionData = questionData.toolTipId === toolTipId ? { ...questionData, value: type } : questionData;
    setQuestionData(newQuestionData);

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: type } }));

    changeData('P01', 1, 1, type);
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
        setQuestionData({ ...questionData, value: userSubmissionList[0].inputData[0]?.value || undefined });
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='부등호' src={empty_circle} size='48px' />
          &nbsp;{'안에 >, =, < 를 알맞게 써 넣으세요.'}
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer}
      submitBtnColor={!cardData.p01.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={onGrade}
      useRound
    >
      <Box display='flex' justifyContent='center' flexWrap='wrap' gap='48px 24px'>
        <Box width='calc(50% - 12px)' hAlign='center' key={questionData.toolTipId}>
          <InequalitySignBox
            {...questionData}
            size='large'
            onChange={handleOnChange}
            readOnly={cardData.p01.isSubmitted}
            isError={cardData.p01.isSubmitted && !cardData.p01.isCorrect}
          />
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'>'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>51×7=357, 78×4=312이므로 357{'>'}312입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
