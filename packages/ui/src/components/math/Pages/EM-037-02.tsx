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
  correctAnswer: string;
  unit?: string;
}

const EM03702 = ({ apiInfo, bottomSheetInfo, headerInfo, questionInfo, setMark, imageInfo, expression, correctAnswer, unit }: IEM03701) => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

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

  const init = async () => {
    const pageId = apiInfo?.pageIds.find(page => page.page === apiInfo.pageId)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(apiInfo?.userId as number, pageId);
      setIsSubmitted(isSubmitted);
      if (isSubmitted && setMark) {
        setMark(userSubmissionList[0].isCorrect ? 'correct' : 'incorrect');
      }
      if (userSubmissionList.length > 0) {
        setValue1(userSubmissionList[0].inputData[0].value || '');
        setValue2(userSubmissionList[0].inputData[1].value || '');
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

      const isCorrect = checkExpression(value1, expression) && value2 === correctAnswer;

      if (setMark) {
        setMark(isCorrect ? 'correct' : 'incorrect');
      }
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            { subKey: 1, type: 'TEXT', value: value1 },
            { subKey: 2, type: 'TEXT', value: value2 },
          ],
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
    if (index === 0) {
      setValue1(value);
    } else if (index === 1) {
      setValue2(value);
    }
    apiInfo?.changeData(apiInfo.pageId, 1, index + 1, value);
  };

  const checkStatus = (index: number) => {
    if (isSubmitted) {
      if (index === 0 && checkExpression(value1, expression)) {
        return InputStatus.ENABLE;
      } else if (index === 1 && value2 === correctAnswer) {
        return InputStatus.ENABLE;
      } else {
        return InputStatus.ERROR;
      }
    } else {
      if (index === 0 && value1) {
        return InputStatus.ENABLE;
      } else if (index === 1 && value2) {
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
          : value1 && value2
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(value1 && value2)}
      onSubmit={handleSubmitClick}
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='20px 44px' type='line' useRound>
          <Image src={imageInfo.src} alt={imageInfo.alt} width={imageInfo.width || '590px'} height={imageInfo.height || '215px'} />
        </Box>
        <Box marginTop='24px'>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='296px'
              marginLeft={20}
              value={value1}
              onChange={e => {
                handleInputChangeEvent(e, 0);
              }}
              ariaLabel={'식을 입력해주세요.'}
              readOnly={isSubmitted}
              status={checkStatus(0)}
            />
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='148px'
              marginLeft={20}
              value={value2}
              onChange={e => {
                handleInputChangeEvent(e, 1);
              }}
              ariaLabel={'답란'}
              readOnly={isSubmitted}
              status={checkStatus(1)}
            />
            <Typography>{unit}</Typography>
          </Box>
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

export default EM03702;
