import { IQuestionProps } from '@/components/atoms/Question/Question';
import { IAudioPlayerProps } from '@/components/molecules/AudioPlayer/AudioPlayer';
import { TMainHeaderInfoTypes } from '@/type/Layout';
import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, EStyleFontSizes, ETagLine, Label, List, Radio, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useEffect, useState } from 'react';

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

export interface IHE00401 {
  apiInfo?: IApiInfo;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  data: IHE00401Data[];
  answer: number;
  explanation?: React.ReactNode;
  script?: React.ReactNode;
  translation?: React.ReactNode;
  changeMark: (selectedIdx: number | null) => void;
}

export interface IHE00401Data {
  text: string;
  textTypo?: React.ReactNode;
}

export interface IApiInfo {
  pageId: string;
  userId: number;
  changeData: (page: string, mainKey: number, subKey: number, value: any) => void;
  initData: (page: string, userSubmission: userSubmissionType[] | undefined, defaultSubmission: userSubmissionType[], isSubmitted: boolean) => void;
  submitDataWithResult: (page: string, userSubmission: userSubmissionType[], isCorrect: boolean, duration?: number) => Promise<void>;
  saveData: (page: string, duration?: number) => Promise<void>;
  pageIds: pageId[];
}

const HE00401 = ({ apiInfo, headerInfo, questionInfo, audioInfo, data, answer, explanation, script, translation, changeMark }: IHE00401) => {
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
      const isCorrect = selectedIdx === answer - 1;
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={selectedIdx == null}
      onSubmit={handleSubmitClick}
      bodyId='targetContainer'
    >
      <Box vAlign='center' useFull>
        <List<IHE00401Data> gap={24} data={data} key={'list' + selectedIdx}>
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
              isError={isSubmitted && selectedIdx !== answer - 1}
            >
              <Box vAlign='center'>
                <Label value={index} marginRight={8} />
                {value?.textTypo ? value?.textTypo : value?.text}
              </Box>
            </Radio>
          )}
        </List>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {answer}
          </AnswerTagBox>
          {explanation && <AnswerTagBox label='해설'>{explanation}</AnswerTagBox>}
          {script && <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>}
          {translation && <AnswerTagBox label='해석'>{translation}</AnswerTagBox>}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE00401;
