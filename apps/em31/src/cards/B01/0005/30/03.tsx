import { useEffect, useState } from 'react';

import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
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

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0005_30 } from './store';

const P03 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(B01_0005_30);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />세 자리 수가 쓰인 카드 2장에 얼룩이 생겼습니다. 빨간색 카드에 쓰인 수가 더 크고 두 수의 차가 414일
        때, 각각의 카드에 쓰인 수를 구해 보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
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
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    if (isNotEmptyString(cardData.p03.answer1) && isNotEmptyString(cardData.p03.answer2)) {
      return false;
    } else {
      return true;
    }
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p03.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p03.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(show => !show);
      return;
    }

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        isCorrect: cardData.p03.isCorrect1 && cardData.p03.isCorrect2,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1,
            isCorrect: cardData.p03.isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer2,
            isCorrect: cardData.p03.isCorrect2,
          },
        ],
        isCorrect: cardData.p03.isCorrect1 && cardData.p03.isCorrect2,
      },
    ];
    submitDataWithResult('P03', userSubmission, cardData.p03.isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            isCorrect1: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : cardData.p03.isCorrect1,
            isCorrect2: isSubmitted ? userSubmissionList[0].inputData[1]?.isCorrect : cardData.p03.isCorrect2,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          answer1: value,
          isCorrect1: value === cardData.p03.solution1,
        },
      }));
    } else if (subKey === 2) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          answer2: value,
          isCorrect2: value === cardData.p03.solution2,
        },
      }));
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
    >
      <BoxWrap justifyContent='center' alignItems='center' paddingTop={20}>
        <Box useFull hAlign='center'>
          <Image
            src={'/B01/0005/30/DEC311004_2.png'}
            height='60px'
            alt='백의 자리와 일의 자리에 얼룩이 있고, 십의 자리 숫자가 4인 파란색 카드가 있습니다. 백의 자리가 2이고 십의 자리에 얼룩이 있고 일의 자리가 5인 빨간색 카드가 있습니다.'
          />
        </Box>
      </BoxWrap>

      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box marginTop='40px'>
          <Typography>파란색 카드</Typography>
          <Input
            status={!cardData.p03.answer1 ? 'default' : cardData.p03.isSubmitted && !cardData.p03.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            readOnly={cardData.p03.isSubmitted}
            value={cardData.p03.answer1}
            onChange={e => handleChange(1, e.target.value)}
            type='number'
            width='263px'
            ariaLabel='답을 입력하세요'
          />
        </Box>
        <Box marginTop='20px'>
          <Typography>빨간색 카드</Typography>
          <Input
            status={!cardData.p03.answer2 ? 'default' : cardData.p03.isSubmitted && !cardData.p03.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            readOnly={cardData.p03.isSubmitted}
            value={cardData.p03.answer2}
            onChange={e => handleChange(2, e.target.value)}
            type='number'
            width='263px'
            ariaLabel='답을 입력하세요'
          />
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
              <Typography>649, 235</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Typography>파란색 카드에 쓰인 수를 ㉠4㉡, 빨간색 카드에 쓰인 수를 2㉢5라고 하면 ㉠4㉡-2㉢5=414 입니다.</Typography>
            <BoxWrap marginTop='30px'>
              <Box hAlign='center' marginLeft={20} flexDirection='row' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['26', '+', '9']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>㉡</TD>
                      <TD>4</TD>
                      <TD>㉠</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>㉢</TD>
                      <TD>2</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>4</TD>
                      <TD>1</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
                <Box hAlign='center' marginLeft={100} flexDirection='column'>
                  <Typography>㉡-5=4, ㉡=9</Typography>
                  <Typography>4-㉢=1, ㉢=3</Typography>
                  <Typography>㉠-2=4, ㉠=6</Typography>
                </Box>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P03;
