import {
  BottomSheet,
  Box,
  BoxWrap,
  Drawing,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  ICanvasFunction,
  IQuestionProps,
  Input,
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
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';
import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01001003Store } from './store';
import { studentAtom } from '@/stores/student';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const PAGE = 'P03';

const P03 = () => {
  const exampleAnswer =
    '(예시 답안)\n- 문제 : 쓰담 달리기에서 페트병을 지난달에 416개, 이번 달에 324개 주웠습니다. 지난달과 이번 달에 주운 페트병은 모두 몇개인가요?\n- 식: 416+324=740\n- 답: 740개';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01001003Store);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} size='small' />
        <Box>
          <Box vAlign='center'>
            <SvgIcon alt='빈칸' src={empty_square} size='43px' />
            &nbsp;안에 알맞은 수를 찾아 써넣어 문제를 풀고, 덧셈 문제
          </Box>
          <Box>를 만들어 해결해 보세요.</Box>
        </Box>
      </>
    ),
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'CANVAS',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasDataURL: canvasDataURL } }));
        changeData(PAGE, 1, 3, canvasDataURL);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            canvasDataURL: userSubmissionList[0].inputData[2]?.value || cardData.p03.canvasDataURL,
            isSubmitted,
          },
        }));
        if (userSubmissionList[0].inputData[2]?.value || cardData.p03.canvasDataURL) {
          if (userSubmissionList[0].inputData[2]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[2]?.value));
          else canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p03.canvasDataURL));
        }
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>, subKey: number) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, [name]: value } }));
    changeData(PAGE, 1, subKey, value);
  };

  const handleSubmit = async () => {
    if (!cardData.p03.isSubmitted) {
      const data = cardData.p03;
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, canvasDataURL: canvasDataURL, isSubmitted: true } }));
      }
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: data.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: data.answer2,
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'CANVAS',
              value: canvasDataURL,
            },
          ],
        },
      ];
      submitData(PAGE, userSubmission);
    }
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
    if (!cardData.p03.isSubmitted && (cardData.p03.answer1 === '' || cardData.p03.answer2 === '')) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p03]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitDisabled={isButtonDisabled}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitLabel={cardData.p03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={cardData.p03.isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <Box vAlign='flex-start' alignItems='center'>
        <Box height={'68px'} display='flex' alignItems='center'>
          <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        </Box>
        <Typography>이전 표에서 두 수를 골라 덧셈 문제를 만들고 해결해 보세요.</Typography>
      </Box>
      <Box width='100%' height='220px' marginTop='24px'>
        <Drawing ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p03.isSubmitted} />
      </Box>
      <BoxWrap justifyContent='flex-end' marginTop='24px'>
        <Box>
          <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Input
            minWidth='298px'
            marginLeft={12}
            value={cardData.p03.answer1}
            name='answer1'
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 1)}
            ariaLabel='덧셈 문제의 식'
            readOnly={cardData.p03.isSubmitted}
          />
        </Box>
        <Box>
          <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Input
            minWidth='298px'
            marginLeft={12}
            value={cardData.p03.answer2}
            name='answer2'
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInputs(e, 2)}
            ariaLabel='덧셈 문제의 답'
            readOnly={cardData.p03.isSubmitted}
          />
        </Box>
      </BoxWrap>
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
              <Typography usePre>{exampleAnswer}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='start' flexDirection='column' alignItems='start' useRound useFull>
                <Typography usePre>(예시 답안)</Typography>
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
                      <TD>4</TD>
                      <TD>2</TD>
                      <TD>3</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>0</TD>
                      <TD>4</TD>
                      <TD>7</TD>
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
