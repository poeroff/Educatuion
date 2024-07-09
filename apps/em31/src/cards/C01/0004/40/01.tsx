import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { C01000440 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { checkExpression } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01000440);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        과수원에서 사과를 오전에 468개, 오후에 295개 땄습니다. 딴 사과는 모두 몇 개인가요?
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
      ],
    },
  ];

  const handleInputChange = (subkey: number, value: string) => {
    if (subkey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, value1: value } }));
    } else if (subkey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, value2: value } }));
    }
    changeData('P01', 1, subkey, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = checkExpression(cardData.p01.value1, cardData.p01.answer1);
      const isCorrect2 = isAnswer(cardData.p01.value2, cardData.p01.answer2);
      const isCorrect = isCorrect1 && isCorrect2;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.value1,
              isCorrect: checkExpression(cardData.p01.value1, cardData.p01.answer1),
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.value2,
              isCorrect: isAnswer(cardData.p01.value2, cardData.p01.answer2),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
      setCardData(prev => ({
        ...prev,
        p01: { ...prev.p01, isCorrect: isCorrect, isCorrect1: isCorrect1, isCorrect2: isCorrect2, isSubmitted: true },
      }));
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
            value1: userSubmissionList[0].inputData[0]?.value || cardData.p01.value1,
            value2: userSubmissionList[0].inputData[1]?.value || cardData.p01.value2,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p01.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p01.isCorrect2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!cardData.p01.value1 || !cardData.p01.value2}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.value1) || !isNotEmptyString(cardData.p01.value2)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              readOnly={cardData.p01.isSubmitted}
              maxLength={50}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p01.value1}
              onChange={e => {
                handleInputChange(1, e.target.value);
              }}
              ariaLabel='식을 적어주세요.'
              status={cardData.p01.isSubmitted && !cardData.p01.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              readOnly={cardData.p01.isSubmitted}
              maxLength={50}
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p01.value2}
              onChange={e => {
                handleInputChange(2, e.target.value);
              }}
              ariaLabel='답을 적어주세요.'
              status={cardData.p01.isSubmitted && !cardData.p01.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>468+295=763, 763</Typography>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>(오전에 딴 사과 수)+(오후에 딴 사과 수)</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>=468+295=763(개)</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
