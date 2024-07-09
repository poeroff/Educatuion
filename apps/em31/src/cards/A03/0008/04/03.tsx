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
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03000804 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03000804);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={3} type='icon' />
        <Typography>나눗셈의 몫을 구해 보세요.</Typography>
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const submitBtnColor = cardData.p03.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3 && cardData.p03.answer4
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer4: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const correct1 = cardData.p03.answer1.trim() === cardData.p03.solution1;
      const correct2 = cardData.p03.answer2.trim() === cardData.p03.solution2;
      const correct3 = cardData.p03.answer3.trim() === cardData.p03.solution3;
      const correct4 = cardData.p03.answer4.trim() === cardData.p03.solution4;
      const isCorrect = correct1 && correct2 && correct3 && correct4;
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          isSubmitted: true,
          isCorrect: isCorrect,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer4,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0].value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1].value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2].value || cardData.p03.answer3,
            answer4: userSubmissionList[0].inputData[3].value || cardData.p03.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3 && cardData.p03.answer4)}
      useRound
      vAlign='start'
      bodyId='targetContainer'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          16 ÷ 8 ={' '}
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p03.isSubmitted}
            maxLength={3}
            value={cardData.p03.answer1}
            status={
              !cardData.p03.isSubmitted
                ? cardData.p03.answer1.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p03.answer1.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p03.isSubmitted && cardData.p03.answer1 !== cardData.p03.solution1
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='1번째 빈칸의 값'
            onChange={e => handleChange(1, e.target.value)}
          />
        </Box>
        <Box type='dashed' padding={'20px 44px'} marginLeft={'40px'} useRound>
          63 ÷ 7 ={' '}
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p03.isSubmitted}
            maxLength={3}
            value={cardData.p03.answer2}
            status={
              !cardData.p03.isSubmitted
                ? cardData.p03.answer2.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p03.answer2.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p03.isSubmitted && cardData.p03.answer2 !== cardData.p03.solution2
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='2번째 빈칸의 값'
            onChange={e => handleChange(2, e.target.value)}
          />
        </Box>
      </Box>
      <Box display='flex' justifyContent='center' marginTop={40}>
        <Box type='dashed' padding={'20px 44px'} useRound>
          81 ÷ 9 ={' '}
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p03.isSubmitted}
            maxLength={3}
            value={cardData.p03.answer3}
            status={
              !cardData.p03.isSubmitted
                ? cardData.p03.answer3.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p03.answer3.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p03.isSubmitted && cardData.p03.answer3 !== cardData.p03.solution3
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='3번째 빈칸의 값'
            onChange={e => handleChange(3, e.target.value)}
          />
        </Box>
        <Box type='dashed' padding={'20px 44px'} marginLeft={'40px'} useRound>
          56 ÷ 8 ={' '}
          <Input
            type='number'
            width='48px'
            readOnly={cardData.p03.isSubmitted}
            maxLength={3}
            value={cardData.p03.answer4}
            status={
              !cardData.p03.isSubmitted
                ? cardData.p03.answer4.trim() === ''
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
                : cardData.p03.answer4.trim() === ''
                ? InputStatus.ENABLE
                : cardData.p03.isSubmitted && cardData.p03.answer4 !== cardData.p03.solution4
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='4번째 빈칸의 값'
            onChange={e => handleChange(4, e.target.value)}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography>2, 9, 9, 7</Typography>
          </Box>
          <Box marginTop={32}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>16÷8=2, 63÷7=9, 81÷9=9, 56÷8=7</Typography>
          </Box>

          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>곱셈구구 또는 곱셈식으로 구해 보세요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
