import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import {
  IQuestionProps,
  EStyleButtonTypes,
  BoxWrap,
  Box,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TD,
  TFoot,
  Input,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A01_0001_05 } from './store';
import { checkAnswers, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P05 = () => {
  const pageKey = 'P05';
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0001_05);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: <>계산해 보세요.</>,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: Array(6).fill(''),
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(show => !show);
      return;
    }

    const results = checkAnswers(cardData[pageKey].answer, cardData[pageKey].solution);
    const isCorrect = results.every(item => item);

    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isCorrect,
        isListCorrect: results,
      },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0].isCorrect ?? false,
            isListCorrect: isSubmitted ? checkAnswers(userSubmissionList[0].inputData[0].value, cardData[pageKey].solution) : Array(6).fill(false),
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const newAnswer = cardData[pageKey].answer.map((item, idx) => (subKey === idx + 1 ? value : item));
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newAnswer } }));
    changeData(pageKey, 1, 1, newAnswer);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId='targetContainer-1'
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData[pageKey].answer.every(item => isNotEmptyString(item))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={cardData[pageKey].answer.some(item => !isNotEmptyString(item))}
      onSubmit={handleSubmit}
    >
      <Box hAlign='center' vAlign='flex-start' width='880px' paddingLeft='20px'>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound marginRight='50px' height='290px' useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['26', '+', '9']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>6</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>9</TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    status={
                      !isNotEmptyString(cardData[pageKey].answer[0])
                        ? 'default'
                        : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[0]
                        ? 'error'
                        : 'enable'
                    }
                    value={cardData[pageKey].answer[0]}
                    onChange={e => handleChange(1, e.target.value.trim())}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    status={
                      !isNotEmptyString(cardData[pageKey].answer[1])
                        ? 'default'
                        : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[1]
                        ? 'error'
                        : 'enable'
                    }
                    value={cardData[pageKey].answer[1]}
                    onChange={e => handleChange(2, e.target.value.trim())}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='60px'>
            <Typography>34+28=</Typography>
            <Input
              type='number'
              status={
                !isNotEmptyString(cardData[pageKey].answer[2])
                  ? 'default'
                  : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[2]
                  ? 'error'
                  : 'enable'
              }
              value={cardData[pageKey].answer[2]}
              onChange={e => handleChange(3, e.target.value.trim())}
              ariaLabel='34+28의 값'
              readOnly={cardData[pageKey].isSubmitted}
              width='130px'
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound height='290px' useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['53', '-', '7']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>3</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD></TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    status={
                      !isNotEmptyString(cardData[pageKey].answer[3])
                        ? 'default'
                        : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[3]
                        ? 'error'
                        : 'enable'
                    }
                    value={cardData[pageKey].answer[3]}
                    onChange={e => handleChange(4, e.target.value.trim())}
                    ariaLabel='일의 자리의 값'
                    readOnly={cardData[pageKey].isSubmitted}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    status={
                      !isNotEmptyString(cardData[pageKey].answer[4])
                        ? 'default'
                        : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[4]
                        ? 'error'
                        : 'enable'
                    }
                    value={cardData[pageKey].answer[4]}
                    onChange={e => handleChange(5, e.target.value.trim())}
                    ariaLabel='십의 자리의 값'
                    readOnly={cardData[pageKey].isSubmitted}
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='60px'>
            <Typography>72-36=</Typography>
            <Input
              type='number'
              status={
                !isNotEmptyString(cardData[pageKey].answer[5])
                  ? 'default'
                  : cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[5]
                  ? 'error'
                  : 'enable'
              }
              value={cardData[pageKey].answer[5]}
              onChange={e => handleChange(6, e.target.value.trim())}
              ariaLabel='72-36의 값'
              readOnly={cardData[pageKey].isSubmitted}
              width='130px'
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height='50%'
        show={isShow}
        bottomSheetTargetId='targetContainer-1'
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' marginRight='20px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>35, 46, 62, 36</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['26', '+', '9']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>1</TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD></TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>5</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['53', '-', '7']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD isMathCheck>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD></TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['34', '+', '28']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>1</TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>2</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['72', '-', '36']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD isMathCheck>7</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>3</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P05;
