import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Input,
  Label,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow_right from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01000760_store } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000760_store);

  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

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

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p03.answer.trim() === cardData.p03.solution;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
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
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.P02.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='3' type='icon' />두 수의 차를 구해 보세요.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!cardData.p03.answer}
      submitBtnColor={!cardData.p03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Scroll tabIndex={0}>
        <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
          <Box display='flex'>
            <Box useRound background='yellow' hAlign='center' flexDirection='column' width={'525px'} height={'125px'} marginRight={'20px'}>
              <Typography>&middot; 100이 5개, 10이 2개, 1이 1개인 수</Typography>
              <Typography>&middot; 100이 3개, 10이 9개, 1이 7개인 수</Typography>
            </Box>
          </Box>

          <Box marginTop='20px'>
            <Input
              width='200px'
              value={cardData.p03.answer}
              readOnly={cardData.p03.isSubmitted}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel='1번 답란'
              status={handleInputStatus(cardData.p03.answer, cardData.p03.solution)}
            />
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>124</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>100이 5개, 10이 2개, 1이 1개인 수는 521이고 100이 3개, 10이 9개, 1이 7개인 수는 397입니다.</Typography>
            <Typography>
              <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' /> 521-397=124
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
