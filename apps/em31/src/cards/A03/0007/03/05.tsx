import { useEffect, useState } from 'react';
import {
  Box,
  Label,
  Typography,
  EStyleFontSizes,
  Input,
  IQuestionProps,
  Table,
  EStyleTableTypes,
  TBody,
  TR,
  TH,
  TD,
  THead,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { A03_0007_03 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A03_0007_03);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const th_arr = ['해열제', '하루(시간)', '먹는 시간 간격(시간)', '나눗셈', '먹을 수 있는 횟수(회)'];
  const td_arr = [
    [
      '다나',
      24,
      4,
      '24÷4',
      <Input
        type='number'
        width='110px'
        inputSize='small'
        value={cardData.p05.answer1}
        onChange={e => handleInputChangeEvent(1, e.target.value)}
        maxLength={2}
        readOnly={cardData.p05.isSubmitted}
        ariaLabel='다나의 먹을 수 있는 횟수(회)'
        status={
          !cardData.p05.isSubmitted
            ? !cardData.p05.answer1
            : cardData.p05.answer1.trim() !== cardData.p05.solution1
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />,
    ],
    [
      '시원',
      24,
      <Input
        type='number'
        width='110px'
        inputSize='small'
        value={cardData.p05.answer2}
        onChange={e => handleInputChangeEvent(2, e.target.value)}
        maxLength={2}
        readOnly={cardData.p05.isSubmitted}
        ariaLabel='시원의 먹는 시간 간격(시간)'
        status={
          !cardData.p05.isSubmitted
            ? !cardData.p05.answer2
            : cardData.p05.answer2.trim() !== cardData.p05.solution2
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />,
      <Input
        width='110px'
        inputSize='small'
        value={cardData.p05.answer3}
        onChange={e => handleInputChangeEvent(3, e.target.value)}
        maxLength={5}
        readOnly={cardData.p05.isSubmitted}
        ariaLabel='시원의 나눗셈'
        status={
          !cardData.p05.isSubmitted
            ? !cardData.p05.answer3
            : cardData.p05.answer3.trim() !== cardData.p05.solution3
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />,
      <Input
        type='number'
        width='110px'
        inputSize='small'
        value={cardData.p05.answer4}
        onChange={e => handleInputChangeEvent(4, e.target.value)}
        maxLength={2}
        readOnly={cardData.p05.isSubmitted}
        ariaLabel='시원의 먹을 수 있는 횟수(회)'
        status={
          !cardData.p05.isSubmitted
            ? !cardData.p05.answer4
            : cardData.p05.answer4.trim() !== cardData.p05.solution4
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />,
    ],
    [
      '튼튼',
      24,
      <Input
        type='number'
        width='110px'
        inputSize='small'
        value={cardData.p05.answer5}
        onChange={e => handleInputChangeEvent(5, e.target.value)}
        maxLength={2}
        readOnly={cardData.p05.isSubmitted}
        ariaLabel='튼튼의 먹는 시간 간격(시간)'
        status={
          !cardData.p05.isSubmitted
            ? !cardData.p05.answer5
            : cardData.p05.answer5.trim() !== cardData.p05.solution5
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />,
      <Input
        width='110px'
        inputSize='small'
        value={cardData.p05.answer6}
        onChange={e => handleInputChangeEvent(6, e.target.value)}
        maxLength={5}
        readOnly={cardData.p05.isSubmitted}
        ariaLabel='튼튼의 나눗셈'
        status={
          !cardData.p05.isSubmitted
            ? !cardData.p05.answer6
            : cardData.p05.answer6.trim() !== cardData.p05.solution6
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />,
      <Input
        type='number'
        width='110px'
        inputSize='small'
        value={cardData.p05.answer7}
        onChange={e => handleInputChangeEvent(7, e.target.value)}
        maxLength={2}
        readOnly={cardData.p05.isSubmitted}
        ariaLabel='튼튼의 먹을 수 있는 횟수(회)'
        status={
          !cardData.p05.isSubmitted
            ? !cardData.p05.answer7
            : cardData.p05.answer7.trim() !== cardData.p05.solution7
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />,
    ],
  ];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        <Box vAlign='center'>해열제를 종류별로 하루 동안 먹을 수 있는 횟수를 구해 보세요.</Box>
      </>
    ),
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer6: value } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer7: value } }));
    }
    changeData('P05', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p05.answer1.trim() === cardData.p05.solution1;
      const isCorrect2 = cardData.p05.answer2.trim() === cardData.p05.solution2;
      const isCorrect3 = cardData.p05.answer3.trim() === cardData.p05.solution3;
      const isCorrect4 = cardData.p05.answer4.trim() === cardData.p05.solution4;
      const isCorrect5 = cardData.p05.answer5.trim() === cardData.p05.solution5;
      const isCorrect6 = cardData.p05.answer6.trim() === cardData.p05.solution6;
      const isCorrect7 = cardData.p05.answer7.trim() === cardData.p05.solution7;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7;
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p05.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p05.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p05.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p05.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p05.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p05.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
            },
            {
              subKey: 7,
              type: 'TEXT',
              value: cardData.p05.answer7,
              isAnswer: true,
              isCorrect: isCorrect7,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P05', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p05.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p05.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p05.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p05.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p05.answer6,
            answer7: userSubmissionList[0].inputData[6]?.value || cardData.p05.answer7,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p05.answer1 &&
          cardData.p05.answer2 &&
          cardData.p05.answer3 &&
          cardData.p05.answer4 &&
          cardData.p05.answer5 &&
          cardData.p05.answer6 &&
          cardData.p05.answer7
        )
      }
      submitBtnColor={
        !(
          cardData.p05.answer1 &&
          cardData.p05.answer2 &&
          cardData.p05.answer3 &&
          cardData.p05.answer4 &&
          cardData.p05.answer5 &&
          cardData.p05.answer6 &&
          cardData.p05.answer7
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onGrade}
      useRound
      vAlign='start'
    >
      <Box display='flex'>
        <Box height={'60px'} display='flex' alignItems='center'>
          <Label value='ㄹ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={20} />
        </Box>
        <Typography useGap={false} size={EStyleFontSizes.LARGE}>
          표를 완성하여 해열제 종류별로 하루 동안 먹을 수 있는 횟수를 구해 보세요.
        </Typography>
      </Box>
      <Box marginTop='24px'>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['110px', '149px', 'auto', '120px', 'auto']}>
          <THead>
            <TR>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            {td_arr.map((item, index) => (
              <TR key={index}>
                {item.map((value, index) => {
                  return (
                    <TD key={index} hAlign='center' color={EStyleTableTypes.TERTIARY}>
                      {value}
                    </TD>
                  );
                })}
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>6, 6, 24÷6, 4, 8, 24÷8, 3</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>24÷4 = 6, 24÷6 = 4, 24÷8 = 3입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
