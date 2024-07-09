import usePageData from '@/hooks/usePageData';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { ChangeEvent, useEffect, useState } from 'react';
import { STC01000250 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(STC01000250);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const submitBtnColor = cardData.p01.isSubmitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.YELLOW;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={1} type='icon' size='small' />수 모형을 보고 245+324 를 구해 보세요 .
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: target.value } }));
    changeData('P01', 1, 1, target.value);
  };
  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p01.answer.toLowerCase().trim() === cardData.p01.solution);
      setCardData(prev => ({
        ...prev,
        p01: { ...prev.p01, isSubmitted: true, isCorrect: cardData.p01.answer.toLowerCase().trim() === cardData.p01.solution },
      }));
      const userSubmission: userSubmissionType[] = [
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
          isCorrect: cardData.p01.answer.toLowerCase().trim() === cardData.p01.solution,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
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
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
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
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  useEffect(() => {
    return () => {
      saveData('P01');
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={cardData.p01.answer === ''}
      background={'var(--color-white)'}
      useRound
      bodyId='targetContainer'
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image
            src='/C01/0002/50/DEC311001.png'
            alt='백 모형 2 개 , 십
모형 4 개 , 일 모형 5 개와 백
모형 3 개 , 십 모형 2 개 , 일
모형 4 개가 있습니다.'
            width='400px'
            height='200px'
          />
        </Box>
        <Box marginTop='24px'>
          <Typography>245+324=</Typography>
          <Input
            ariaLabel='2번 답란'
            readOnly={cardData.p01.isSubmitted}
            width='95px'
            maxLength={3}
            name='value2'
            value={cardData.p01.answer}
            marginLeft={10}
            status={
              !cardData.p01.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p01.answer.trim() !== cardData.p01.solution
                ? InputStatus.ERROR
                : InputStatus.DEFAULT
            }
            onChange={handleInputChangeEvent}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>569</Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>백 모형 5개, 십 모형 6개, 일 모형 9개이므로 245+324=569입니다.</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
