import { useEffect, useState } from 'react';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Image,
  IAudioPlayerProps,
  BoxWrap,
  Radio,
  Label,
  EStyleShadowedButtonTypes,
  EImageType,
  BottomSheet,
  Typography,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { getUserSubmission, pageId, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

export interface IApiInfo {
  pageId: string;
  userId: number;
  changeData: (page: string, mainKey: number, subKey: number, value: any) => void;
  initData: (page: string, userSubmission: userSubmissionType[] | undefined, defaultSubmission: userSubmissionType[], isSubmitted: boolean) => void;
  submitDataWithResult: (page: string, userSubmission: userSubmissionType[], isCorrect: boolean, duration?: number) => Promise<void>;
  saveData: (page: string, duration?: number) => Promise<void>;
  pageIds: pageId[];
}
export interface IImageList {
  src: string;
  alt: string;
  answer: boolean;
}

export interface IHE02701 {
  apiInfo: IApiInfo;
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
  questionText: string;
  imageList: IImageList[];
}

const HE02701 = ({ apiInfo, headerInfo, audioInfo, questionText, imageList }: IHE02701) => {
  const [answer, setAnswer] = useState<number>(0);
  const [isShow, setShow] = useState<boolean>(false);
  const [radio, setRadio] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    imageList.map((value, index) => {
      if (value.answer) {
        setAnswer(index + 1);
      }
    });
  }, []);

  const questionInfo: IQuestionProps = {
    text: questionText,
    size: 'medium',
    mark: getMarking(submitted, isCorrect ? isCorrect : false),
  };

  const handleRadio = (index: number) => {
    apiInfo.changeData(apiInfo.pageId, 1, 1, index);
    setRadio(index);
  };

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      if (radio !== null) {
        setSubmitted(true);
        const isCorrect = imageList[radio + 1].answer;

        setIsCorrect(isCorrect);

        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'NUMBER',
                value: radio,
              },
            ],
            isCorrect,
          },
        ];
        apiInfo.submitDataWithResult(apiInfo.pageId, userSubmission, isCorrect);
      }
    }
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: null,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = apiInfo.pageIds.find(page => page.page === apiInfo.pageId)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(apiInfo.userId, pageId);
      setSubmitted(isSubmitted);
      if (isSubmitted) {
        const isCorrect = imageList[userSubmissionList[0].inputData[0]?.value + 1].answer;
        setIsCorrect(isCorrect);
      }
      if (userSubmissionList.length > 0) {
        setRadio(userSubmissionList[0].inputData[0]?.value);
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

  return (
    <Container
      bodyId='targetContainer'
      questionInfo={questionInfo}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      submitDisabled={radio === null || radio === undefined}
      submitBtnColor={
        radio !== null && radio !== undefined ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        {imageList.map((item: IImageList, index: number) => (
          <Box key={'boxNumber' + index} width={100 / imageList.length + '%'}>
            <Radio
              name={'radio-question-A'}
              value={index - 1 === radio}
              onClick={() => {
                if (!submitted) {
                  handleRadio(index - 1);
                }
              }}
            >
              <ShadowedButton
                key={'button' + index}
                type='img'
                state={
                  index - 1 !== radio
                    ? EStyleShadowedButtonTypes.DEFAULT
                    : isCorrect === undefined
                    ? EStyleShadowedButtonTypes.PRIMARY
                    : isCorrect
                    ? EStyleShadowedButtonTypes.PRIMARY
                    : EStyleShadowedButtonTypes.WARNING
                }
              >
                <Label value={index + 1} />
                <Box marginTop='8px'>
                  <Image size='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
                </Box>
              </ShadowedButton>
            </Radio>
          </Box>
        ))}
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Typography>
          </Box>
          <Box>
            <Typography>{answer}번</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02701;
