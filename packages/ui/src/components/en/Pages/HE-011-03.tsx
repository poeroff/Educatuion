import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, IQuestionProps, EStyleButtonTypes, BottomSheet, Tag, ETagLine, IAudioPlayerProps } from '@maidt-cntn/ui';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';

export interface IApiInfo {
  userId: number;
  pageId: string;
  submitDataWithResult: any;
  initData: any;
  saveData: any;
  changeData: any;
  pageIds: pageId[];
}

export interface IHE01103 {
  apiInfo: IApiInfo;
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
  questionText: string;
  value: string[];
  answer: string[];
  contentsArea: React.ReactNode;
  answerText?: string;
  setValue: (value: string[]) => void;
  setIsCorrect?: Dispatch<SetStateAction<boolean[]>>;
  onSubmit?: (state: boolean[]) => void;
}

const HE01103 = ({
  apiInfo,
  headerInfo,
  audioInfo,
  questionText,
  value,
  answer,
  contentsArea,
  answerText,
  setValue,
  setIsCorrect,
  onSubmit,
}: IHE01103) => {
  const [isShow, setShow] = useState(false);
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    text: questionText,
    size: 'medium',
    mark: mark,
  };

  const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
    const isCorrect: boolean[] = [];
    // 배열의 길이가 다르면 false 반환
    if (value.length !== answer.length) {
      return false;
    }

    // 배열의 모든 요소가 동일한지 확인 (공백 제거 및 대소문자 무시)
    value.forEach((val, idx) => {
      isCorrect[idx] = isAnswer(val, answer[idx]);
    });

    setIsCorrect && setIsCorrect(isCorrect);
    return isCorrect.every(val => val);
  };

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else if (value.every(isNotEmptyString)) {
      const isCorrect = areArraysEqualIgnoringCaseAndWhitespace(value, answer);
      if (isCorrect) {
        setMark('correct');
      } else {
        setMark('incorrect');
      }
      const result = value.map((val, index) => !isAnswer(val, answer[index]));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: value,
            },
          ],
          isCorrect,
        },
      ];
      apiInfo.submitDataWithResult(apiInfo.pageId, userSubmission, isCorrect);

      onSubmit && onSubmit(result);
    }
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: value,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = apiInfo.pageIds.find(page => page.page === apiInfo.pageId)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(apiInfo.userId, pageId);

      setSubmitted(isSubmitted);

      if (userSubmissionList.length > 0) {
        if (isSubmitted) {
          const isCorrect = areArraysEqualIgnoringCaseAndWhitespace(userSubmissionList[0].inputData[0]?.value, answer);
          if (isCorrect) {
            setMark('correct');
          } else {
            setMark('incorrect');
          }
        }

        setValue(userSubmissionList[0].inputData[0]?.value || value);
      }

      apiInfo.initData(apiInfo.pageId, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    apiInfo.changeData(apiInfo.pageId, 1, 1, value);
  }, [value]);

  useEffect(() => {
    return () => {
      apiInfo.saveData(apiInfo.pageId);
    };
  }, []);

  useEffect(() => {
    if (apiInfo.pageIds.length > 0) {
      init();
    }
  }, [apiInfo.pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!value.every(isNotEmptyString)}
      submitBtnColor={value.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        setSubmitted(true);
        handleSubmit();
      }}
    >
      {contentsArea}
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          {answerText ? answerText.split('<br/>').map(value => <Box marginTop='12px'>{value}</Box>) : <Box marginTop='12px'>{answer.join(', ')}</Box>}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE01103;
