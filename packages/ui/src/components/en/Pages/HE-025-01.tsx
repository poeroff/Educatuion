import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Typography,
  List,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  EImageType,
  Image,
  IAudioPlayerProps,
} from '@maidt-cntn/ui';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';

export interface IApiInfo {
  pageId: string;
  userId: number;
  changeData: (page: string, mainKey: number, subKey: number, value: any) => void;
  initData: (page: string, userSubmission: userSubmissionType[] | undefined, defaultSubmission: userSubmissionType[], isSubmitted: boolean) => void;
  submitDataWithResult: (page: string, userSubmission: userSubmissionType[], isCorrect: boolean, duration?: number) => Promise<void>;
  saveData: (page: string, duration?: number) => Promise<void>;
  pageIds: pageId[];
}

export interface IHE02501 {
  apiInfo: IApiInfo;
  setValue: (value: string[]) => void;
  headerInfo: TMainHeaderInfoTypes;
  audioInfo?: IAudioPlayerProps;
  questionText: string;
  wordArr: string[];
  boxNode: React.ReactNode;
  imageInfo: IImageView;
  textViewHeight?: string;
  value: string[];
  answer: string[];
  answerText?: string; //개행 : <br/>
  imageWidth?: string;
  onSubmit?: (state: boolean[]) => void;
  showBoxNode?: boolean;
  showSubmitButton?: boolean;
}

export interface IImageView {
  src: string;
  alt: string;
}
export interface ITextView {
  title: string;
  text: string;
  color: string;
  height?: string;
}

const HE02501 = ({
  apiInfo,
  setValue,
  headerInfo,
  audioInfo,
  questionText,
  wordArr,
  boxNode,
  imageInfo,
  value,
  answer,
  answerText,
  onSubmit,
  imageWidth,
  textViewHeight,
  showBoxNode = true,
  showSubmitButton = true,
}: IHE02501) => {
  const [isShow, setShow] = useState(false);
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const [submitted, setSubmitted] = useState<boolean>(false);

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
        setValue(userSubmissionList[0].inputData[0]?.value);
        const isCorrect = areArraysEqualIgnoringCaseAndWhitespace(userSubmissionList[0].inputData[0]?.value, answer);
        if (isSubmitted) {
          if (isCorrect) {
            setMark('correct');
          } else {
            setMark('incorrect');
          }
          const result = userSubmissionList[0].inputData[0]?.value.map((val: string, index: number) => !isAnswer(val, answer[index]));

          onSubmit && onSubmit(result);
        }
      }
      apiInfo.initData(apiInfo.pageId, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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

  const questionInfo: IQuestionProps = {
    text: questionText,
    size: 'medium',
    markSize: 'middle',
    mark: mark,
  };

  const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
    // 배열의 길이가 다르면 false 반환
    if (value.length !== answer.length) {
      return false;
    }

    // 배열의 모든 요소가 동일한지 확인 (공백 제거 및 대소문자 무시)
    return value.every((val, index) => isAnswer(val, answer[index]));
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

      const result = value.map((val, index) => !isAnswer(val, answer[index]));

      onSubmit && onSubmit(result);
    }
  };

  const handleClick = () => {
    if (showSubmitButton) {
      setSubmitted(true);
      handleSubmit();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      audioInfo={audioInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!value.every(isNotEmptyString)}
      submitBtnColor={value.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={showSubmitButton ? () => handleClick() : undefined}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box width={imageWidth} vAlign='center'>
          <Image src={imageInfo.src} alt={imageInfo.alt} type={EImageType.IMG} />
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' gap='12px' useFull>
          {boxNode}
        </Box>
      </BoxWrap>
      {showBoxNode && (
        <Box marginTop='12px'>
          <TextView title='보기' height={textViewHeight || '100%'}>
            <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
          </TextView>
        </Box>
      )}

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          {answerText ? (
            answerText.split('<br/>').map((value, index) => (
              <Box key={'bx' + index} marginTop='12px'>
                {value}
              </Box>
            ))
          ) : (
            <Box marginTop='12px'>answer.join(', ')</Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02501;
