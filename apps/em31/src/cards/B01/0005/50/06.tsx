import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import ConnectorLine from '../../../../assets/example/connector_line.svg';
import ConnectorArrow from '../../../../assets/example/connector_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { B01_0005_50 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P06 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0005_50);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: value } }));
    }
    changeData('P06', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p06.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p06.answer1.trim() === cardData.p06.solution1;
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));

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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
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
      saveData('P06');
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!cardData.p06.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!cardData.p06.answer1}
      onSubmit={onGrade}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              948
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>- 603</GrayRoundBox>
            </Box>
            <Box>
              <Input
                width='130px'
                onChange={e => handleInputChangeEvent(1, e.target.value)}
                ariaLabel='948-603 값'
                value={cardData.p06.answer1}
                maxLength={3}
                readOnly={cardData.p06.isSubmitted}
                status={
                  !cardData.p06.isSubmitted
                    ? !cardData.p06.answer1
                      ? InputStatus.DEFAULT
                      : InputStatus.ENABLE
                    : cardData.p06.answer1.trim() !== cardData.p06.solution1
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
            </Box>
          </BoxWrap>
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
              <Typography>345</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='가로셈' math={['948', '-', '603']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>8</TD>
                      <TD>4</TD>
                      <TD>9</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD>0</TD>
                      <TD>6</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD fontColor='var(--color-blue-800)'>5</TD>
                      <TD fontColor='var(--color-blue-800)'>4</TD>
                      <TD fontColor='var(--color-blue-800)'>3</TD>
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

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P06;
