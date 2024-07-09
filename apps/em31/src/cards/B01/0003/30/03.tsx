import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Box, Typography, Input, Label, IQuestionProps, EStyleButtonTypes, BottomSheet, InputStatus } from '@maidt-cntn/ui';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import AnswerSheet03 from './AnswerSheet03';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { B01000330_Atom } from './store';

const P03 = () => {
  const CURRENT_PAGE = 'P03';
  const headerInfo = null;

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B01000330_Atom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        <Typography fontSize='36px' weight={'var(--font-weight-medium)'}>
          4장의 카드에 쓰인 수 중에서 가장 큰 수와 가장 작은 수의 합을 구해 보세요.
        </Typography>
      </>
    ),
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 3,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, []);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0].value || cardData.p03.answer1,
            isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0].value ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const submitAnswer = () => {
    const correct = cardData.p03.answer1 === cardData.p03.solution1;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: correct } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 3,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1,
            isAnswer: true,
            isCorrect: correct,
          },
        ],
        isCorrect: correct,
      },
    ];
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    changeData('P03', 3, 1, value);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      bodyId='targetContainer'
      submitBtnColor={
        isNotEmptyString(cardData.p03.answer1) ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!isNotEmptyString(cardData.p03.answer1)}
      submitLabel={cardData.p03.isSubmitted ? (isShowBottom ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <Box justifyContent={'center'} type='dashed' display={'flex'} flexDirection={'row'} useRound gap={24}>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='첫번째 카드 : 338' tabIndex={102}>
              338
            </Typography>
          </Box>
        </Box>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='두번째 카드 : 176' tabIndex={103}>
              176
            </Typography>
          </Box>
        </Box>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='세번째 카드 : 329' tabIndex={104}>
              329
            </Typography>{' '}
          </Box>
        </Box>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='네번째 카드 : 405' tabIndex={105}>
              405
            </Typography>{' '}
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent='center' marginTop='20px'>
        <Input
          maxLength={100}
          readOnly={cardData.p03.isSubmitted}
          width='263px'
          status={cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE}
          value={cardData.p03.answer1}
          onChange={event => handleChange(event.target.value)}
          ariaLabel='답란'
          tabIndex={106}
        />
      </Box>
      <BottomSheet
        bottomSheetTargetId={'targetContainer'}
        height='50%'
        show={isShowBottom}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <AnswerSheet03 />
      </BottomSheet>
    </Container>
  );
};

export default P03;
