import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, EStyleButtonTypes, IQuestionProps, Input, Typography, BottomSheet, Tag, ETagLine, Label, InputStatus } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';

// import headerIcon from '../../../../assets/icon/m_default_01.svg';
import { A04000904_Atom } from './store';

export const COLORED_BOX = styled(Box)<{ color?: string }>`
  display: inline-flex;
  verticalalign: middle;
  background: ${props => `${props.color}`};
  halign: center;
  width: 8px;
  height: 48px;
  marginleft: 5px;
  marginright: 5px;
`;

const P06 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000904_Atom);
  const [isShow, setShow] = useState<boolean>(false);

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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onCalculate = () => {
    if (cardData.p06.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p06.answer1.trim() === cardData.p06.solution1;
      const isCorrect2 = cardData.p06.answer2.trim() === cardData.p06.solution2;
      const isCorrect3 = cardData.p06.answer3.trim() === cardData.p06.solution3;
      const isCorrect4 = cardData.p06.answer4.trim() === cardData.p06.solution4;

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      // const isCorrectFormula = isCorrect1 && isCorrect2 && isCorrect3;

      setCardData(prev => ({
        ...prev,
        p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3, isCorrect4 },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p06.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p06.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p06.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p06.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P06', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p06.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p06.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p06.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isCorrect2: isSubmitted ? userSubmissionList[1].isCorrect : false,
            isCorrect3: isSubmitted ? userSubmissionList[2].isCorrect : false,
            isCorrect4: isSubmitted ? userSubmissionList[3].isCorrect : false,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer4: value } }));
    }
    changeData('P06', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P06');
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
        <Label type='icon' size='small' value='6' />
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          수 카드
          <Box
            display='inline-flex'
            verticalAlign='middle'
            background='red'
            hAlign='center'
            width='8px'
            height='48px'
            marginLeft='10px'
            marginRight='10px'
          >
            2
          </Box>
          ,
          <Box
            display='inline-flex'
            verticalAlign='middle'
            background='yellow'
            hAlign='center'
            width='8px'
            height='48px'
            marginLeft='10px'
            marginRight='10px'
          >
            3
          </Box>
          ,
          <Box
            display='inline-flex'
            verticalAlign='middle'
            background='green'
            hAlign='center'
            width='8px'
            height='48px'
            marginLeft='10px'
            marginRight='10px'
          >
            8
          </Box>
          한 번씩만 이용하여 계산 결과가 가장 큰 곱셈식을 만들어 계산해 보세요.
        </span>
      </>
    ),
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p06.answer1 && cardData.p06.answer2 && cardData.p06.answer3 && cardData.p06.answer4)}
      submitBtnColor={
        !(cardData.p06.answer1 && cardData.p06.answer2 && cardData.p06.answer3 && cardData.p06.answer4)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box display='flex' type='paint' padding={'20px 44px'} useRound border='50px' gap='4px'>
          <Input
            value={cardData.p06.answer1}
            onChange={event => handleChange(1, event.target.value)}
            readOnly={cardData.p06.isSubmitted}
            status={!cardData.p06.isSubmitted ? InputStatus.ENABLE : !cardData.p06.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            width='52px'
            ariaLabel='계산식 십의 자리 수'
          />
          <Input
            value={cardData.p06.answer2}
            onChange={event => handleChange(2, event.target.value)}
            readOnly={cardData.p06.isSubmitted}
            status={!cardData.p06.isSubmitted ? InputStatus.ENABLE : !cardData.p06.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            width='52px'
            ariaLabel='계산식 일의 자리 수1'
          />
          <Typography>×</Typography>
          <Input
            value={cardData.p06.answer3}
            onChange={event => handleChange(3, event.target.value)}
            readOnly={cardData.p06.isSubmitted}
            status={!cardData.p06.isSubmitted ? InputStatus.ENABLE : !cardData.p06.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
            width='52px'
            ariaLabel='계산식 일의 자리 수2'
          />
          <Typography>=</Typography>
          <Input
            value={cardData.p06.answer4}
            onChange={event => handleChange(4, event.target.value)}
            readOnly={cardData.p06.isSubmitted}
            status={!cardData.p06.isSubmitted ? InputStatus.ENABLE : !cardData.p06.isCorrect4 ? InputStatus.ERROR : InputStatus.ENABLE}
            width='130px'
            ariaLabel='답안'
          />
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
              <Typography>3, 2, 8, 256</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
                {
                  '큰 수 2개를 곱해지는 수의 십의 자리와 곱하는 수의 일의 자리에 놓아 만든 곱셈식을 계산해 보면 82×3=246, 32×8=256입니다. 따라서 계산 결과가 가장 큰 곱셈식은 32×8=256 입니다.'
                }
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
