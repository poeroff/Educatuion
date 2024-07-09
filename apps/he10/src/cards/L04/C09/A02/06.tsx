import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Input,
  Typography,
  List,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EStyleTableTypes,
  Scroll,
  EStyleFontSizes,
  InputStatus,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container, TextBoard } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C09A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P06 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C09A02);
  const [isShow, setShow] = useState(false);
  const pageNumber = 'P06';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the description of the graph and complete the table.',
    size: 'medium',
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const handleOnSubmit = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = isAnswer(cardData[pageNumber].answer, cardData[pageNumber].solution);
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
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

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: value } }));
    changeData(pageNumber, 1, 1, value);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleOnSubmit}
      submitDisabled={!isNotEmptyString(cardData[pageNumber].answer)}
      submitBtnColor={
        isNotEmptyString(cardData[pageNumber].answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap height='calc(100% - 108px)'>
        <Box hAlign='center'>
          <TextBoard color='var(--color-yellow-400)' width='330px'>
            <Box>
              <Typography weight='var(--font-weight-bold)'>Analysis</Typography>
            </Box>
            <Box>
              <Scroll height='185px'>
                <Typography useGap={false}>
                  Metal had the highest recycling rate at 75 percent. Glass held the second position with a 59 percent rate. Plastic followed closely
                  behind with a recycling rate of 56 percent. Notably, waste paper not only was recycled the least, at 48 percent, but also fell
                  significantly below the average recycling rate of 60 percent.
                </Typography>
              </Scroll>
            </Box>
          </TextBoard>
        </Box>
        <Box useFull>
          <Box hAlign='center' marginBottom='12px'>
            <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
              Analysis
            </Typography>
          </Box>
          <Box>
            <Table color={EStyleTableTypes.GRAY} sizes={['64px', '206px', 'auto']} caption='본문 분석'>
              <THead>
                <TR>
                  <TH scope='col' color={EStyleTableTypes.GRAY} />
                  <TH scope='col' color={EStyleTableTypes.GRAY} vAlign='middle'>
                    Recycling Rate
                  </TH>
                  <TH scope='col' color={EStyleTableTypes.GRAY} vAlign='middle'>
                    Material Types
                  </TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD color={EStyleTableTypes.GRAY}>4th</TD>
                  <TD color={EStyleTableTypes.GRAY}>
                    <Box display='flex'>
                      <Typography>5)</Typography>
                      <Input
                        width='245px'
                        value={cardData[pageNumber].answer}
                        onChange={e => handleChange(e.target.value)}
                        maxLength={Math.max(...cardData.wordArr.map(word => word.length)) + 3}
                        readOnly={cardData[pageNumber].isSubmitted}
                        placeholder='내용을 넣어 주세요.'
                        status={
                          cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
                            ? InputStatus.ERROR
                            : isNotEmptyString(cardData[pageNumber].answer)
                            ? InputStatus.ENABLE
                            : InputStatus.DEFAULT
                        }
                        ariaLabel='5번 문제의 답란'
                      />
                    </Box>
                  </TD>
                  <TD color={EStyleTableTypes.GRAY}>waste paper</TD>
                </TR>
              </TBody>
            </Table>
          </Box>
        </Box>
      </BoxWrap>

      <Box>
        <TextView title='보기'>
          <List align='horizontal' data={cardData.wordArr} row={({ value }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageNumber].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
