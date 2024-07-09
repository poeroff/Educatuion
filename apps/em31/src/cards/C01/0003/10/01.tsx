import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import {
  Box,
  Image,
  Input,
  Label,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Typography,
  ETagLine,
  Tag,
  BottomSheet,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C01000310_Atom } from './store';

import { Container } from '@maidt-cntn/ui/math';

const backgroundImgURL = '/C01/0003/10/EA31103.png';
const altText = '100이 6개, 10이 3개, 1이 7개인 수예요.';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
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
        <Label value='1' type='icon' />
        이준이가 설명하는 수보다 119만큼 더 큰 수를 구해 보세요.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p01.answer,
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
    const { answer, isSubmitted, solution } = cardData.p01;
    if (!isSubmitted) {
      const isCorrect = answerChecker(answer, solution);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
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
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { isSubmitted, answer } = cardData.p01;

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

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: event.target.value } }));
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p01.isSubmitted || !cardData.p01.answer) && !cardData.p01.isSubmitted && !isShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleOnSubmit}
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Image src={backgroundImgURL} alt={altText} width='485px' height='266px' />
      </Box>
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box marginTop='20px'>
          <Input
            width='263px'
            value={cardData.p01.answer}
            onChange={handleInputOnChange}
            ariaLabel='637+119의 값을 입력하세요'
            maxLength={100}
            readOnly={cardData.p01.isSubmitted}
            status={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution ? 'error' : ''}
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
        <Box position='relative' marginTop={''}>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
            <Typography>{cardData.p01.solution}</Typography>
          </Box>
        </Box>
        <Box position='relative' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='해설' />
          <Typography width='100%'>100이 6개, 10이 3개, 1이 7개인 수는 637입니다.</Typography>
          <Typography width='100%'>637+119=756</Typography>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
