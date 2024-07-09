import { TMainHeaderInfoTypes } from '@/type/Layout';
import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';

import {
  Box,
  IQuestionProps,
  List,
  EStyleButtonTypes,
  Scroll,
  Radio,
  Label,
  BottomSheet,
  Tag,
  Typography,
  ETagLine,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React from 'react';
import { useEffect, useState } from 'react';

const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
  <>
    <Box marginTop={marginTop}>
      <Tag type={ETagLine.GREEN} label={label} />
    </Box>
    <Box marginTop='10px'>
      <Typography size={EStyleFontSizes.MEDIUM} usePre>
        {children}
      </Typography>
    </Box>
  </>
));

export interface IApiInfo {
  pageId: string;
  userId: number;
  changeData: (page: string, mainKey: number, subKey: number, value: any) => void;
  initData: (page: string, userSubmission: userSubmissionType[] | undefined, defaultSubmission: userSubmissionType[], isSubmitted: boolean) => void;
  submitDataWithResult: (page: string, userSubmission: userSubmissionType[], isCorrect: boolean, duration?: number) => Promise<void>;
  saveData: (page: string, duration?: number) => Promise<void>;
  pageIds: pageId[];
}

export interface IHE03101 {
  apiInfo: IApiInfo;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  boxContent: string;
  data: IHE1301Data[];
  answerInfo: IAnswerInfo;
  changeMark: (selectedIdx: number | null) => void;
}

export interface IHE1301Data {
  text: string;
}

export interface IAnswerInfo {
  answer: number;
  explanation: React.ReactNode;
  translation: React.ReactNode;
}

const HE01301API = ({ apiInfo, headerInfo, questionInfo, boxContent, data, answerInfo, changeMark }: IHE03101) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: undefined,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = apiInfo?.pageIds.find(page => page.page === apiInfo.pageId)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(apiInfo?.userId as number, pageId);
      setIsSubmitted(isSubmitted);
      if (isSubmitted) {
        changeMark(userSubmissionList[0].inputData[0]?.value);
      }
      if (userSubmissionList.length > 0) {
        setSelectedIdx(userSubmissionList[0].inputData[0]?.value);
      }
      apiInfo?.initData(apiInfo.pageId, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      apiInfo?.saveData(apiInfo.pageId);
    };
  }, []);

  useEffect(() => {
    apiInfo?.changeData(apiInfo.pageId, 1, 1, selectedIdx);
  }, [selectedIdx]);

  useEffect(() => {
    if (apiInfo?.pageIds.length && apiInfo?.pageIds.length > 0) {
      init();
    }
  }, [apiInfo?.pageIds]);

  const handleRowClick = (index: number) => {
    if (!isSubmitted) setSelectedIdx(index);
  };

  const handleSubmitClick = () => {
    if (!isSubmitted) {
      const isCorrect = selectedIdx === answerInfo.answer - 1;
      changeMark(selectedIdx);
      setIsSubmitted(true);
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: selectedIdx,
            },
          ],
          isCorrect,
        },
      ];
      apiInfo?.submitDataWithResult(apiInfo.pageId, userSubmission, isCorrect);
    } else {
      setShow(!isShow);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={selectedIdx == null}
      submitBtnColor={selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmitClick}
    >
      <Box useFull hAlign='center' padding='20px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound>
            {boxContent}
          </Box>
          <Scroll height='70%' width='910px' tabIndex={0}>
            <List<IHE1301Data> gap={4} data={data} key={'list' + selectedIdx}>
              {({ value, index = 1 }) => (
                <Radio
                  key={index}
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={selectedIdx === index - 1}
                  onClick={() => handleRowClick(index - 1)}
                  readOnly={isSubmitted}
                  isError={isSubmitted && selectedIdx !== answerInfo.answer - 1}
                >
                  <Box vAlign='center'>
                    <Label value={index} marginRight={8} />
                    {value?.text}
                  </Box>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {answerInfo.answer}
          </AnswerTagBox>
          {answerInfo.explanation && <AnswerTagBox label='해설'>{answerInfo.explanation}</AnswerTagBox>}
          {answerInfo.translation && <AnswerTagBox label='해석'>{answerInfo.translation}</AnswerTagBox>}
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default HE01301API;
