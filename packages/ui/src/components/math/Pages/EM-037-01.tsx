import { ChangeEvent, useEffect, useState } from 'react';
import {
  Image,
  Box,
  Label,
  Typography,
  Input,
  IQuestionProps,
  IMainTitleHeaderProps,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { checkExpression, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';

export interface IImageInfo {
  src: string;
  alt: string;
  width?: string;
  height?: string;
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

export interface IBottomSheetInfo {
  correctAnswer: string;
  explanation?: string;
  hint?: string;
}

export interface IEM03701 {
  apiInfo?: IApiInfo;
  bottomSheetInfo: IBottomSheetInfo;
  headerInfo: IMainTitleHeaderProps | null;
  questionInfo: IQuestionProps;
  setMark?: any;
  imageInfo: IImageInfo;
  expression: string;
}
/**
 * 좌변 항 두 개까지 덧셈 곱셈 교환법칙 가능
 */
const EM03701 = ({ apiInfo, bottomSheetInfo, headerInfo, questionInfo, setMark, imageInfo, expression }: IEM03701) => {
  expression = expression.replace(' ', '');
  const numbers: string[] = expression.match(/\d+/g) || [];
  const operators: string[] = expression.match(/[+=-x÷]/g) || [];
  const [inputValues, setInputValues] = useState<string[]>(new Array(numbers.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: inputValues.map((value, index) => {
        return { subKey: index + 1, type: 'TEXT', value: '' };
      }),
    },
  ];

  const init = async () => {
    const pageId = apiInfo?.pageIds.find(page => page.page === apiInfo.pageId)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(apiInfo?.userId as number, pageId);
      setIsSubmitted(isSubmitted);
      if (isSubmitted && setMark) {
        let answerExpression = '';
        const inputData = userSubmissionList[0] && userSubmissionList[0].inputData;
        for (let i = 0; i < inputData.length; i++) {
          answerExpression += inputData[i].value;
          if (operators[i]) {
            answerExpression += operators[i];
          }
        }
        setMark(userSubmissionList[0].isCorrect ? 'correct' : 'incorrect');
      }
      if (userSubmissionList.length > 0) {
        userSubmissionList[0].inputData.map((value: any, index: number) => {
          setInputValues(prev => {
            const newInputValues = [...prev];
            newInputValues[index] = value.value;
            return newInputValues;
          });
        });
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
    if (apiInfo?.pageIds.length && apiInfo?.pageIds.length > 0) {
      init();
    }
  }, [apiInfo?.pageIds]);

  const handleSubmitClick = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
      let answerExpression = '';
      for (let i = 0; i < inputValues.length; i++) {
        answerExpression += inputValues[i];
        if (operators[i]) {
          answerExpression += operators[i];
        }
      }
      const isCorrect = checkExpression(answerExpression, expression);

      if (setMark) {
        setMark(isCorrect ? 'correct' : 'incorrect');
      }
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: inputValues.map((value, index) => {
            return { subKey: index + 1, type: 'TEXT', value: value };
          }),
          isCorrect,
        },
      ];
      apiInfo?.submitDataWithResult(apiInfo.pageId, userSubmission, isCorrect);
    } else {
      setIsShow(!isShow);
    }
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setInputValues(prev => {
      const newInputValues = [...prev];
      newInputValues[index] = value;
      return newInputValues;
    });
    apiInfo?.changeData(apiInfo.pageId, 1, index + 1, value);
  };

  const checkStatus = (index: number) => {
    if (isSubmitted) {
      if (operators[index - 1] && (operators[index - 1] === '+' || operators[index - 1] === 'x')) {
        if (
          !checkExpression(
            inputValues[index - 1] + operators[index - 1] + inputValues[index],
            numbers[index - 1] + operators[index - 1] + numbers[index],
          )
        ) {
          return InputStatus.ERROR;
        }
      }
      if (operators[index] && (operators[index] === '+' || operators[index] === 'x')) {
        if (
          !checkExpression(inputValues[index] + operators[index] + inputValues[index + 1], numbers[index] + operators[index] + numbers[index + 1])
        ) {
          return InputStatus.ERROR;
        }
      }
      if (
        !(operators[index - 1] && (operators[index - 1] === '+' || operators[index - 1] === 'x')) &&
        !(operators[index] && (operators[index] === '+' || operators[index] === 'x'))
      ) {
        if (numbers[index] !== inputValues[index]) {
          return InputStatus.ERROR;
        }
      }
      return InputStatus.ENABLE;
    } else {
      if (isNotEmptyString(inputValues[index])) {
        return InputStatus.ENABLE;
      } else {
        return InputStatus.DEFAULT;
      }
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitBtnColor={
        isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : inputValues.some(value => !isNotEmptyString(value))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.YELLOW
      }
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={inputValues.some(value => !isNotEmptyString(value))}
      onSubmit={handleSubmitClick}
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='20px 44px' type='line' useRound>
          <Image src={imageInfo.src} alt={imageInfo.alt} width={imageInfo.width || '590px'} height={imageInfo.height || '215px'} />
        </Box>
        <Box marginTop='24px'>
          {inputValues.map((value, index) => (
            <Typography key={'input' + index} useGap={false}>
              <Input
                type={'number'}
                value={inputValues[index]}
                onChange={e => {
                  handleInputChangeEvent(e, index);
                }}
                ariaLabel={index + 1 + '번 답란'}
                readOnly={isSubmitted}
                status={checkStatus(index)}
              />
              {operators && operators[index] && <Typography>{operators[index]}</Typography>}
            </Typography>
          ))}
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{bottomSheetInfo.correctAnswer}</Typography>
            </Box>
          </Box>
          {bottomSheetInfo.explanation && (
            <Box position='relative' marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />
              <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
                <Typography>{bottomSheetInfo.explanation}</Typography>
              </Box>
            </Box>
          )}
          {bottomSheetInfo.hint && (
            <Box position='relative' marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='힌트' />
              <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
                <Typography>{bottomSheetInfo.hint}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM03701;
