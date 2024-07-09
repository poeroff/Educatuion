import { useEffect, useState } from 'react';
import {
  Image,
  Box,
  Label,
  Typography,
  Input,
  IQuestionProps,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0003_10 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

interface pageType {
  _page?: string;
}

const P03 = ({ _page = 'P03' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0003_10);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='3' type='icon' />
        클립 24개를 상자에 똑같이 나누어 담으려고 합니다. 한 상자에 담는 클립 수에 따라 필요한 상자 수를 구해 보세요.
      </>
    ),
    size: 'medium',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer1 === cardData.p03.solution1;
      const isCorrect2 = cardData.p03.answer2 === cardData.p03.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
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
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    }
    changeData(_page, 1, subKey, value);
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.p03.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const onSubmitLabel = () => {
    return cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  };

  const isAllFilled = () => {
    if (cardData.p03.answer1 && cardData.p03.answer2) {
      return true;
    } else return false;
  };

  useEffect(() => {
    return () => {
      saveData(_page);
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
      vAlign='start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={onSubmitLabel()}
      submitDisabled={!isAllFilled()}
      submitBtnColor={isAllFilled() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={onGrade}
    >
      <Box display='flex' alignItems='center' flexDirection='column' height={'100%'}>
        <Box padding='32px 20px' type='line' useRound>
          <Image src='/C03/0003/10/DIC313002.png' alt=' 클립 24개가 그려진 그림입니다.' width='590px' height='180px' />
        </Box>
        <Box marginTop='24px'>
          <Box vAlign='center'>
            <Typography>한 상자에 3개씩 담을 때:</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p03.answer1}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={handleInputStatus(cardData.p03.answer1, cardData.p03.solution1)}
              ariaLabel='1번째 빈칸의 값'
            />
            <Typography useGap={false}>개</Typography>
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Typography>한 상자에 8개씩 담을 때:</Typography>
            <Input
              type='number'
              width='70px'
              marginLeft={8}
              value={cardData.p03.answer2}
              onChange={e => handleChange(2, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={handleInputStatus(cardData.p03.answer2, cardData.p03.solution2)}
              ariaLabel='2번째 빈칸의 값'
            />
            <Typography useGap={false}>개</Typography>
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>
              {cardData.p03.solution1}, {cardData.p03.solution2}
            </Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <p>클립을 3개씩 묶으면 8묶음이 됩니다. ➡ 24÷3=8(개)</p>
            <p style={{ marginTop: '10px' }}>클립을 8개씩 묶으면 3묶음이 됩니다. ➡ 24÷8=3(개)</p>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
