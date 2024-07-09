import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
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
import { ChangeEvent, useEffect, useState } from 'react';
import { A03_0005_07 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_07);
  const { userId } = useRecoilValue(studentAtom);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const submitBtnColor = cardData.p01.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : cardData.p01.answer1 && cardData.p01.answer2
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: <>물 42병을 6모둠에 똑같이 나누어 주려고 합니다. 한 모둠에 나누어 줄 수 있는 물은 몇 병인가요?</>,
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const handleInputChangeEvent = (subKey: number, { target }: ChangeEvent<HTMLInputElement>) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: target.value } }));
      changeData('P01', 1, 1, target.value);
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: target.value } }));
      changeData('P01', 1, 2, target.value);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(
        (cardData.p01.answer1.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution1[0] ||
          cardData.p01.answer1.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution1[1]) &&
          cardData.p01.answer2.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution2,
      );
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          isSubmitted: true,
          isCorrect:
            (cardData.p01.answer1.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution1[0] ||
              cardData.p01.answer1.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution1[1]) &&
            cardData.p01.answer2.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution2,
        },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
            },
          ],
          isCorrect:
            (cardData.p01.answer1.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution1[0] ||
              cardData.p01.answer1.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution1[1]) &&
            cardData.p01.answer2.toLowerCase().replace(/(\s*)/g, '') === cardData.p01.solution2,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      submitDisabled={cardData.p01.answer1 === '' || cardData.p01.answer2 === ''}
      bodyId='targetContainer'
      onSubmit={() => {
        handleSubmit();
      }}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label
              value='식'
              marginRight={10}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
            />
            <Input
              width='296px'
              ariaLabel='식을 적어주세요'
              readOnly={cardData.p01.isSubmitted}
              value={cardData.p01.answer1}
              onChange={e => handleInputChangeEvent(1, e)}
              status={
                !cardData.p01.isSubmitted
                  ? cardData.p01.answer1.replace(/(\s*)/g, '') === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p01.answer1.replace(/(\s*)/g, '') === ''
                  ? InputStatus.ENABLE
                  : cardData.p01.answer1.replace(/(\s*)/g, '') !== cardData.p01.solution1[0] && cardData.p01.answer1 !== cardData.p01.solution1[1]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              maxLength={10}
            />
          </Box>
          <Box marginTop='8px'>
            <Label
              value='답'
              marginRight={10}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
            />
            <Input
              type='number'
              width='126px'
              ariaLabel='답을 적어주세요'
              readOnly={cardData.p01.isSubmitted}
              value={cardData.p01.answer2}
              onChange={e => handleInputChangeEvent(2, e)}
              status={
                !cardData.p01.isSubmitted
                  ? cardData.p01.answer2.replace(/(\s*)/g, '') === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p01.answer2.replace(/(\s*)/g, '') === ''
                  ? InputStatus.ENABLE
                  : cardData.p01.answer2.replace(/(\s*)/g, '') !== cardData.p01.solution2
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              maxLength={3}
            />
            <Typography>병</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>42÷6=7 또는 42÷6, 7</Box>
          <Box marginTop={32}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            (전체 물병 수)÷(모둠 수)
            <br /> =42÷6=7(병)
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
