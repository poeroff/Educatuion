import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C01000320P } from './store';
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
  EStyleFontSizes,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000320P);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

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
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.P03.isSubmitted ? (cardData.P03.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
  };

  const onGrade = () => {
    if (cardData.P03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.P03.answer1.trim() === cardData.P03.solution1;
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.P03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P03: {
            ...prev.P03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P03.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer1: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      submitLabel={cardData.P03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.P03.answer1}
      submitBtnColor={!cardData.P03.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Box display='flex' justifyContent='center'>
        <Box hAlign='center' width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='100px'>
            <Image src={'/C01/0003/20/DEC311002.png'} width={'910px'} alt='462와 396의 합을 나타내는 빈칸이 있습니다.' />
          </BoxWrap>
        </Box>
      </Box>
      <Box hAlign='center'>
        <Input
          value={cardData.P03.answer1}
          onChange={event => handleChange(1, event.target.value)}
          maxLength={3}
          readOnly={cardData.P03.isSubmitted}
          status={cardData.P03.isSubmitted && cardData.P03.answer1.trim() !== cardData.P03.solution1 ? 'error' : ''}
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

export default P03;
