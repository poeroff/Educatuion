import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  Input,
  IQuestionProps,
  Label,
  List,
  Radio,
  Table,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Typography,
} from '@maidt-cntn/ui';
import EM04903 from '@maidt-cntn/math/pages/EM-049-03';
import { useEffect, useState } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import styled from '@emotion/styled';
import { MathExpression } from '@maidt-cntn/ui/math';

const P08 = () => {
  const pageNumber = 'P08';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: { value1: index } } }));
    changeData(pageNumber, mainKey, subKey, index);
  };
  const [isShow, setShow] = useState<boolean>(false);
  const submitAnswer = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData[pageNumber].answer.value1 === cardData[pageNumber].solution[0].value1;
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: mainKey,
          inputData: [
            {
              subKey: subKey,
              type: 'NUMBER',
              value: cardData[pageNumber].answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='8' type='icon' />
        빈칸에 들어갈 식은 어느 것인가요?
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = ['$9\\times70$', '$5\\times97$', '$90\\times5$', '$50\\times7$'];

  const tableNode: React.ReactNode = (
    <>
      <Box>
        <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
          <TableMathCaption caption='세로셈' math={['97', '*', '5']} />
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
              <TD>9</TD>
              <TD></TD>
            </TR>
            <TR>
              <TD>5</TD>
              <TD></TD>
              <TD>&times;</TD>
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
        <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
          <TableMathCaption caption='세로셈' math={['35', '+', '450']} />
          <THead hidden>
            <TR>
              <TH scope='col'>일의 자리</TH>
              <TH scope='col'>십의 자리</TH>
              <TH scope='col'>백의 자리</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>0</TD>
              <TD>5</TD>
              <TD>4</TD>
            </TR>
          </TBody>
          <TFoot>
            <TR>
              <TD>5</TD>
              <TD>8</TD>
              <TD>4</TD>
            </TR>
          </TFoot>
        </Table>
      </Box>
      <Box position='absolute' top='72px' left='calc(50% + 90px)'>
        <BoxWrap alignItems='center' gap='16px' height='56px'>
          <Arrow aria-label='35를 가르키는 화살표 아이콘' />
          <Typography fontSize='var(--font-size-32)'>7&times;5</Typography>
        </BoxWrap>
        <BoxWrap alignItems='center' gap='5px'>
          <Arrow aria-label='450을 가르키는 화살표 아이콘' />
          <Input width='120px' disabled ariaLabel='빈 칸' />
        </BoxWrap>
      </Box>
    </>
  );

  const radioNode: React.ReactNode = (
    <List gap={48} data={data} align='horizontal'>
      {({ value, index = 1 }) => (
        <Radio
          type={'square'}
          align='vertical'
          name={'radio-question-A'}
          label={value}
          value={index === cardData[pageNumber].answer.value1}
          onClick={() => handleChange(index)}
          readOnly={cardData[pageNumber].isSubmitted}
          isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].answer.value1 !== cardData[pageNumber].solution[0].value1}
        >
          <Box vAlign='center'>
            <Label value={index} marginRight={4} />
            <Typography fontSize='var(--font-size-32)'>
              <MathExpression equation={value ?? ''} />
            </Typography>
          </Box>
        </Radio>
      )}
    </List>
  );

  return (
    <EM04903
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      answer={cardData[pageNumber].answer.value1}
      tableNode={tableNode}
      radioNode={radioNode}
      solutions={cardData[pageNumber].solution}
      submitted={cardData[pageNumber].isSubmitted}
      submitType={'marking'}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
    />
  );
};

const Arrow = styled.div`
  position: relative;
  width: 40px;
  height: 2px;
  background: var(--color-black);

  :after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 2px solid var(--color-black);
    border-top: 0;
    border-right: 0;
    transform: translateY(calc(-50% + 1px)) rotate(45deg);
  }
`;

export default P08;
