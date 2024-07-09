import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Box, Label, IQuestionProps, TMainHeaderInfoTypes, Tag, Typography, Input, BottomSheet, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C01000310_Atom } from './store';

import { Container } from '@maidt-cntn/ui/math';

const P03 = () => {
  const PAGE_NUMBER = 'P03';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000310_Atom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='3' type='icon' />
        4장의 카드에 쓰인 수 중에서 가장 큰 수와 가장 작은 수의 합을 구해 보세요.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
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
    },
  ];

  const answerChecker = (answer: string, solution: string) => {
    if (answer.trim().includes(' ')) {
      return false;
    }
    return answer === solution;
  };
  const handleOnSubmit = () => {
    const { answer, isSubmitted, solution } = cardData.p03;
    if (!isSubmitted) {
      const isCorrect = answerChecker(answer, solution);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    } else {
      setShow(prev => !prev);
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

  const getButtonColor = () => {
    const { isSubmitted, answer } = cardData.p03;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    } else {
      return isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.value) {
      return;
    }

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      submitDisabled={(cardData.p03.isSubmitted || !cardData.p03.answer) && !cardData.p03.isSubmitted && !isShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleOnSubmit}
      useRound
    >
      <Box justifyContent={'center'} type='dashed' display={'flex'} flexDirection={'row'} useRound gap={24}>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='첫번째 카드 : 338'>
              338
            </Typography>
          </Box>
        </Box>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='두번째 카드 : 176'>
              176
            </Typography>
          </Box>
        </Box>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='세번째 카드 : 329'>
              329
            </Typography>{' '}
          </Box>
        </Box>
        <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
          <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
            <Typography weight={'var(--font-weight-bold)'} ariaLabel='네번째 카드 : 405'>
              405
            </Typography>{' '}
          </Box>
        </Box>
      </Box>
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box marginTop='20px'>
          <Input
            width='263px'
            value={cardData.p03.answer}
            status={cardData.p03.isSubmitted && cardData.p03.answer !== cardData.p03.solution ? 'error' : ''}
            readOnly={cardData.p03.isSubmitted}
            onChange={handleInputOnChange}
            ariaLabel='답을 입력하세요'
          />
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
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>581</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>405 &gt; 338 &gt; 329 &gt;176이므로 가장 큰 수는 405, 가장 작은 수는 176입니다.</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>먼저 주어진 수를 비교하여 가장 큰 수와 가장 작은 수를 찾아봐요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P03;
