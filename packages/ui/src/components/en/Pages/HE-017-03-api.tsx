import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useEffect, useState } from 'react';
type TSubmitType = 'marking' | 'complete';

type TAnswerLabelType = '모범답안' | '예시답안';

export interface IApiInfo {
  pageId: string;
  userId: number;
  changeData: (page: string, mainKey: number, subKey: number, value: any) => void;
  initData: (page: string, userSubmission: userSubmissionType[] | undefined, defaultSubmission: userSubmissionType[], isSubmitted: boolean) => void;
  submitData: (page: string, userSubmission: userSubmissionType[], duration?: number) => Promise<void>;
  saveData: (page: string, duration?: number) => Promise<void>;
  pageIds: pageId[];
}

interface IHE01703 {
  apiInfo?: IApiInfo;
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  submitType?: TSubmitType;
  content: string;
  initText?: string;
  answer: { [key: string]: string };
  answerLabel?: TAnswerLabelType;
}

const HE01703 = ({ apiInfo, headerInfo, questionInfo, content, initText, answer, submitType = 'complete', answerLabel = '모범답안' }: IHE01703) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isPassageShow, setPassageShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handlePassageButtonClick = () => {
    setPassageShow(prevState => !prevState);
  };
  const handleSubmit = () => {
    if (submitted) {
      setIsShow(prevState => !prevState);
    } else {
      setSubmitted(true);

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
      apiInfo?.submitData(apiInfo.pageId, userSubmission);
    }
  };

  //
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = apiInfo?.pageIds.find(page => page.page === apiInfo.pageId)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(apiInfo.userId, pageId);
      setSubmitted(isSubmitted);
      if (userSubmissionList.length > 0) {
        setValue(userSubmissionList[0].inputData[0]?.value || initText);
      }
      apiInfo.initData(apiInfo.pageId, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    apiInfo?.changeData(apiInfo.pageId, 1, 1, e.target.value);
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

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={
        submitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : value ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!isNotEmptyString(value)}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            name={'value1'}
            width='100%'
            height='100%'
            readOnly={submitted}
            placeholder='내용을 넣어 주세요.'
            ariaLabel={'질문에 대한 답을 입력'}
            value={value}
            onChange={handleChangeInput}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isPassageShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handlePassageButtonClick}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false} usePre>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handlePassageButtonClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : answerLabel} />
          </Box>
          <Box marginTop='12px'>
            {Object.keys(answer)
              .map(key => answer[key])
              .join(', ')}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE01703;
