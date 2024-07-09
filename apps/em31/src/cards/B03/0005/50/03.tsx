import { useEffect, useMemo, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, Input, IQuestionProps, Label, Tag, Typography } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { B03_0005_50 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNumber, isValidString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const PAGE_NUMBER = 'P03';
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B03_0005_50);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p03.answer.trim() === cardData.p03.solution;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
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
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
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
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        계산해 보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
    changeData(PAGE_NUMBER, 1, 1, value);
  };

  const isValid: boolean = useMemo(() => {
    return isValidString(cardData.p03.answer) && isNumber(cardData.p03.answer);
  }, [cardData.p03.answer]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={{}}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isValid ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isValid}
      onSubmit={onGrade}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' useRound padding='20px'>
          <Box display='flex' vAlign='center'>
            <Box display='flex'>
              <Typography>36÷9=</Typography>
              <Input
                type='number'
                textAlign='start'
                width='80px'
                title='답 입력란'
                value={cardData.p03.answer}
                maxLength={2}
                onChange={e => handleInputChange(e.target.value)}
                readOnly={cardData.p03.isSubmitted}
                status={!isValid ? 'default' : cardData.p03.isSubmitted && !cardData.p03.isCorrect ? 'error' : 'enable'}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData.p03.solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box flexDirection='column'>
                <Typography>9×4＝36이므로 36÷9＝4입니다.</Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
