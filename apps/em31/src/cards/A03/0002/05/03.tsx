import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import A03_0002_05 from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
const P03 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0002_05);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈식으로 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        바둑돌 12개를 주머니 3개에 똑같이 나누어 넣으면 주머니 한 개에 넣을 수 있는 바둑돌은 몇 개인지 나눗셈식으로 나타내보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
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
      ],
    },
  ];

  const isAnswerCorrect = (answer: string, solution: string) => {
    const incorrectPattern = /\d\s+\d/;
    return answer.replace(/\s+/g, '') === solution && !incorrectPattern.test(answer);
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect =
      isAnswerCorrect(cardData.p03.answer1, cardData.p03.solution1) &&
      isAnswerCorrect(cardData.p03.answer2, cardData.p03.solution2) &&
      isAnswerCorrect(cardData.p03.answer3, cardData.p03.solution3);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p03.answer3,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P03', userSubmission, isCorrect);
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)}
      submitBtnColor={
        cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            value={cardData.p03.answer1}
            onChange={e => handleChange(1, e.target.value)}
            width='130px'
            ariaLabel='바둑돌 개수'
            readOnly={cardData.p03.isSubmitted}
            status={
              !cardData.p03.answer1
                ? InputStatus.DEFAULT
                : cardData.p03.isSubmitted && !isAnswerCorrect(cardData.p03.answer1, cardData.p03.solution1)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
          <Typography>÷</Typography>
          <Input
            value={cardData.p03.answer2}
            onChange={e => handleChange(2, e.target.value)}
            width='130px'
            ariaLabel='주머니 개수'
            readOnly={cardData.p03.isSubmitted}
            status={
              !cardData.p03.answer2
                ? InputStatus.DEFAULT
                : cardData.p03.isSubmitted && !isAnswerCorrect(cardData.p03.answer2, cardData.p03.solution2)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
          <Typography>=</Typography>
          <Input
            value={cardData.p03.answer3}
            onChange={e => handleChange(3, e.target.value)}
            width='130px'
            ariaLabel='나눗셈 결과'
            readOnly={cardData.p03.isSubmitted}
            status={
              !cardData.p03.answer3
                ? InputStatus.DEFAULT
                : cardData.p03.isSubmitted && !isAnswerCorrect(cardData.p03.answer3, cardData.p03.solution3)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>12, 3, 4</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>12÷3=4입니다. </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
