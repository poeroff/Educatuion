import {
  Box,
  Typography,
  Input,
  Label,
  TMainHeaderInfoTypes,
  IQuestionProps,
  EStyleFontSizes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { C01_0004_10 } from './store';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_10);
  const { userId } = useRecoilValue(studentAtom);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='3' type='icon' />
        <Box display='flex' flexWrap='wrap'>
          수 카드
          <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginLeft={'5px'} marginRight={'5px'}>
            4
          </Box>
          ,
          <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginRight={'5px'}>
            2
          </Box>
          ,
          <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginRight={'5px'}>
            8
          </Box>
          <span>을 한 번씩만 이용하여 세 자리 수를 만</span>들려고 합니다 . 만들 수 있는 가장 큰 수와 가장 작은 수의 합을 구해 보세요 .
        </Box>
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const setSubmitBtnColor = () => {
    if (!isNotEmptyString(cardData.p03.answer1)) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (showAnswer) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p03.isSubmitted && showAnswer) {
      return '답안닫기';
    } else if (cardData.p03.isSubmitted && !showAnswer) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = cardData.p03.solution1 === cardData.p03.answer1.trim();
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    changeData('P03', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

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
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={!isNotEmptyString(cardData.p03.answer1)}
      useRound
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box display='flex'>
          <Box background='yellow' hAlign='center' width={'80px'} height={'100px'} marginRight={'20px'}>
            <Typography size={EStyleFontSizes.LARGE}>4</Typography>
          </Box>
          <Box background='yellow' hAlign='center' width={'80px'} height={'100px'} marginRight={'20px'}>
            <Typography size={EStyleFontSizes.LARGE}>2</Typography>
          </Box>
          <Box background='yellow' hAlign='center' width={'80px'} height={'100px'}>
            <Typography size={EStyleFontSizes.LARGE}>8</Typography>
          </Box>
        </Box>

        <Box marginTop='20px'>
          <Input
            width='263px'
            value={cardData.p03.answer1}
            readOnly={cardData.p03.isSubmitted}
            onChange={event => handleChange(event.target.value)}
            ariaLabel='1번 답란'
            status={
              !cardData.p03.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p03.solution1 === cardData.p03.answer1.trim()
                ? InputStatus.ENABLE
                : InputStatus.ERROR
            }
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>1090</Typography>
          </Box>

          <Box marginTop={'20px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>만들 수 있는 가장 큰 세 자리 수는 842이고 가장 작은 세 자리 수는 248입니다.</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>842 + 248 = 1090</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
