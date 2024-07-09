import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';

import headerIcon from '@/assets/icon/m_default_01.svg';
import { C01000341 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000341);
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
      ],
    },
  ];

  const onCalculate = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim().toLowerCase() === cardData.p01.solution2;
      const isCorrect3 = cardData.p01.answer3.trim() === cardData.p01.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
    // eslint-disable-next-line
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />☐ 안에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['2☐3', '+', '☐72']} />
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
                <TD>3</TD>
                <TD>
                  <Input
                    value={cardData.p01.answer1}
                    type='number'
                    onChange={event => handleChange(1, event.target.value)}
                    placeholder=''
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.isSubmitted ? InputStatus.ENABLE : !(cardData.p01.answer1 === cardData.p01.solution1) ? InputStatus.ERROR : InputStatus.ENABLE}
                    ariaLabel='㉠의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD>7</TD>
                <TD>
                  <Input
                    value={cardData.p01.answer2}
                    type='number'
                    onChange={event => handleChange(2, event.target.value)}
                    placeholder=''
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.isSubmitted ? InputStatus.ENABLE : !(cardData.p01.answer2 === cardData.p01.solution2) ? InputStatus.ERROR : InputStatus.ENABLE}
                    maxLength={1}
                    ariaLabel='㉡의 자리의 답'
                  />
                </TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer3}
                    type='number'
                    onChange={event => handleChange(3, event.target.value)}
                    placeholder=''
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.isSubmitted ? InputStatus.ENABLE : !(cardData.p01.answer3 === cardData.p01.solution3) ? InputStatus.ERROR : InputStatus.ENABLE}
                    maxLength={1}
                    ariaLabel='㉢의 자리의 답'
                  />
                </TD>
                <TD>1</TD>
                <TD>6</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
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
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>(위에서부터) 4, 3, 5</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['2☐3', '+', '☐72']} />
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
                      <TD>3</TD>
                      <TD>
                        <Input value={'㉠'} onChange={() => {}} ariaLabel='㉠의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD>7</TD>
                      <TD>
                        <Input value={'㉡'} onChange={() => {}} ariaLabel='㉡의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TFoot>
                      <TR>
                        <TD>
                          <Input value={'㉢'} onChange={() => {}} ariaLabel='㉢의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>1</TD>
                        <TD>6</TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Typography>3+2=㉢, ㉢=5</Typography>
                <Typography>㉠+7=11, ㉠=4</Typography>
                <Typography>1+2+㉡=6, ㉡=3</Typography>
              </Box>
            </BoxWrap>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>받아올림에 주의하여 일의 자리부터 차례로 계산하여 ☐ 안에 알맞은 수를 구해 봐요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
