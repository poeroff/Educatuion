import { IRecordRefSubmitFunctionProps, IUploadRecordData, TMainHeaderInfoTypes, Typography, makeAudioData } from '@maidt-cntn/ui';

import ME11702, { IListenAndAnswer } from '@maidt-cntn/pages/ME-117-02';

import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C02A07 } from './store';

const P01 = () => {
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L05C02A07);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const pageNo = 'P01';
  const audioSrc = '/L05/C02/A07/ME1-L05-C02-A07-P01.mp3';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'sounds',
  };

  const questionInfo = {
    text: '강조된 부분에 유의하여 듣고, 따라 말해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      label: '1',
      labelColor: 'var(--color-blue-100)',
      originText: (
        <>
          <Typography lineHeight='42px'>
            Do you have any special plan
            <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)' lineHeight='42px'>
              s
            </Typography>
            ?
          </Typography>
        </>
      ),
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: subjectCode,
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            audioData: newAudioData,
            isAudioPlayed: [userSubmissionList[0].inputData[0].value || cardData.p01.isAudioPlayed?.[0] || false],
            isRecordDone: isSubmitted ? Array<boolean>(1).fill(true) : prev.p01.isRecordDone,
          },
        }));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];
    if (pageData.find(value => value.page === pageNo)) {
      userSubmission[0].inputData = pageData.find(value => value.page === pageNo)!.userSubmission[0].inputData;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    submitData(pageNo, userSubmission);
  };

  const recorderProcessInfo: IRecordRefSubmitFunctionProps[] = [
    {
      cardPath: 'L05/C02/A07',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: subjectCode,
      subKey: 1,
      userId,
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  return (
    <ME11702
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioData={cardData.p01.audioData}
      recorderProcessInfo={recorderProcessInfo}
      textData={data}
      onSubmit={onSubmitAnswer}
      isSubmitted={cardData.p01.isSubmitted}
      audioSrc={audioSrc}
    />
  );
};

export default P01;
