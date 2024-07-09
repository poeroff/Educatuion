import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  TMainHeaderInfoTypes,
  Label,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  Typography,
  EStyleButtonTypes,
  EStyleFontSizes,
  Input,
  PinchZoom,
  Image,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0007_06 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0007_06);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const pageNumber = 'P01';
  const pageKey = 'p01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$603 - 287$ 계산하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='#969590' />
        <MathExpression equation={'$608 - 287$은 얼마쯤일지 어림해 보세요'} />
      </>
    ),
  };

  const answer: React.ReactNode = <Typography>300쯤</Typography>;
  const explanation: React.ReactNode = <Typography>603을 600으로, 287을 300으로 생각하면 600-300=300입니다.</Typography>;

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

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNumber, 1, 1, value);
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

  const getSubmitBtnColor = () => {
    if (cardData[pageKey].answer === '') {
      return EStyleButtonTypes.SECONDARY;
    }
    return cardData[pageKey].answer !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.YELLOW;
  };

  return (
    <Container
      bodyId='targetContainer'
      background={'var(--color-white)'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={getSubmitBtnColor()}
      onSubmit={submitAnswer}
      submitDisabled={!cardData[pageKey].answer}
      useRound
    >
      <BoxWrap alignItems='center' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input width='180px' value={cardData[pageKey].answer} onChange={e => handleChange(e.target.value)} ariaLabel='답을 입력하세요' />
        </Box>
        <Box>
          <PinchZoom>
            <Image src='/A01/0007/05/EM-021-01.png' width='170px' height='320px' />
          </PinchZoom>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData[pageKey].isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              {answer}
            </Typography>
          </Box>
          {explanation && (
            <>
              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='풀이' />
              </Box>
              {explanation}
            </>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
