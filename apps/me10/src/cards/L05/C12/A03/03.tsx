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

const P03 = () => {
  const pageKey = 'p03';
  const pageNo = 'P03';
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
          7.
        </Typography>
        <Typography fontSize={'var(--font-size-32)'}>잘 듣고, 빈칸에 알맞은 말을 써 봅시다.</Typography>
      </Box>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C12/A03/ME1-L05-C12-A03-P03.mp3',
    captionSrc: '/L05/C12/A03/ME1-L05-C12-A03-P03.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].answer2,
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

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer2: value } }));
    }
    changeData(pageNo, 1, subKey, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsshow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData[pageKey].answer1, cardData[pageKey].solution1);
      const isCorrect2 = isAnswer(cardData[pageKey].answer2, cardData[pageKey].solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
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
          : !isNotEmptyString(cardData[pageKey].answer1) || !isNotEmptyString(cardData[pageKey].answer2)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!isNotEmptyString(cardData[pageKey].answer1) || !isNotEmptyString(cardData[pageKey].answer2)}
      onSubmit={handleSubmit}
    >
      <Box background={'white'} hAlign='center' useRound>
        <Typography>
          Junho will take &nbsp;
          <Input
            name='value'
            ariaLabel={'1번 답 입력란'}
            value={cardData[pageKey].answer1}
            width='100px'
            status={cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer1, cardData[pageKey].solution1) ? InputStatus.ERROR : ''}
            maxLength={10}
            readOnly={cardData[pageKey].isSubmitted}
            onChange={e => handleInputChange(1, e.target.value)}
          />
          <Input
            name='value'
            ariaLabel={'2번 답 입력란'}
            value={cardData[pageKey].answer2}
            width='150px'
            status={cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer2, cardData[pageKey].solution2) ? InputStatus.ERROR : ''}
            marginLeft={7}
            maxLength={20}
            readOnly={cardData[pageKey].isSubmitted}
            onChange={e => handleInputChange(2, e.target.value)}
          />
          &nbsp; .
        </Typography>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height={'40%'} show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              {cardData[pageKey].solution1}&nbsp;{cardData[pageKey].solution2}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
