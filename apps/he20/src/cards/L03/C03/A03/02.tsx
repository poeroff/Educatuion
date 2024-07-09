import {
  TMainHeaderInfoTypes,
  Input,
  Recorder,
  Box,
  Typography,
  Label,
  IRecorderRef,
  EStyleButtonTypes,
  EStyleFontSizes,
  IUploadRecordData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { ExampleBox, Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C03A03 } from './store';

const defaultSubmission: userSubmissionType[] = [
  {
    mainKey: 1,
    inputData: [
      {
        subKey: 1,
        type: 'AUDIO',
        value: {},
      },
      {
        subKey: 2,
        type: 'TEXT',
        value: '',
      },
    ],
  },
];

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A03);

  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const pageNo = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn (Step 2)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Write and talk about what you should not do in public places.',
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L03/C03/A03',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData('P02', 1, 2, e.target.value);
  };

  const onSubmitText = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
        },
      ];

      if (pageData.find(value => value.page === 'P02')) {
        userSubmission[0].inputData = pageData.find(value => value.page === 'P02')!.userSubmission[0].inputData;
      }

      submitData('P02', userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const exampleInfo = {
    title: (
      <Typography useGap={false} size={EStyleFontSizes['X-SMALL']}>
        <Typography useGap={false} fontStyle={'italic'} size={EStyleFontSizes['X-SMALL']}>
          Don’ts
        </Typography>{' '}
        in Public Places
      </Typography>
    ),
    questionInfo: (
      <>
        <Box display='flex' gap='12px' paddingTop='12px'>
          <Label background='' type='line' value='A' />
          <Typography useGap={false} usePre>
            Are there any rules to follow in{' '}
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              the theater
            </Typography>
            ?
          </Typography>
        </Box>
        <Box alignItems='start' display='flex' gap='12px'>
          <Label background='' type='line' value='B' />
          <Typography useGap={false} usePre>
            Yes, you’re not allowed to{' '}
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              kick the seat in front of you
            </Typography>
            .
          </Typography>
        </Box>
      </>
    ),
  };

  const boxInfo = (
    <>
      <Box vAlign={'center'} marginTop='12px'>
        <Label background='' type='line' value='A' />
        <Typography>
          Are there any rules to follow in{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            the theater
          </Typography>
          ?
        </Typography>
      </Box>
      <Box vAlign={'center'} marginTop='12px'>
        <Label background='' type='line' value='B' />
        <Typography> Yes, you’re not allowed to</Typography>
        <Input
          width={'300px'}
          maxLength={20}
          placeholder='e.g. make loud noise'
          value={cardData.p02.answer}
          onChange={handleInputChange}
          ariaLabel='답 입력란'
          readOnly={cardData.p02.isSubmitted}
        />
        <Typography useGap={false}>.</Typography>
      </Box>
    </>
  );

  const checkDisableInput = () => {
    return !isNotEmptyString(cardData.p02.answer || '') || Object.values(cardData.p02.audioData!).every(value => !value);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        onSubmitText();
      }}
      submitDisabled={cardData.p02.isSubmitted || checkDisableInput()}
      submitBtnColor={cardData.p02.isSubmitted || checkDisableInput() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <ExampleBox color={'emerald'} title={exampleInfo.title}>
        {exampleInfo.questionInfo}
      </ExampleBox>
      <Box display='flex' flexDirection='column' margin={'20px'} position='relative'>
        {boxInfo}
      </Box>
      <Box display='flex' justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          recorderIndex={1}
          initialData={cardData.p02.audioData?.[1]}
          readOnly={cardData.p02.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder(1);
          }}
          ref={recorderRef}
        />
      </Box>
    </Container>
  );
};

export default P02;
