import { useEffect, useState } from 'react';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  Dialog,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { A04000105_store } from './store';
import { studentAtom } from '@/stores/student';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
//맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 import 경로 수정
//import CEM310100111001 from '../../C04/0001/13/01';

const P05 = () => {
  const pageKey = 'P05';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A04000105_store);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        지우개가 한 상자에 8개씩 들어 있습니다. 4상자에 들어 있는 지우개는 모두 몇 개인가요?
      </>
    ),
    size: 'medium',
    mark: cardData.P05.isSubmitted ? (cardData.P05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.P05.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 =
        cardData.P05.answer1.replace(/\s+/g, '') === cardData.P05.solution1_1 ||
        cardData.P05.answer1.replace(/\s+/g, '') === cardData.P05.solution1_2 ||
        cardData.P05.answer1.replace(/\s+/g, '') === cardData.P05.solution1_3 ||
        cardData.P05.answer1.replace(/\s+/g, '') === cardData.P05.solution1_4;
      const isCorrect2 = cardData.P05.answer2 === cardData.P05.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, P05: { ...prev.P05, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P05.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.P05.answer2,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P05: {
            ...prev.P05,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P05.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P05.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P05: { ...prev.P05, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, P05: { ...prev.P05, answer2: value } }));
    }
    changeData(pageKey, 1, subKey, value);
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.P05.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const onSubmitLabel = () => {
    return cardData.P05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  };

  const isAllFilled = () => {
    if (cardData.P05.answer1 && cardData.P05.answer2) {
      return true;
    } else return false;
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const inputNodes: React.ReactNode[] = [
    <Input
      name={'value1'}
      marginLeft={12}
      textAlign='center'
      value={cardData.P05.answer1}
      onChange={e => handleChange(1, e.target.value)}
      width='296px'
      ariaLabel='4상자에 들어 있는 지우개를 구하는 식'
      readOnly={cardData.P05.isSubmitted}
      status={
        !isNotEmptyString(cardData.P05.answer1)
          ? InputStatus.DEFAULT
          : cardData.P05.isSubmitted &&
            !(
              isAnswer(cardData.P05.answer1.replace(/\s+/g, ''), cardData.P05.solution1_1) ||
              isAnswer(cardData.P05.answer1.replace(/\s+/g, ''), cardData.P05.solution1_2) ||
              isAnswer(cardData.P05.answer1.replace(/\s+/g, ''), cardData.P05.solution1_3) ||
              isAnswer(cardData.P05.answer1.replace(/\s+/g, ''), cardData.P05.solution1_4)
            )
          ? InputStatus.ERROR
          : InputStatus.ENABLE
      }
      maxLength={12}
    />,
    <Input
      type='number'
      name={'value2'}
      marginLeft={12}
      textAlign='center'
      value={cardData.P05.answer2}
      onChange={e => handleChange(2, e.target.value)}
      width='124px'
      ariaLabel='답란'
      maxLength={4}
      readOnly={cardData.P05.isSubmitted}
      status={handleInputStatus(cardData.P05.answer2, cardData.P05.solution2)}
    />,
  ];

  return (
    <Container
      useRound
      bodyId='targetContainer'
      vAlign='start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={onSubmitLabel()}
      submitDisabled={!isAllFilled()}
      submitBtnColor={isAllFilled() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={onGrade}
      {...(!cardData.P05.isCorrect &&
        cardData.P05.isSubmitted && {
          linkLabel: '맞춤 학습하기',
          useLinkLabel: true,
          onLink: () => {
            setIsModalShow(!isModalShow);
          },
        })}
    >
      <Scroll tabIndex={0}>
        <Box display='flex' justifyContent='center'>
          <Box>
            <Box>
              <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
              {inputNodes[0]}
            </Box>
            <Box marginTop='8px'>
              <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
              {inputNodes[1]}
              <Typography>개</Typography>
            </Box>
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>8×4＝32 또는 4×8＝32 또는 4×8 또는 8×4, 32</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>8개씩 4상자에 들어 있는 지우개는 모두 8×4=32(개)입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isModalShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setIsModalShow(false);
        }}
        onConfirm={() => {
          setIsModalShow(false);
        }}
      >
        {/* 맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 주석 해제  */}
        {/* C-EM31-04-0001-1301 -> 맞춤 카드*/}
        <>{/* <CEM310400013001 /> */}</>
      </Dialog>
    </Container>
  );
};
export default P05;
