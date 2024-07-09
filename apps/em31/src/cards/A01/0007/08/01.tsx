import {
  BottomSheet,
  Box,
  BoxWrap,
  Carousel,
  Dialog,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  ITd,
  SvgIcon,
  Table,
  TableMathCaption,
  Tag,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0007_08 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import headerIcon from '@/assets/icon/header_star.svg';

// TODO 맞춤 학습 콘텐츠 카드 개발 이후 import 경로 수정

// import CEM310100071001 from '../../../C01/0007/10/01';
// import CEM310100071002 from '../../../C01/0007/10/02';
// import CEM310100071003 from '../../../C01/0007/10/03';

// import CEM310100072001 from '../../../C01/0007/20/01';
// import CEM310100072002 from '../../../C01/0007/20/02';
// import CEM310100072003 from '../../../C01/0007/20/03';
// import CEM310100072004 from '../../../C01/0007/20/04';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0007_08);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const [isShowCCardDialog, setIsShowCCardDialog] = useState<boolean>(false);

  const sliderCardList = !cardData.p01.isSubmitted
    ? []
    : cardData.p01.isCorrect
    ? ['C-EM31-01-0007-1001', 'C-EM31-01-0007-1002', 'C-EM31-01-0007-1003']
    : ['C-EM31-01-0007-2001', 'C-EM31-01-0007-2002', 'C-EM31-01-0007-2003', 'C-EM31-01-0007-2004'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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
      ],
      isCorrect: false,
    },
  ];

  const isAllAnswerFilled = cardData.p01.userInputs.every(v => isNotEmptyString(v));

  const getInputStatus = (index: number) => {
    if (!cardData.p01.isSubmitted || cardData.p01.isCorrect) {
      return '';
    }
    return cardData.p01.userInputs[index] === cardData.p01.correctAnswers[index] ? InputStatus.ENABLE : InputStatus.ERROR;
  };

  const handleLink = () => {
    setIsShowCCardDialog(true);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    setCardData(prev => {
      const newUserInputs = [...prev.p01.userInputs].map((v, i) => (i === index ? value : v));
      return { ...prev, p01: { ...prev.p01, userInputs: newUserInputs } };
    });
    changeData('P01', 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isAnswerList = cardData.p01.userInputs.map((value: string, index: number) => value === cardData.p01.correctAnswers[index]);
      const isCorrect = isAnswerList.every(v => v);

      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          isSubmitted: true,
          isCorrect,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: cardData.p01.userInputs.map((value, index) => ({
            subKey: index + 1,
            type: 'TEXT',
            value: value,
            isAnswer: isAnswerList[index],
          })),
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId || 1;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            userInputs: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData.p01.userInputs[i]),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isAllAnswerFilled}
      submitBtnColor={!isAllAnswerFilled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
      useLinkLabel={cardData.p01.isSubmitted}
      linkLabel='맞춤 학습하기'
      onLink={handleLink}
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['857', '-', '286']} />
            <TableHeadForThreeDigit />
            <TBody>
              <TR>
                <TD>7</TD>
                <TD>5</TD>
                <TD>8</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>6</TD>
                <TD>2</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.userInputs[2]}
                    onChange={e => handleChangeInput(e, 2)}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    status={getInputStatus(2)}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.userInputs[1]}
                    onChange={e => handleChangeInput(e, 1)}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    status={getInputStatus(1)}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.userInputs[0]}
                    onChange={e => handleChangeInput(e, 0)}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    status={getInputStatus(0)}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>973-597=</Typography>
            <Input
              width='130px'
              value={cardData.p01.userInputs[6]}
              onChange={e => handleChangeInput(e, 6)}
              ariaLabel='973-597의 값'
              readOnly={cardData.p01.isSubmitted}
              status={getInputStatus(6)}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['512', '-', '389']} />
            <TableHeadForThreeDigit />
            <TBody>
              <TR>
                <TD>2</TD>
                <TD>1</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>9</TD>
                <TD>8</TD>
                <TD>3</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.userInputs[5]}
                    onChange={e => handleChangeInput(e, 5)}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    status={getInputStatus(5)}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.userInputs[4]}
                    onChange={e => handleChangeInput(e, 4)}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    status={getInputStatus(4)}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.userInputs[3]}
                    onChange={e => handleChangeInput(e, 3)}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    status={getInputStatus(3)}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>454-386=</Typography>
            <Input
              width='130px'
              value={cardData.p01.userInputs[7]}
              onChange={e => handleChangeInput(e, 7)}
              ariaLabel='454-386의 값'
              readOnly={cardData.p01.isSubmitted}
              status={getInputStatus(7)}
            />
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet
        height={'50%'}
        show={isShowAnswer}
        bottomSheetTargetId={'targetContainer'}
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
              <Typography>{cardData.p01.correctAnswers.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['857', '-', '268']} />
                  <TableHeadForThreeDigit />
                  <TBody>
                    <TR isMathSolution>
                      <SmTD>10</SmTD>
                      <SmTD>14</SmTD>
                      <SmTD>7</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>7</SmTD>
                      <SmTD isMathCheck>5</SmTD>
                      <SmTD isMathCheck>8</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>8</SmTD>
                      <SmTD>6</SmTD>
                      <SmTD>2</SmTD>
                      <SmTD>-</SmTD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <SmTD>9</SmTD>
                      <SmTD>8</SmTD>
                      <SmTD>5</SmTD>
                      <SmTD></SmTD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['512', '-', '389']} />
                  <TableHeadForThreeDigit />
                  <TBody>
                    <TR isMathSolution>
                      <SmTD>10</SmTD>
                      <SmTD>10</SmTD>
                      <SmTD>4</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>2</SmTD>
                      <SmTD isMathCheck>1</SmTD>
                      <SmTD isMathCheck>5</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>9</SmTD>
                      <SmTD>8</SmTD>
                      <SmTD>3</SmTD>
                      <SmTD>-</SmTD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <SmTD>3</SmTD>
                      <SmTD>2</SmTD>
                      <SmTD>1</SmTD>
                      <SmTD></SmTD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['973', '-', '597']} />
                  <TableHeadForThreeDigit />
                  <TBody>
                    <TR isMathSolution>
                      <SmTD>10</SmTD>
                      <SmTD>16</SmTD>
                      <SmTD>8</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>3</SmTD>
                      <SmTD isMathCheck>7</SmTD>
                      <SmTD isMathCheck>9</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>7</SmTD>
                      <SmTD>9</SmTD>
                      <SmTD>5</SmTD>
                      <SmTD>-</SmTD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <SmTD>6</SmTD>
                      <SmTD>7</SmTD>
                      <SmTD>3</SmTD>
                      <SmTD></SmTD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['454', '-', '386']} />
                  <TableHeadForThreeDigit />
                  <TBody>
                    <TR isMathSolution>
                      <SmTD>10</SmTD>
                      <SmTD>14</SmTD>
                      <SmTD>3</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>4</SmTD>
                      <SmTD isMathCheck>5</SmTD>
                      <SmTD isMathCheck>4</SmTD>
                      <SmTD></SmTD>
                    </TR>
                    <TR>
                      <SmTD>6</SmTD>
                      <SmTD>8</SmTD>
                      <SmTD>3</SmTD>
                      <SmTD>-</SmTD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <SmTD>8</SmTD>
                      <SmTD>6</SmTD>
                      <SmTD></SmTD>
                      <SmTD></SmTD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isShowCCardDialog}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setIsShowCCardDialog(false);
        }}
        onConfirm={() => {
          setIsShowCCardDialog(false);
        }}
      >
        <Carousel data={sliderCardList} slideWidth={909} slideHeight={444} infinite={false} arrowGap={0} arrowSize={40} dots={false}>
          {CardSlider}
        </Carousel>
      </Dialog>
    </Container>
  );
};

