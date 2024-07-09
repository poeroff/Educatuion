import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  IQuestionProps,
  Box,
  Rating,
  Typography,
  Tag,
  ETagLine,
  Input,
  Label,
  BottomSheet,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import styled from 'styled-components';

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export interface IQuestionData {
  text: string | undefined;
  score: number;
}

export interface IEEL01C04A08P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  pageInfo: IPageInfo;
  data: IQuestionData[];
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string;
    }[][];
  }[];
}

const EEL01C04A08P01 = ({ headerInfo, questionInfo, data, pageInfo, getCorrectData, getDefaultData }: IEEL01C04A08P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const correctAnswer = getCorrectData(pageInfo.pageNum)[0].inputDatas[0][0].value;
  const currentAnswer = getValueInputData(pageInfo.mainKey, pageInfo.subKey);

  const [questionList, setQuestionList] = useState<Array<IQuestionData>>(() => {
    if ((currentAnswer as string) !== '') {
      return JSON.parse(currentAnswer as string);
    }
    return data;
  });

  const changeQuestion = (newQuestion: string) => {
    setQuestionList(prevQuestionList => {
      const updatedQuestionList = [...prevQuestionList];
      updatedQuestionList[questionList.length - 1].text = newQuestion;
      return updatedQuestionList;
    });
  };

  const updateScore = (index: number, newScore: number) => {
    setQuestionList(prevQuestionList => {
      const updatedQuestionList = [...prevQuestionList];
      updatedQuestionList[index].score = newScore;
      return updatedQuestionList;
    });
  };

  useEffect(() => {
    handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, JSON.stringify(questionList));
  }, [questionList]);

  const handleSubmit = () => {
    if (!isComplete) {
      submitPageData();
      return;
    }
    setIsOpen(!isOpen);
  };

  const validationCheck = () => {
    return (
      !questionList.every(question => question.score != 0) ||
      questionList[questionList.length - 1].text === undefined ||
      questionList[questionList.length - 1].text?.trim().length === 0
    );
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitDisabled={validationCheck()}
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={validationCheck() || isOpen ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      bodyId='targetContainer'
    >
      <BoxWrap useFull>
        <Box display={'flex'} flexDirection={'column'} gap={20}>
          <Box display={'flex'} flexDirection={'column'} marginLeft={-35}>
            <CustomTable>
              <tbody>
                {questionList.map(
                  (question: IQuestionData, index: number) =>
                    index < questionList.length - 1 && (
                      <tr key={`question_${index}`}>
                        <QuestionCell>
                          <Label background={'#1E78FF'} color={'#FFFFFF'} type={'paint'} size={'x-small'} value={index + 1} />
                          <Typography weight={500} color={'var(--color-grey-900)'}>
                            {question.text}
                          </Typography>
                        </QuestionCell>
                        <RatingCell>
                          <Rating
                            score={question.score}
                            onChange={newScore => {
                              updateScore(index, newScore);
                            }}
                            readOnly={isComplete}
                          ></Rating>
                        </RatingCell>
                      </tr>
                    ),
                )}
                <tr>
                  <QuestionCell>
                    <Input
                      width='592px'
                      placeholder='내용을 넣어 주세요.'
                      value={questionList[questionList.length - 1].text}
                      onChange={e => changeQuestion(e.target.value)}
                      disabled={isComplete}
                    ></Input>
                  </QuestionCell>
                  <RatingCell>
                    <Rating
                      score={questionList[questionList.length - 1].score}
                      onChange={newScore => {
                        updateScore(questionList.length - 1, newScore);
                      }}
                      readOnly={isComplete}
                    ></Rating>
                  </RatingCell>
                </tr>
              </tbody>
            </CustomTable>
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginLeft={-35}>
            {isOpen && (
              <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
                <Box marginBottom={'25px'} marginTop={'50px'} background={'gray'} padding={'28px'} borderRadius={'12px'} width={'952px'}>
                  <Box margin={'25px 0'}>
                    <Tag fontSize={'22px'} height={'auto'} label={'답안'} type={ETagLine.GREEN} width={'auto'} />
                    <Box margin={'25px 0 50px'}>
                      <Typography>{correctAnswer}</Typography>
                    </Box>
                  </Box>
                </Box>
              </BottomSheet>
            )}
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const CustomTable = styled.table`
  width: 850px;
  height: 336px;
  margin-top: 30px;
  padding: 20px 0px 10px 0px;
  gap: 40px;

  td {
    height: 65px;
  }
`;

const QuestionCell = styled.td`
  width: 664px;
  vertical-align: middle;
  margin: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RatingCell = styled.td`
  width: 165px;
  vertical-align: middle;
  margin-bottom: 20px;
  text-align: center;
`;

export default EEL01C04A08P01;
