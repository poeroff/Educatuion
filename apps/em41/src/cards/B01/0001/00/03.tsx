import styled from '@emotion/styled';
import {
  Box,
  BottomSheet,
  ETagLine,
  Tag,
  Typography,
  BoxWrap,
  IQuestionProps,
  EStyleButtonTypes,
  Image,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B01_0001_00 } from './store';

const SAMPLE_DATA = [
  {
    label: 1,
    src: '/B00/DJC410001-1.png',
    alt: '점 ᄂ에서 시작하여 점ㄷ을 지나 길게 늘인 곧은 선 그림입니다 .',
    width: '120',
    height: '120',
  },
  {
    label: 2,
    src: '/B00/DJC410001-2.png',
    alt: '점 ᄂ과 점 ᄃ을 곧게 이은 선 그림입니다 .',
    width: '120',
    height: '120',
  },
];

const SAMPLE_DATA2 = [
  {
    label: 3,
    src: '/B00/DJC410001-3.png',
    alt: '점 ᄃ과 점 ᄂ을 곧게 이은 선을 양쪽으로 길게 늘인 곧은 선 그림입니다 .',
    width: '300',
    height: '70%',
  },
  {
    label: 4,
    src: '/B00/DJC410001-4.png',
    alt: '점 ᄃ에서 시작하여 점ᄂ을 지나 길게 늘인 곧은 선 그림입니다 .',
    width: '120',
    height: '120',
  },
];

const P03 = () => {
  const pageNumber = 'P03';

  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const handleChange = (index: number | undefined) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: index } }));
    changeData(pageNumber, 1, 1, index);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
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
              type: 'NUMBER',
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='3' type='icon' />
        다음 중에서 반직선 ᄃᄂ은 어느 것인가요 ?
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='start'
      onSubmit={onGrade}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageNumber].answer}
      submitBtnColor={!cardData[pageNumber].answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <ListWrapper>
          <BoxWrap>
            <List gap={100} align='horizontal' data={SAMPLE_DATA}>
              {({ value, index }) => (
                <Radio
                  type={'box'}
                  name='radio-group'
                  key={`radio-group-${index}`}
                  value={index === cardData[pageNumber].answer}
                  isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].answer !== cardData[pageNumber].solution}
                  readOnly={cardData[pageNumber].isSubmitted}
                  onClick={() => handleChange(value?.label)}
                >
                  <Box display='flex' flexDirection='column' justifyContent='flex-start' width={300} height={200} padding={12}>
                    <Box>
                      <Label value={index} />
                    </Box>
                    <Box padding={5} alignItems='center' display='flex' justifyContent='center'>
                      <Image width={value?.width} height={value?.height} src={value?.src as string} alt={value?.alt} />
                    </Box>
                  </Box>
                </Radio>
              )}
            </List>
          </BoxWrap>
          <BoxWrap marginTop={50}>
            <List gap={100} align='horizontal' data={SAMPLE_DATA2}>
              {({ value, index }) => (
                <Radio
                  type={'box'}
                  name='radio-group'
                  key={`radio-group-${index! + 2}`}
                  value={index! + 2 === cardData[pageNumber].answer}
                  isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].answer !== cardData[pageNumber].solution}
                  readOnly={cardData[pageNumber].isSubmitted}
                  onClick={() => handleChange(value?.label)}
                >
                  <Box display='flex' flexDirection='column' justifyContent='flex-start' width={300} height={200} padding={12}>
                    <Box>
                      <Label value={index! + 2} />
                    </Box>
                    <Box padding={5} alignItems='center' display='flex' justifyContent='center'>
                      <Image width={value?.width} height={value?.height} src={value?.src as string} alt={value?.alt} />
                    </Box>
                  </Box>
                </Radio>
              )}
            </List>
          </BoxWrap>
        </ListWrapper>
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
            <Typography usePre>{`1은 반직선 ᄂᄃ , 2는 선분 ᄂᄃ , 3은 직선 ᄂᄃ을 나타냅니다`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  margin-left: 150px;
  ul {
    height: 172px;
  }
`;
