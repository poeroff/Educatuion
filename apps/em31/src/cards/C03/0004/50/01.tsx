import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
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
  TH,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import C03_0004_50 from './store';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0004_50);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='40px' />
        <Box>
          <Box vAlign='center'>
            주어진 세 수를 이용하여
            <Box marginLeft='5px' marginRight='5px' hAlign='center'>
              <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='48px' />
            </Box>
            안에 알맞은 수를 써넣으세요.
          </Box>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isAllCorrect),
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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 9,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 10,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isAnswer1 = checkAnswers(cardData.p01.answer1, cardData.p01.solution1);
    const isAnswer3 = checkAnswers(cardData.p01.answer2, cardData.p01.solution2[0]);
    const isAnswer4 = checkAnswers(cardData.p01.answer2, cardData.p01.solution2[1]);

    const isCorrect1 = isAnswer1.every(answer => answer);
    const isCorrect2 = isAnswer3.every(answer => answer) || isAnswer4.every(answer => answer);
    const isAllCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect1, isCorrect2, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer1[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer1[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer1[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer1[4],
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p01.answer2[0],
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p01.answer2[1],
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: cardData.p01.answer2[2],
          },
          {
            subKey: 9,
            type: 'TEXT',
            value: cardData.p01.answer2[3],
          },
          {
            subKey: 10,
            type: 'TEXT',
            value: cardData.p01.answer2[4],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
              ] || cardData.p01.answer1,
            answer2:
              [
                userSubmissionList[0].inputData[5]?.value,
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
                userSubmissionList[0].inputData[8]?.value,
                userSubmissionList[0].inputData[9]?.value,
              ] || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (key: number, index: number, value: string) => {
    if (key === 1) {
      const inputAnswer = [...cardData.p01.answer1];
      inputAnswer[index] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: inputAnswer } }));
    } else if (key === 2) {
      const inputAnswer = [...cardData.p01.answer2];
      inputAnswer[index - 6] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: inputAnswer } }));
    }
    changeData('P01', 1, index + 1, value);
  };

  const handleInputStatus = (key: number, index: number): InputStatus => {
    if (key === 1) {
      return !isNotEmptyString(cardData.p01.answer1[index])
        ? InputStatus.DEFAULT
        : cardData.p01.isSubmitted && !(cardData.p01.answer1[index] === cardData.p01.solution1[index])
        ? InputStatus.ERROR
        : InputStatus.ENABLE;
    }
    return !isNotEmptyString(cardData.p01.answer2[index])
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !cardData.p01.isCorrect2
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isInputAnswer = () => {
    const answerList1 = [...cardData.p01.answer1];
    const answerList2 = [...cardData.p01.answer2];

    const hasEmptyValue = answerList1.some(element => element === '') || answerList2.some(element => element === '');

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

  const tdArr = [
    [
      <Box hAlign='center'>
        <Typography>9</Typography>
        <Typography>×</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer1[0]}
          onChange={e => handleChange(1, 0, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(1, 0)}
          ariaLabel='첫 번째 곱셈 첫 번째 숫자'
        />
        <Typography>=</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer1[1]}
          onChange={e => handleChange(1, 1, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(1, 1)}
          ariaLabel='첫 번째 곱셈 결과'
        />
      </Box>,
    ],
    [
      <Box hAlign='center'>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer1[2]}
          onChange={e => handleChange(1, 2, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(1, 2)}
          ariaLabel='두 번째 곱셈 첫 번째 숫자'
        />
        <Typography>×</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer1[3]}
          onChange={e => handleChange(1, 3, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(1, 3)}
          ariaLabel='두 번째 곱셈 두 번째 숫자'
        />
        <Typography>=</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer1[4]}
          onChange={e => handleChange(1, 4, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(1, 4)}
          ariaLabel='두 번째 곱셈 결과'
        />
      </Box>,
    ],
    [
      <Box hAlign='center'>
        <Typography>45</Typography>
        <Typography>÷</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer2[0]}
          onChange={e => handleChange(2, 6, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(2, 0)}
          ariaLabel='첫 번째 나눗셈 첫 번째 숫자'
        />
        <Typography>=</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer2[1]}
          onChange={e => handleChange(2, 7, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(2, 1)}
          ariaLabel='첫 번째 나눗셈 결과'
        />
      </Box>,
    ],
    [
      <Box hAlign='center'>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer2[2]}
          onChange={e => handleChange(2, 8, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(2, 2)}
          ariaLabel='첫 번째 나눗셈 결과'
        />
        <Typography>÷</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer2[3]}
          onChange={e => handleChange(2, 9, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(2, 3)}
          ariaLabel='두 번째 나눗셈 두 번째 숫자'
        />
        <Typography>=</Typography>
        <Input
          type='number'
          width='95px'
          value={cardData.p01.answer2[4]}
          onChange={e => handleChange(2, 10, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={handleInputStatus(2, 4)}
          ariaLabel='두 번째 나눗셈 결과'
        />
      </Box>,
    ],
  ];

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
      vAlign='start'
    >
      <Box marginTop='10px'>
        <Table color={EStyleTableTypes.GRAY} sizes={['52px', '49px', 'auto', 'auto']} useMathBorder>
          <TableMathCaption caption='곱셈 나눗셈 테이블' math={[]} hidden />
          <TBody>
            {[
              [45, 9],
              [45, 5],
            ].map((value, index) => (
              <TR key={index}>
                {index === 0 && (
                  <TH scope='row' color={EStyleTableTypes.GRAY} rowSpan={2}>
                    {value[0]}
                  </TH>
                )}
                <TH scope='col' color={EStyleTableTypes.GRAY}>
                  {value[1]}
                </TH>
                <TD hAlign='center' color={EStyleTableTypes.GRAY}>
                  {tdArr[index * 2]}
                </TD>
                <TD hAlign='center' color={EStyleTableTypes.GRAY}>
                  {tdArr[index * 2 + 1]}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>5, 45, 5, 9, 45 / 9, 5, 45, 5, 9 (또는 5, 9, 45, 9, 5)</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>45, 9, 5를 이용하여 곱셈식 2개, 나눗셈식 2개를 나타냅니다.</Typography>
            <br />
            <Typography>곱셈식: 9×5=45, 5×9=45</Typography>
            <br />
            <Typography>나눗셈식: 45÷9=5. 45÷5=9</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
