import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { B01000360 } from './store';
import usePageData from '@/hooks/usePageData';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Input,
  Label,
  Image,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleTableTypes,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000360);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const PAGE_NUMBER = 'P02'

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        ☐ 안에 알맞은 수를 써넣으세요.
      </>
    ),
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    }
    changeData(PAGE_NUMBER, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p02.answer1}
      submitBtnColor={!cardData.p02.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Box display='flex' justifyContent='center'>
        <Box hAlign='center' width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='100px'>
            <Image src={'/C01/0003/20/DEC311002.png'} width={'910px'} alt='세자리 수 덧셈 그래프' />
          </BoxWrap>
        </Box>
      </Box>
      <Box hAlign='center'>
        <Input
          value={cardData.p02.answer1}
          onChange={event => handleChange(1, event.target.value)}
          maxLength={3}
          readOnly={cardData.p02.isSubmitted}
          status={cardData.p02.isSubmitted && cardData.p02.answer1.trim() !== cardData.p02.solution1 ? 'error' : ''}
          width='130px'
          ariaLabel='462와 396의 더한 값'
        />
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
              <Typography>858</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['462', '+', '396']} />
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
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>9</TD>
                      <TD>3</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'8'} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'5'} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'8'} onChange={() => {}} ariaLabel='백의 자리의 답' maxLength={1} readOnly />
                      </TD>
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