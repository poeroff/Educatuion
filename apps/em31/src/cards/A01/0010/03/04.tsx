import { ChangeEvent, useEffect, useState } from 'react';

import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
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

const PAGE = 'P04';

const P04 = () => {
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
            <SvgIcon alt='빈칸' src={empty_square} size='43px' />
            &nbsp;안에 알맞은 수를 찾아 써넣어 문제를 풀고, 뺄셈 문제
          </Box>
          <Box>를 만들어 해결해 보세요.</Box>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p04.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p04.answer4,
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
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, [name]: value } }));
    changeData(PAGE, 1, subKey, value);
  };

  const handleSubmit = () => {
    const data = cardData.p04;
    const isCorrect1 = isAnswer(data.answer1.trim(), data.solution1);
    const isCorrect2 = isAnswer(data.answer2.trim(), data.solution2);
    const isCorrect3 = isAnswer(data.answer3.trim(), data.solution3);
    const isCorrect4 = isAnswer(data.answer4.trim(), data.solution4);
    const allCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
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
            value: cardData.p04.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p04.answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p04.answer4,
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
      !cardData.p04.isSubmitted &&
      (cardData.p04.answer1 === '' || cardData.p04.answer2 === '' || cardData.p04.answer3 === '' || cardData.p04.answer4 === '')
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p04]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p04.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p04.isSubmitted ? handleShowAnswer : handleSubmit}
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
            쓰담 달리기에서 알루미늄 캔을 지난달에{' '}
            <Input
              textAlign='center'
              width='130px'
              value={cardData.p04.answer1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 1)}
              ariaLabel='페트병의 개수를 입력하세요.'
              name='answer1'
              readOnly={cardData.p04.isSubmitted}
              status={
                !cardData.p04.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p04.answer1, cardData.p04.solution1)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
            />
            개, 이번 달에{' '}
            <Input
              textAlign='center'
              width='130px'
              value={cardData.p04.answer2}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 2)}
              ariaLabel='유리병의 개수를 입력하세요.'
              name='answer2'
              readOnly={cardData.p04.isSubmitted}
              status={
                !cardData.p04.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p04.answer2, cardData.p04.solution2)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
            />
            개 주웠습니다. 이번 달에 주운 알루미늄 캔은 지난달보다 몇 개 줄었나요?
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
              value={cardData.p04.answer3}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 3)}
              ariaLabel='식을 입력하세요.'
              name='answer3'
              readOnly={cardData.p04.isSubmitted}
              maxLength={100}
              status={
                !cardData.p04.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p04.answer3, cardData.p04.solution3)
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
              value={cardData.p04.answer4}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 4)}
              ariaLabel='답을 입력하세요.'
              name='answer4'
              readOnly={cardData.p04.isSubmitted}
              status={
                !cardData.p04.isSubmitted
                  ? InputStatus.ENABLE
                  : isAnswer(cardData.p04.answer4, cardData.p04.solution4)
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
              <Typography>287, 121, 287-121=166, 166</Typography>
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
                    <TR>
                      <TD>7</TD>
                      <TD>8</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD>1</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>6</TD>
                      <TD>1</TD>
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

export default P04;
