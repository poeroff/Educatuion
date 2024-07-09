import { useEffect, useMemo, useRef } from 'react';
import { Container, ExampleBox } from '@maidt-cntn/ui/en';
import {
  Input,
  Recorder,
  TMainHeaderInfoTypes,
  Box,
  BoxWrap,
  Typography,
  Scroll,
  Label,
  EStyleButtonTypes,
  IRecorderRef,
  InputStatus,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L03C02A04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

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
      {
        subKey: 3,
        type: 'TEXT',
        value: '',
      },
      {
        subKey: 4,
        type: 'AUDIO',
        value: {},
      },
    ],
  },
];

const P02 = () => {
  const pageKey = 'p02';
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A04);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const isAllFilled = useMemo(
    () => cardData[pageKey].answers?.every(val => isNotEmptyString(val)) && Object.values(cardData[pageKey].audioData ?? {}).every(val => val),
    [cardData, pageKey],
  );
  const disabled = useMemo(() => !isAllFilled || cardData[pageKey].isSubmitted, [isAllFilled, cardData, pageKey]);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write and talk about a type of art you have recently enjoyed.',
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L03/C02/A04',
      changeData,
      mainKey: 1,
      page: pageKey,
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  const onSubmitAnswer = () => {
    if (!cardData[pageKey].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData:
            cardData[pageKey].answers?.map((ans, idx) => ({
              subKey: idx + 1,
              type: 'TEXT',
              value: ans,
            })) ?? [],
        },
      ];

      const p02Data = pageData.find(value => value.page === pageNo);

      if (p02Data) {
        userSubmission[0].inputData.push(p02Data.userSubmission[0].inputData[3]);
      }

      submitData(pageNo, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageKey].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answers: [
              userSubmissionList[0].inputData[0]?.value || (cardData[pageKey].answers?.[0] ?? ''),
              userSubmissionList[0].inputData[1]?.value || (cardData[pageKey].answers?.[1] ?? ''),
              userSubmissionList[0].inputData[2]?.value || (cardData[pageKey].answers?.[2] ?? ''),
            ],
            audioData: newAudioData,
            isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const truncatedValue = truncateToMaxBytes(e.target.value);

    const newAnswers = [...(cardData[pageKey].answers ?? ['', '', ''])];
    newAnswers[index] = truncatedValue;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answers: newAnswers } }));
    changeData(pageNo, 1, index + 1, truncatedValue);
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={onSubmitAnswer}
      submitDisabled={disabled}
      submitBtnColor={disabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Scroll tabIndex={0}>
        <Box flexDirection='column' hAlign='center' width='829px' paddingTop={20} paddingBottom={5}>
          <ExampleBox color={'pink'} title={'Art Activity and Its Impression'}>
            <Box vAlign='baseline' marginTop={15}>
              <Box>
                <Label value={'A'} type={'line'} />
              </Box>
              <Typography weight='var(--font-weight-semiBold)'>
                How was&nbsp;
                <Typography weight='var(--font-weight-extraBold)' useGap={false}>
                  the art exhibition
                </Typography>
                ?
              </Typography>
            </Box>
            <Box vAlign='baseline'>
              <Box>
                <Label value={'B'} type={'line'} />
              </Box>
              <Typography weight='var(--font-weight-semiBold)'>
                It was&nbsp;
                <Typography weight='var(--font-weight-extraBold)' useGap={false}>
                  fantastic
                </Typography>
                ! I was impressed by&nbsp;
                <Typography weight='var(--font-weight-extraBold)' useGap={false}>
                  the works of
                </Typography>
                <Typography weight='var(--font-weight-extraBold)' useGap={false}>
                  modern artists
                </Typography>
                .
              </Typography>
            </Box>
          </ExampleBox>
          <BoxWrap alignItems={'baseline'} paddingLeft={'14px'} marginTop='16px'>
            <Box vAlign='baseline' flex='auto'>
              <Box>
                <Label value={'A'} type={'line'} />
              </Box>
              <Box flex='1'>
                <Typography style={{ fontWeight: 'var(--font-weight-semiBold)' }}>How was</Typography>
                <Input
                  name='input1'
                  value={cardData[pageKey].answers?.[0] ?? ''}
                  onChange={e => handleInputChange(e, 0)}
                  placeholder='e.g. the musical'
                  maxLength={2000}
                  width='590px'
                  ariaLabel='A의 답 입력란'
                  readOnly={cardData[pageKey].isSubmitted}
                  status={isNotEmptyString(cardData[pageKey].answers?.[0] ?? '') ? InputStatus.ENABLE : InputStatus.DEFAULT}
                />
                <Typography style={{ fontWeight: 'var(--font-weight-semiBold)' }}>?</Typography>
              </Box>
            </Box>
          </BoxWrap>
          <BoxWrap alignItems={'baseline'} paddingLeft={'14px'} marginTop='16px'>
            <Box vAlign='baseline' flex='auto'>
              <Box>
                <Label value={'B'} type={'line'} />
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'var(--font-weight-semiBold)' }}>It was</Typography>
                <Input
                  name='input2'
                  value={cardData[pageKey].answers?.[1] ?? ''}
                  onChange={e => handleInputChange(e, 1)}
                  placeholder='e.g. amazing'
                  maxLength={2000}
                  width='370px'
                  ariaLabel='B의 1번째 답 입력란'
                  readOnly={cardData[pageKey].isSubmitted}
                  status={isNotEmptyString(cardData[pageKey].answers?.[1] ?? '') ? InputStatus.ENABLE : InputStatus.DEFAULT}
                />
                <Typography style={{ fontWeight: 'var(--font-weight-semiBold)' }}>! I was impressed by&nbsp;</Typography>
                <Box marginTop='8px'>
                  <Input
                    name='input3'
                    value={cardData[pageKey].answers?.[2] ?? ''}
                    onChange={e => handleInputChange(e, 2)}
                    placeholder='e.g. the creative set design'
                    maxLength={2000}
                    width='740px'
                    ariaLabel='B의 2번째 답 입력란'
                    readOnly={cardData[pageKey].isSubmitted}
                    status={isNotEmptyString(cardData[pageKey].answers?.[2] ?? '') ? InputStatus.ENABLE : InputStatus.DEFAULT}
                  />
                  <Typography style={{ fontWeight: 'var(--font-weight-semiBold)' }}>.</Typography>
                </Box>
              </Box>
            </Box>
          </BoxWrap>
        </Box>
        <BoxWrap justifyContent='center' marginTop='20px'>
          {/* TODO : Recorder 녹음 후처리 */}
          <Recorder
            recorderIndex={1}
            initialData={cardData[pageKey].audioData?.[4]}
            readOnly={cardData[pageKey].isSubmitted}
            onSubmit={() => {
              onSubmitRecorder(4);
            }}
            ref={recorderRef}
          />
        </BoxWrap>
      </Scroll>
    </Container>
  );
};

export default P02;
