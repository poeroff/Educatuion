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
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { C01000441 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01000441);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        바르게 계산한 친구의 이름을 써 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
      ],
    },
  ];

  const handleInputChange = (subkey: number, value: string) => {
    if (subkey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, value1: value } }));
    }
    changeData('P01', 1, subkey, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.p01.value1, cardData.p01.answer1);
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.value1,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect: isCorrect, isSubmitted: true } }));
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
            value1: userSubmissionList[0].inputData[0]?.value || cardData.p01.value1,
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
      useRound
      submitDisabled={!cardData.p01.value1}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.value1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box type='dashed' padding='20px 44px' useRound useFull flexDirection='column' vAlign='center'>
          <Box width='100%' height='58px' background='var(--color-pink-200)' hAlign='center' borderRadius='8px'>
            <Typography size={EStyleFontSizes.MEDIUM}>채원</Typography>
          </Box>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']} marginTop={24}>
            <TableMathCaption caption='세로셈' math={['734', '+', '869']} />
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
                <TD>4</TD>
                <TD>3</TD>
                <TD>7</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>9</TD>
                <TD>6</TD>
                <TD>8</TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>3</TD>
                <TD>0</TD>
                <TD>5</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>

        <Box type='dashed' padding='20px 44px' useRound useFull flexDirection='column' vAlign='center'>
          <Box width='100%' height='58px' hAlign='center' background='var(--color-pink-200)' borderRadius='8px'>
            <Typography size={EStyleFontSizes.MEDIUM}>현숙</Typography>
          </Box>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']} marginTop={24}>
            <TableMathCaption caption='세로셈' math={['734', '+', '869']} />
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
                <TD>4</TD>
                <TD>3</TD>
                <TD>7</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>9</TD>
                <TD>6</TD>
                <TD>8</TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>3</TD>
                <TD>0</TD>
                <TD>6</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <Box marginTop='24px' hAlign='center'>
        <Input
          status={cardData.p01.isSubmitted && !cardData.p01.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
          readOnly={cardData.p01.isSubmitted}
          width='292px'
          ariaLabel='바르게 계산한 친구의 이름 작성'
          value={cardData.p01.value1}
          onChange={e => {
            handleInputChange(1, e.target.value);
          }}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>현숙</Typography>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>채원: 734+869의 십의 자리 계산에서 1+3+6=10이므로</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>백의 자리 계산에 1을 더해야 합니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
