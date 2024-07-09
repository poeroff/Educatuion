import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Label, TMainHeaderInfoTypes, Tag } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { ChangeEvent, useEffect, useState } from 'react';
import { A03_0005_04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈의 몫을 곱셈구구로 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        21÷7의 몫을 곱셈구구로 구해 보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const submitBtnColor = cardData.p03.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : cardData.p03.answer !== ''
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;
  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: target.value } }));
    changeData('P03', 1, 1, target.value);
  };
  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p03.answer.toLowerCase().trim() === cardData.p03.solution);
      setCardData(prev => ({
        ...prev,
        p03: { ...prev.p03, isSubmitted: true, isCorrect: cardData.p03.answer.toLowerCase().trim() === cardData.p03.solution },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer,
              isAnswer: true,
            },
          ],
          isCorrect: cardData.p03.answer.toLowerCase().trim() === cardData.p03.solution,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={cardData.p03.answer === ''}
      useRound
      vAlign='start'
      bodyId='targetContainer'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p03.isSubmitted}
            maxLength={3}
            value={cardData.p03.answer}
            status={
              !cardData.p03.isSubmitted
                ? cardData.p03.answer.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p03.answer.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p03.answer.trim() !== cardData.p03.solution
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='1번째 빈칸의 값'
            onChange={handleInputChangeEvent}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>3</Box>
          <Box marginTop={32}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>7×3＝21이므로 3입니다. </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
