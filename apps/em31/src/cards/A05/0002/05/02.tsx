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
import { useEffect, useState } from 'react';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05_0002_05 } from './store';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A05_0002_05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '길이 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={12} />
        종이띠의 길이는 3cm보다 몇 mm 더 긴가요?
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p02.answer.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p02.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p02.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect = cardData.p02.answer[0] === cardData.p02.solution[0];

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        isCorrect: isCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer[0],
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: [userSubmissionList[0].inputData[0]?.value] || cardData.p02.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p02.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: answerList } }));
    changeData('P02', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            width='130px'
            maxLength={2}
            type='number'
            status={
              !cardData.p02.answer[0]
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && cardData.p02.answer[0] !== cardData.p02.solution[0]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p02.isSubmitted}
            value={cardData.p02.answer[0]}
            onChange={e => handleChange(1, e.target.value)}
            ariaLabel='답을 적어주세요.'
          />
          <Typography>mm</Typography>
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
              <Typography>7</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>종이띠의 길이는 3 cm보다 7 mm 더 깁니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
