import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import React, { useEffect, useMemo, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import empty_square from '@/assets/icon/math_empty_square.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03_0001_20 } from './store';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C03_0001_20);

  const [isShow, setShow] = useState<boolean>(false);

  const pageNum = 'P02';

  const { answer, isSubmitted, solution } = cardData[pageNum];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const isCorrect = useMemo(() => {
    if (!isSubmitted) {
      return false;
    }

    const result = Number(answer) === solution;

    return result;
  }, [isSubmitted]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box display='flex' alignItems='center'>
        <SvgIcon src={headerIcon} size='48px' />
        &nbsp;그림을 보고 &nbsp;
        <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
        &nbsp;안에 알맞은 수를 써넣으세요.
      </Box>
    ),
    mark: getMarking(isSubmitted, isCorrect),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCardData(prev => ({
      ...prev,
      [pageNum]: {
        ...prev[pageNum],
        answer: Number(value),
      },
    }));

    changeData(pageNum, 1, 1, Number(value));
  };

  const handleSubmit = () => {
    if (cardData.P02.isSubmitted) {
      setShow(prev => !prev);
    } else {
      const isCorrect = Number(answer) === solution;
      setCardData(prev => ({ ...prev, [pageNum]: { ...prev[pageNum], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];

      submitDataWithResult(pageNum, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNum]: {
            ...prev[pageNum],
            answer: userSubmissionList[0].inputData[0]?.value,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
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
      headerInfo={null}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={answer === ''}
      submitBtnColor={answer === '' ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      background={'var(--color-white)'}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image
            src='/C03/0001/20/DEC313I01.png'
            alt='왼쪽에는 십 모형 2개와 일 모형 5개가 그려진 그림이 있고, 오른쪽에는 십 모형 1개와 일 모형 15개가 그려진 그림에서 일 모형 6개에 사선이 표시되어 있습니다.'
          />
        </Box>
        <Box marginTop='24px'>
          <Typography>25-6=</Typography>
          <Input
            type='number'
            width='130px'
            value={String(answer)}
            status={isSubmitted ? !isCorrect && InputStatus.ERROR : false}
            disabled={isSubmitted}
            onChange={e => handleInputChange(e)}
            ariaLabel='답안 입력 란'
          />
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>{solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>일 모형 5개에서 6개를 뺄 수 없으므로 십 모형 1개를 일 모형 10개로 바꾸어 뺍니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
