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
  Question,
  EStyleSizes,
  SvgIcon,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { B04_0008_10 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import empty_square from '@/assets/icon/math_empty_square.svg';

const P05 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B04_0008_10);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        <Box vAlign='center'>
          <Typography lineHeight='48px'>
            드론 비행에 사용할 드론이 500 대 있습니다. 드론 72 대로 로봇 모양 한 개를 만든다면 드론 500 대로는 로봇 모양을 몇 개까지 만들 수 있는지
            구해 보세요.
          </Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
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
      ],
    },
  ];

  const handleInputChange = (subKey: number, value: string) => {
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

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p05.answer1.trim() === cardData.p05.solution1;
      const isCorrect2 = cardData.p05.answer2.trim() === cardData.p05.solution2;
      const isCorrect3 = cardData.p05.answer3.trim() === cardData.p05.solution3;
      const isCorrect4 = cardData.p05.answer4.trim() === cardData.p05.solution4;
      const isCorrect5 = cardData.p05.answer5.trim() === cardData.p05.solution5;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;
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

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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

  const th_arr = [
    <>
      로봇 모양 수 ({' '}
      <SvgIcon
        type={ESvgType.IMG}
        alt='빈칸'
        src={empty_square}
        size='40px'
        style={{ display: 'inline-flex', verticalAlign: 'middle', position: 'relative', top: '-4px' }}
      />{' '}
      ) 예상하기
    </>,
    <>
      사용할 드론 수 계산하기 ( 72 ×{' '}
      <SvgIcon
        type={ESvgType.IMG}
        alt='빈칸'
        src={empty_square}
        size='40px'
        style={{ display: 'inline-flex', verticalAlign: 'middle', position: 'relative', top: '-3px' }}
      />{' '}
      )
    </>,
    '결과 확인하기',
  ];
  const td_arr = [
    [
      7,
      '72 × 7',
      <Input
        type='number'
        value={cardData.p05.answer1}
        status={
          !isNotEmptyString(cardData.p05.answer1)
            ? InputStatus.DEFAULT
            : cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer1, cardData.p05.solution1)
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
        onChange={e => handleInputChange(1, e.target.value)}
        ariaLabel='72×7의 답'
        maxLength={5}
        width='100px'
        readOnly={cardData.p05.isSubmitted}
      />,
    ],
    [
      6,
      <>
        72 ×{' '}
        <Input
          type='number'
          value={cardData.p05.answer2}
          status={
            !isNotEmptyString(cardData.p05.answer2)
              ? InputStatus.DEFAULT
              : cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer2, cardData.p05.solution2)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
          onChange={e => handleInputChange(2, e.target.value)}
          ariaLabel='로봇 모양 수가 6일 때 사용할 드론 수'
          maxLength={3}
          width='50px'
          readOnly={cardData.p05.isSubmitted}
        />
      </>,
      <Input
        type='number'
        value={cardData.p05.answer3}
        status={
          !isNotEmptyString(cardData.p05.answer3)
            ? InputStatus.DEFAULT
            : cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer3, cardData.p05.solution3)
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
        onChange={e => handleInputChange(3, e.target.value)}
        ariaLabel='72×6의 답'
        maxLength={5}
        width='100px'
        readOnly={cardData.p05.isSubmitted}
      />,
    ],
    [
      5,
      <>
        72 ×{' '}
        <Input
          type='number'
          value={cardData.p05.answer4}
          status={
            !isNotEmptyString(cardData.p05.answer4)
              ? InputStatus.DEFAULT
              : cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer4, cardData.p05.solution4)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
          onChange={e => handleInputChange(4, e.target.value)}
          ariaLabel='로봇 모양 수가 5일 때 사용할 드론 수'
          maxLength={3}
          width='50px'
          readOnly={cardData.p05.isSubmitted}
        />
      </>,
      <Input
        type='number'
        value={cardData.p05.answer5}
        status={
          !isNotEmptyString(cardData.p05.answer5)
            ? InputStatus.DEFAULT
            : cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer5, cardData.p05.solution5)
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
        onChange={e => handleInputChange(5, e.target.value)}
        ariaLabel='72×5의 답'
        maxLength={5}
        width='100px'
        readOnly={cardData.p05.isSubmitted}
      />,
    ],
    ['⋮', '⋮', '⋮'],
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p05.answer1 && cardData.p05.answer2 && cardData.p05.answer3 && cardData.p05.answer4 && cardData.p05.answer5)}
      submitBtnColor={
        !(cardData.p05.answer1 && cardData.p05.answer2 && cardData.p05.answer3 && cardData.p05.answer4 && cardData.p05.answer5)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={handleSubmit}
      useRound
      vAlign='start'
    >
      <Box vAlign='flex-start' marginBottom={20}>
        <Box display='flex' alignItems='center'>
          <Label value='ㄹ' lineColor='none' background='var(--color-grey-600)' color='var(--color-white)' marginRight={20} />
          <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
            만들 수 있는 로봇 모양 수 ({' '}
            <SvgIcon
              type={ESvgType.IMG}
              alt='빈칸'
              src={empty_square}
              size='40px'
              style={{ display: 'inline-flex', verticalAlign: 'middle', position: 'relative', top: '-4px' }}
            />{' '}
            ) 를 예상하여 표를 완성해 보세요.
          </Typography>
        </Box>
      </Box>

      <Box marginTop='10px'>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['32%', '38%', '30%']}>
          <THead>
            <TR>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
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
                    <TD key={index} hAlign='center' vAlign='middle' height='60px' color={EStyleTableTypes.DEFAULT}>
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
              <Typography>(위에서부터) 504 / 6, 432 / 5, 360</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='10px'>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                <Typography>만들 수 있는 로봇 모양 수가 7 개라면 72×7=504 이므로 사용할 드론은 504 대 입니다.</Typography>
              </Question>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                <Typography>만들 수 있는 로봇 모양 수가 6 개라면 72×6=432 이므로 사용할 드론은 432 대 입니다.</Typography>
              </Question>
              <Question type='dot' size={EStyleSizes['SMALL']}>
                <Typography>만들 수 있는 로봇 모양 수가 5 개라면 72×5=360 이므로 사용할 드론은 360 대 입니다.</Typography>
              </Question>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
