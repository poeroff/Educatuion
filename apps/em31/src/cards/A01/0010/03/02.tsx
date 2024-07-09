import { ChangeEvent, useEffect, useState } from 'react';

import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
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
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01001003Store } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P02';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01001003Store);
  const { userId } = useRecoilValue(studentAtom);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
          isCorrect: false,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} size='small' />
        <Box>
          <Box vAlign='center'>
            <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
            &nbsp;안에 알맞은 수를 찾아 써넣어 문제를 풀고, 덧셈 문제
          </Box>
          를 만들어 해결해 보세요.
        </Box>
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>, subKey: number) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, [name]: value } }));
    changeData(PAGE, 1, subKey, value);
  };

  const handleSubmit = () => {
    const data = cardData.p02;
    const isCorrect1 = isAnswer(data.answer1.trim(), data.solution1);
    const isCorrect2 = isAnswer(data.answer2.trim(), data.solution2);
    const isCorrect3 = isAnswer(data.answer3.trim(), data.solution3);
    const isCorrect4 = isAnswer(data.answer4.trim(), data.solution4);
    const allCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        isSubmitted: true,
        isCorrect: allCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p02.answer4,
            isAnswer: true,
            isCorrect: isCorrect4,
          },
        ],
        isCorrect: allCorrect,
      },
    ];
    submitDataWithResult(PAGE, userSubmission, allCorrect);
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (
      !cardData.p02.isSubmitted &&
      (cardData.p02.answer1 === '' || cardData.p02.answer2 === '' || cardData.p02.answer3 === '' || cardData.p02.answer4 === '')
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p02]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
      submitDisabled={isButtonDisabled}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      vAlign='start'
      useRound
    >
      <Box marginTop='10px' vAlign='flex-start'>
        <Box height={'60px'} display='flex' alignItems='center'>
          <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' />
        </Box>
        <Box marginLeft='8px'>
          <Typography size={EStyleFontSizes.MEDIUM}>
            지난달 쓰담 달리기에서 페트병을{' '}
            <Input
              textAlign='center'
              width='130px'
              value={cardData.p02.answer1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 1)}
              ariaLabel='페트병의 개수를 입력하세요.'
              name='answer1'
              readOnly={cardData.p02.isSubmitted}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
            />
            개, 유리병을{' '}
            <Input
              textAlign='center'
              width='130px'
              value={cardData.p02.answer2}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 2)}
              ariaLabel='유리병의 개수를 입력하세요.'
              name='answer2'
              readOnly={cardData.p02.isSubmitted}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
            />
            개 주웠습니다. 지난달에 주운 페트병과 유리병은 모두 몇 개인가요?
          </Typography>
        </Box>
      </Box>
      <Box marginTop='24px' flexDirection='column' vAlign='center'>
        <Box width='312px' vAlign='center'>
          <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Box marginLeft='8px'>
            <Input
              textAlign='center'
              width='255px'
              value={cardData.p02.answer3}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 3)}
              ariaLabel='식을 입력하세요.'
              name='answer3'
              readOnly={cardData.p02.isSubmitted}
              maxLength={100}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p02.answer3, cardData.p02.solution3)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
            />
          </Box>
        </Box>
        <Box marginTop='8px' width='312px' vAlign='center'>
          <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Box marginLeft='8px'>
            <Input
              textAlign='center'
              width='155px'
              value={cardData.p02.answer4}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 4)}
              ariaLabel='답을 입력하세요.'
              name='answer4'
              readOnly={cardData.p02.isSubmitted}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p02.answer4, cardData.p02.solution4)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShowAnswer}
        bottomSheetTargetId='targetContainer'
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>416, 135, 416+135=551, 551</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='start' flexDirection='column' alignItems='start' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['24', '-', '7']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>1</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>3</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>1</TD>
                      <TD>5</TD>
                      <TD>5</TD>
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

export default P02;
