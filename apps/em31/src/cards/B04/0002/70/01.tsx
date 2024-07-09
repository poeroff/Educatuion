import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { B04_0002_70 } from './store';

const P01 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B04_0002_70);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        어떤 두 자리 수에 3을 곱하면 30입니다. 이 두 자리 수에 8을 곱한 값을 구해 보세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isAllCorrect),
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleOnChange = (value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value: value } } }));
    changeData('P01', 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p01.answer1.value.trim() === cardData.p01.answer1.solution;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: {
          ...cardData.p01.answer1,
          isCorrect: isCorrect,
        },
        isAllCorrect: isCorrect,
        isSubmitted: true,
      },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1.value,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1:
              { ...prev.p01.answer1, value: userSubmissionList[0]?.inputData[0]?.value, isCorrect: userSubmissionList[0]?.inputData[0]?.isCorrect } ||
              cardData.p01.answer1,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p01.answer1.value ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p01.answer1.value === ''}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      bodyId={'targetContainer'}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            type={'number'}
            value={cardData.p01.answer1.value}
            onChange={e => handleOnChange(e.target.value)}
            width='130px'
            ariaLabel='3을 곱하면 30이 되는 수에 8을 곱한 값'
            status={
              !isNotEmptyString(cardData.p01.answer1.value)
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box display={'flex'} marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p01.answer1.solution}</Typography>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} marginTop='12px'>
              <Typography size={EStyleFontSizes.MEDIUM}>
                {`어떤 두 자리 수를 □라고 하면 □×3=30이고,
                  3을 곱하여 30이 되는 수는 10입니다.
                  따라서 10에 8을 곱하면 10×8=80입니다.`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