export default P01;

const SmTD: React.FC<ITd> = props => {
  return (
    <TD width='45px' height='45px' {...props}>
      {props.children}
    </TD>
  );
};

const TableHeadForThreeDigit = () => {
  return (
    <THead hidden>
      <TR>
        <TH scope='col'>일의 자리</TH>
        <TH scope='col'>십의 자리</TH>
        <TH scope='col'>백의 자리</TH>
        <TH scope='col'>연산 기호</TH>
      </TR>
    </THead>
  );
};

// TODO 맞춤 학습 콘텐츠 카드 개발 이후 컴포넌트 수정
const CardSlider = ({ value }: { value?: unknown }) => {
  switch (value) {
    case 'C-EM31-01-0007-1001':
      return <div>C-EM31-01-0007-1001</div>;
    // return <CEM310100071001 />;
    case 'C-EM31-01-0007-1002':
      return <div>C-EM31-01-0007-1002</div>;
    // return <CEM310100071002 />;
    case 'C-EM31-01-0007-1003':
      return <div>C-EM31-01-0007-1003</div>;
    // return <CEM310100071003 />;
    case 'C-EM31-01-0007-2001':
      return <div>C-EM31-01-0007-2001</div>;
    // return <CEM310100072001 />;
    case 'C-EM31-01-0007-2002':
      return <div>C-EM31-01-0007-2002</div>;
    // return <CEM310100072002 />;
    case 'C-EM31-01-0007-2003':
      return <div>C-EM31-01-0007-2003</div>;
    // return <CEM310100072003 />;
    case 'C-EM31-01-0007-2004':
      return <div>C-EM31-01-0007-2004</div>;
    // return <CEM310100072004 />;
    default:
      return <></>;
  }
};
