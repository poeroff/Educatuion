import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { Box, TMainHeaderInfoTypes, Textarea, EStyleButtonTypes, IRecorderRef, Recorder, IUploadRecordData, makeAudioData } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C05A02, getUserSubmissionStore } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P02';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const recorderRef = useRef<IRecorderRef>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };
  const questionInfo = {
    text: 'Write and talk about what the story is about.',
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const defaultSubmission = getUserSubmissionStore('');

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(PAGE, 1, 1, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p02.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
        });
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            audioData: newAudioData,
            isSubmitted,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission = getUserSubmissionStore(cardData.p02.answer || '');
    if (pageData.find(value => value.page === PAGE)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE)!.userSubmission[0].inputData[1]);
    }
    submitData(PAGE, userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L02/C05/A02',
      changeData,
      mainKey: 1,
      page: 'p02',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (!isNotEmptyString(cardData.p02.answer ?? '') || Object.keys(cardData.p02.audioData ?? {}).length === 0 || cardData.p02.isSubmitted) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p02]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={'완료하기'}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitDisabled={isButtonDisabled}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box height='220px' marginTop='10px' useFull>
        <Textarea
          value={cardData.p02.answer}
          onChange={handleChangeValue}
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          readOnly={cardData.p02.isSubmitted}
          ariaLabel={`텍스트 입력란`}
        />
      </Box>

      <Box hAlign='center' marginTop='50px'>
        <Recorder
          recorderIndex={1}
          initialData={cardData.p02.audioData?.[2]}
          onSubmit={() => {
            onSubmitRecorder(2);
          }}
          readOnly={cardData.p02.isSubmitted}
          ref={recorderRef}
        />
      </Box>
    </Container>
  );
};

export default P02;
