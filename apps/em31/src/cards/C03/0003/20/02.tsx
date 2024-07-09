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
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0003_20 } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

interface pageType {
  _page?: string;
}

const P02 = ({ _page = 'P02' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0003_20);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        뺄셈식을 보고 □ 안에 알맞은 수를 써넣으세요.
      </>
    ),
    size: 'medium',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
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
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.replace(/\s+/g, '') === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2 === cardData.p02.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
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
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
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
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData(_page, 1, subKey, value);
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.p02.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const onSubmitLabel = () => {
    return cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  };

  const isAllFilled = () => {
    if (cardData.p02.answer1 && cardData.p02.answer2) {
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
      <Box display='flex'>
        <Box useFull borderRadius='16px' padding='24px'>
          <Box background='white' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              40-8-8-8-8-8=0
            </Box>
          </Box>
          <Box display='flex' whiteSpace='nowrap' hAlign='center'>
            <Typography>➡</Typography>
            <Typography>40</Typography>
            <Typography>÷</Typography>
            <Input
              width='70px'
              type='number'
              value={cardData.p02.answer1}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(cardData.p02.answer1, cardData.p02.solution1)}
              ariaLabel='1번째 빈칸의 값'
            />

            <Typography>=</Typography>
            <Input
              width='70px'
              type='number'
              value={cardData.p02.answer2}
              onChange={e => handleChange(2, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(cardData.p02.answer2, cardData.p02.solution2)}
              ariaLabel='2번째 빈칸의 값'
            />
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
              {cardData.p02.solution1}, {cardData.p02.solution2}
            </Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <p>40에서 8을 5번 뺄 수 있습니다. </p>
            <p style={{ marginTop: '10px' }}>이것을 나눗셈식으로 나타내면 40÷8=5입니다.</p>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
