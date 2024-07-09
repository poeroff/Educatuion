import { useEffect, useState } from 'react';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  Label,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType, pageId } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

export interface IHE00301 {
  apiInfo: IApiInfo;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  question: string;
  answer?: string;
  egAnswer?: React.ReactNode;
  value: string;
  setValue: (value: string) => void;
  onSubmit?: (state: boolean[]) => void;
  cardId?: string;
  userId?: number;
}

export interface IApiInfo {
  userId: number;
  pageId: string;
  submitData: any;
  initData: any;
  saveData: any;
  changeData: any;
  pageIds: pageId[];
}

const HE00301 = ({ apiInfo, headerInfo, questionInfo, question, answer, egAnswer, value, setValue }: IHE00301) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);

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
        setValue(userSubmissionList[0].inputData[0]?.value || value);
      }
      apiInfo.initData(apiInfo.pageId, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (submitted) {
      setShow(!isShow);
    } else {
      if (isNotEmptyString(value)) {
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
          },
        ];
        apiInfo.submitData(apiInfo.pageId, userSubmission);
        setSubmitted(true);
      }
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
      questionInfo={questionInfo}
      submitLabel={answer ? (submitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기') : '완료하기'}
      submitBtnColor={
        answer
          ? isNotEmptyString(value)
            ? isShow
              ? EStyleButtonTypes.GRAY
              : EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
          : submitted
          ? EStyleButtonTypes.SECONDARY
          : isNotEmptyString(value)
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={answer ? !isNotEmptyString(value) : submitted ? true : !isNotEmptyString(value) ? true : false}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box flexDirection='column' vAlign='center' hAlign='center' useFull>
          <Box vAlign='center'>
            <Typography useGap={false} usePre>
              {question}
            </Typography>
          </Box>
          {egAnswer && (
            <BoxWrap flexDirection='row' marginTop={'30px'}>
              <Box marginRight={'10px'}>
                <Label type={'text'} value={'e.g.'} size={'small'} color='var(--color-blue-700)' />
              </Box>
              {egAnswer}
            </BoxWrap>
          )}
        </Box>
        <Box useFull>
          <Textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            readOnly={submitted ? true : false}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답안'
          />
        </Box>
      </BoxWrap>{' '}
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
          {answer && (
            <Box>
              <Tag type={ETagLine.GREEN} label='예시답안' />
              <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
                <Typography>{answer}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE00301;
