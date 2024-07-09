import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0006_04 } from './store';
import { useEffect, useState } from 'react';
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
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01_0006_04);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: (
      <Typography color='var(--color-yellow-500)' weight='bold'>
        남은 책 수 구하기
      </Typography>
    ),
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        도서관에 남은 책 수를 구해보세요.
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer1.trim() === cardData.p03.solution1;
      const isCorrect2 = cardData.p03.answer2.trim() === cardData.p03.solution2;
      const isCorrect3 = cardData.p03.answer3.trim() === cardData.p03.solution3;

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

      setCardData(prev => ({
        ...prev,
        p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect, isCorrect1: isCorrect1, isCorrect2: isCorrect2, isCorrect3: isCorrect3 },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
        initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
      }
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

  useEffect(() => {
    if (cardData.p03.answer1 !== '' && cardData.p03.answer2 !== '' && cardData.p03.answer3 !== '') {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, disabled: false } }));
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, disabled: true } }));
    }
  }, [cardData.p03.answer1, cardData.p03.answer2, cardData.p03.answer3]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점 하기'}
      submitDisabled={cardData.p03.disabled}
      submitBtnColor={cardData.p03.disabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      useRound
      vAlign='start'
    >
      <Box display='flex' hAlign='center' paddingTop='30px'>
        <Input
          width='200px'
          value={cardData.p03.answer1}
          onChange={e => handleChange(1, e.target.value)}
          ariaLabel='도서관에 남은 책 수를 구하는 식 입력란'
          readOnly={cardData.p03.isSubmitted}
          status={cardData.p03.isSubmitted ? (cardData.p03.isCorrect3 ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.DEFAULT}
        />
        <Typography>-</Typography>
        <Input
          width='200px'
          value={cardData.p03.answer2}
          onChange={e => handleChange(2, e.target.value)}
          ariaLabel='도서관에 남은 책 수를 구하는 식 입력란'
          readOnly={cardData.p03.isSubmitted}
          status={cardData.p03.isSubmitted ? (cardData.p03.isCorrect3 ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.DEFAULT}
        />
        <Typography>=</Typography>
        <Input
          width='200px'
          value={cardData.p03.answer3}
          onChange={e => handleChange(3, e.target.value)}
          ariaLabel='도서관에 남은 책 수를 구하는 식 입력란'
          readOnly={cardData.p03.isSubmitted}
          status={cardData.p03.isSubmitted ? (cardData.p03.isCorrect3 ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.DEFAULT}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {cardData.p03.solution1}, {cardData.p03.solution2}, {cardData.p03.solution3}
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>{cardData.p03.commentary}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
