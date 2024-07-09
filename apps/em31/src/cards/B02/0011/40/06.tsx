import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  Input,
  TMarkType,
  Tag,
  Typography,
  Image,
  EImageType,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B02_0011_40 } from './store';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const pageKey = 'P06';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B02_0011_40);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: value,
      },
    }));
    changeData(pageKey, 1, 1, value);
  };

  const defaultSubmission: userSubmissionType<string | undefined>[] = [
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
  const submitAnswer = () => {
    if (isSubmitted) {
      setShow(show => !show);
    }

    const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
    const userSubmission: userSubmissionType<string | undefined>[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isCorrect,
      },
    }));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData.value,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const { isSubmitted } = cardData[pageKey];

  const markType: TMarkType = isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none';

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='6' type='icon' />
        각을 읽어 보세요.
      </>
    ),
    mark: markType,
  };
  const isValid = isNotEmptyString(cardData[pageKey].answer);
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : isValid
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitLabel}
      onSubmit={submitAnswer}
      submitBtnColor={submitButtonColor}
      submitDisabled={!isSubmitted && !isValid}
      useRound
      bodyId={'targetContainer'}
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Image
          type={EImageType.IMG}
          src={'/B02/0011/40/DKC312M04.png'}
          width='240px'
          height='160px'
          alt='점 ㅂ에서 반직선 ㅂㅁ과 반직선 ㅂㅅ을 그은 그림입니다.'
        />
        <Box marginTop='20px'>
          <Typography>각</Typography>
          <Input
            width='203px'
            value={cardData[pageKey].answer}
            onChange={e => handleChange(e.target.value)}
            ariaLabel='답란'
            status={
              isNotEmptyString(cardData[pageKey].answer)
                ? cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[pageKey].isSubmitted}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId={'targetContainer'} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>각 ㅁㅂㅅ 또는 각 ㅅㅂㅁ</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop='12px'>
              <Typography>각을 읽을 때에는 각의 꼭짓점 ㅂ이 가운데에 오도록 읽습니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
