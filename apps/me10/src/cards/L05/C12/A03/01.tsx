import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C12A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const pageKey = 'p01';
  const pageNo = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C12A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsshow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Box>
        <Typography useGap={false} fontSize={'var(--font-size-32)'} weight={'var(--font-weight-extraBold)'}>
          6.
        </Typography>
        <Typography fontSize={'var(--font-size-32)'}>잘 듣고, 빈칸에 알맞은 말을 써 봅시다.</Typography>
      </Box>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C12/A03/ME1-L05-C12-A03-P01.mp3',
    captionSrc: '/L05/C12/A03/ME1-L05-C12-A03-P01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsshow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={
        cardData[pageKey].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : !isNotEmptyString(cardData[pageKey].answer)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData[pageKey].answer)}
      onSubmit={handleSubmit}
    >
      <Box background={'white'} hAlign='center' useRound>
        <Typography>Jimin is going to go</Typography>
        <Input
          name='value'
          ariaLabel={'답란'}
          value={cardData[pageKey].answer}
          width='150px'
          status={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect ? InputStatus.ERROR : ''}
          maxLength={10}
          readOnly={cardData[pageKey].isSubmitted}
          onChange={e => handleInputChange(e.target.value)}
        />
        <Typography>this weekend.</Typography>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height={'40%'} show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData[pageKey].solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
