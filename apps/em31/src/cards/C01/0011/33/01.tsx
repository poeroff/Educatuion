import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';
import arrowRightBlue from '@/assets/icon/arrowRightBlue.svg';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import C01_0011_33 from './store';
import usePageData from '@/hooks/usePageData';
import { checkAnswers, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C01_0011_33);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        잘못 계산한 이유를 쓰고 바르게 계산해보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isInputAnswerCorrect = (answerList: string[], solutionList: string[]) => {
    const incorrectPattern = /\d\s+\d/;
    return answerList.map((answer, index) => {
      if (incorrectPattern.test(answer)) {
        return false;
      }
      return isAnswer(answer, solutionList[index]);
    });
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = isInputAnswerCorrect(cardData.p01.answer, cardData.p01.solution);
    const isAllCorrect = isCorrect.every(answer => answer);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
            isCorrect: isCorrect[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer[4],
            isCorrect: isCorrect[4],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const { userId } = useRecoilValue(studentAtom);
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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
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
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
              ] || cardData.p01.answer,
            isCorrect:
              [
                userSubmissionList[0].inputData[0]?.isCorrect,
                userSubmissionList[0].inputData[1]?.isCorrect,
                userSubmissionList[0].inputData[2]?.isCorrect,
                userSubmissionList[0].inputData[3]?.isCorrect,
                userSubmissionList[0].inputData[4]?.isCorrect,
              ] || cardData.p01.isCorrect,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p01.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: answerList } }));
    changeData('P01', 1, subKey, value);
  };

  const isInputAnswer = () => {
    const answerList = [...cardData.p01.answer];
    const hasEmptyValue = answerList.some(element => element === '');

    return !hasEmptyValue;
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
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      useRound
    >
      <BoxWrap justifyContent='center' alignItems='center'>
        <TextView title={''} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='잘못된 세로셈' math={['362', '+', '583']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>2</TD>
                <TD>6</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD>8</TD>
                <TD>5</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>5</TD>
                <TD>4</TD>
                <TD>8</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
        <Box marginTop='15px'>
          <SvgIcon src={arrowRightBlue} title='오른쪽을 가르키는 화살표 아이콘' size='44px' />
        </Box>
        <TextView title={'바른 계산'} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['362', '+', '583']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>2</TD>
                <TD>6</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD>8</TD>
                <TD>5</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer[0]}
                    onChange={e => handleChange(1, e.target.value)}
                    ariaLabel='일의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[0] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[0] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[1]}
                    onChange={e => handleChange(2, e.target.value)}
                    ariaLabel='십의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[1] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[1] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[2]}
                    onChange={e => handleChange(3, e.target.value)}
                    ariaLabel='백의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[2] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[2] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
      </BoxWrap>
      <Box type='dashed' padding={'24px 48px'} marginTop={24} vAlign='start' hAlign='center' borderRadius={8}>
        <Box margin='9px 0'>
          <Tag label={'이유'} type={ETagLine.YELLOW} width='85px' height='40px' />
        </Box>
        <Typography>
          십의 자리 계산이 6+8={' '}
          <Input
            value={cardData.p01.answer[3]}
            onChange={e => handleChange(4, e.target.value)}
            width='130px'
            ariaLabel='6+8의 값'
            readOnly={cardData.p01.isSubmitted}
            status={!cardData.p01.answer[3] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[3] ? 'error' : 'enable'}
          />{' '}
          이므로 백의 자리 계산에&nbsp;
          <Input
            value={cardData.p01.answer[4]}
            onChange={e => handleChange(5, e.target.value)}
            width='130px'
            ariaLabel='100의 자리의 계산에 더해야할 값'
            readOnly={cardData.p01.isSubmitted}
            status={!cardData.p01.answer[4] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[4] ? 'error' : 'enable'}
          />{' '}
          을 더해야 합니다.
        </Typography>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>945 / 14,1</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['352', '+', '416']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD>8</TD>
                      <TD>5</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>5</TD>
                      <TD>4</TD>
                      <TD>9</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
