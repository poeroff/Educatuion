import {
  Box,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  Image,
  Input,
  Label,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  Typography,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B01_0001_00 } from './store';
import { isNumber, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const answerImg = {
  src: '/B00/DJC410005(sol).png',
  alt: '직각삼각형 4 개를 모눈종이에서 찾아 표시한 그림입니다.',
};

const P04 = () => {
  const pageNumber = 'P04';

  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData[pageNumber].answer,
          isAnswer: true,
          isCorrect: cardData[pageNumber].answer === cardData[pageNumber].solution,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onGrade = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData[pageNumber].answer === cardData[pageNumber].solution;
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleChange = (value: string) => {
    if (isNumber(value)) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: value } }));
      changeData(pageNumber, 1, 1, value);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={4} />
        다음 그림에서 직각삼각형의 개수를 구해 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
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
      useRound
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onGrade}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageNumber].answer}
      submitBtnColor={!cardData[pageNumber].answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Box display='flex' hAlign='center'>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='end'
          type='dashed'
          padding={'24px 17px'}
          borderRadius={16}
          height={324}
          key={`list-item`}
        >
          <Box display='flex' justifyContent='center'>
            <Image
              src='/B00/DJC410005.png'
              alt='직각이 있는 삼각형 4 개와 네 각이 모두 직각인 사각형 1 개가 모눈종이에 그려진 그림입니다.'
              width='200px'
              height='200px'
            />
          </Box>
          <Box marginTop={24}>
            <Input
              marginLeft={45}
              width='100px'
              value={cardData[pageNumber].answer ? cardData[pageNumber].answer.toString() : ''}
              onChange={e => handleChange(e.target.value)}
              readOnly={cardData[pageNumber].isSubmitted ? true : false}
              status={
                isNotEmptyString(cardData[pageNumber].answer ?? '')
                  ? !cardData[pageNumber].isSubmitted || cardData[pageNumber].answer === cardData[pageNumber].solution
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={cardData[pageNumber].isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData[pageNumber].solution}</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`직각삼각형을 모두 찾으면 4 개입니다.`}</Typography>
          </Box>
          <Box padding={5} display='flex' justifyContent='left'>
            <Image src={answerImg?.src as string} alt={answerImg?.alt} width='200px' height='200px' />
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
