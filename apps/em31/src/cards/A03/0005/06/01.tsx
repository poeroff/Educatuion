import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { A03_0005_06 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_06);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: <>나눗셈의 몫을 구해 보세요.</>,
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const submitBtnColor = cardData.p01.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : cardData.p01.answer1.value && cardData.p01.answer2.value && cardData.p01.answer3.value
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: { ...prev.p01.answer2, value } } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: { ...prev.p01.answer3, value } } }));
    }
    changeData('P01', 1, subKey, value);
  };
  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const correct1 = cardData.p01.answer1.value.trim() === cardData.p01.answer1.solution;
      const correct2 = cardData.p01.answer2.value.trim() === cardData.p01.answer2.solution;
      const correct3 = cardData.p01.answer3.value.trim() === cardData.p01.answer3.solution;
      const isAllCorrect = correct1 && correct2 && correct3;
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          answer1: {
            ...cardData.p01.answer1,
            isCorrect: correct1,
          },
          answer2: {
            ...cardData.p01.answer2,
            isCorrect: correct2,
          },
          answer3: {
            ...cardData.p01.answer3,
            isCorrect: correct3,
          },
          isSubmitted: true,
          isAllCorrect: isAllCorrect,
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
              isCorrect: correct1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2.value,
              isCorrect: correct2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3.value,
              isCorrect: correct3,
            },
          ],
          isCorrect: isAllCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isAllCorrect);
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
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isCorrect: false,
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
            answer1: userSubmissionList[0].inputData[0] || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1] || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2] || cardData.p01.answer3,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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
  useEffect(() => {
    console.log('cardData.p01', cardData.p01);
  }, [cardData.p01]);
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={!(cardData.p01.answer1.value && cardData.p01.answer2.value && cardData.p01.answer3.value)}
      useRound
      vAlign='start'
      bodyId='targetContainer'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          24 ÷ 3 ={' '}
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p01.isSubmitted}
            maxLength={3}
            value={cardData.p01.answer1.value}
            status={
              !cardData.p01.isSubmitted
                ? cardData.p01.answer1.value.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p01.answer1.value.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='1번째 빈칸의 값'
            onChange={e => handleChange(1, e.target.value)}
          />
        </Box>
        <Box type='dashed' padding={'20px 44px'} marginLeft={'40px'} useRound>
          40 ÷ 8 ={' '}
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p01.isSubmitted}
            maxLength={3}
            value={cardData.p01.answer2.value}
            status={
              !cardData.p01.isSubmitted
                ? cardData.p01.answer2.value.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p01.answer2.value.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='2번째 빈칸의 값'
            onChange={e => handleChange(2, e.target.value)}
          />
        </Box>
        <Box type='dashed' padding={'20px 44px'} marginLeft={'40px'} useRound>
          54 ÷ 9 ={' '}
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p01.isSubmitted}
            maxLength={3}
            value={cardData.p01.answer3.value}
            status={
              !cardData.p01.isSubmitted
                ? cardData.p01.answer3.value.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p01.answer3.value.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p01.isSubmitted && !cardData.p01.answer3.isCorrect
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='3번째 빈칸의 값'
            onChange={e => handleChange(3, e.target.value)}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>8,5,6</Box>
          <Box marginTop={32}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>3×8＝24이므로 24÷3＝8입니다.</Typography>
            <br />
            <Typography>8×5＝40이므로 40÷8＝5입니다.</Typography>
            <br />
            <Typography>9×6＝54이므로 54÷9＝6입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
