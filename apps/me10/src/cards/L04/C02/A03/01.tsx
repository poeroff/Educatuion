import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  List,
  ETagLine,
  IAudioPlayerProps,
  Image,
  IQuestionProps,
  Checkbox,
  Tag,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L04C02A03 } from './store';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const [isShow, setShow] = useState<boolean>(false);

  const data = [{ text: 'Saturday' }, { text: 'Sunday' }, { text: '5:00 p.m.' }, { text: '7:00 p.m' }];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/ME1-L04-C02-A03-P01.mp3',
    captionSrc: '/L04/C02/A03/ME1-L04-C02-A03-P01.srt',
  };

  const questionInfo: IQuestionProps = {
    text: 'What’s the weather like today?',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData[pageKey].answers.every((element, index) => element === cardData[pageKey].solution[index]);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData[pageKey].answers,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answers: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleCheckbox = (index: number) => {
    const newAnswer = [...cardData[pageKey].answers];
    newAnswer[index] = newAnswer[index] === 1 ? 0 : 1;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answers: [...newAnswer] } }));
    changeData(pageNumber, 1, 1, newAnswer);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData[pageKey].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : Array.isArray(cardData[pageKey].answers) && cardData[pageKey].answers.every(e => e === 0)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData[pageKey].isSubmitted && Array.isArray(cardData[pageKey].answers) && cardData[pageKey].answers.every(e => e === 0)}
      onSubmit={onSubmit}
      audioInfo={audioInfo}
    >
      <BoxWrap useFull>
        <Box width='600px' hAlign={'center'} useFull>
          <Image
            src={'/L04/C02/A03/ME1-L04-C02-A03-P01.jpg'}
            width='600px'
            alt='Team Top Concert" 콘서트 티켓. 올림픽 공원에서 열리며, 좌석 번호는 E12이고, 티켓 번호는 012345이다. 콘서트 일정은 토요일 또는 일요일, 오후 5시와 또는 오후 7시 중 하나를 선택할 수 있다.'
          />
        </Box>
        <Box hAlign={'center'} useFull marginLeft={50}>
          <List gap={24} data={data}>
            {({ value, index = 1 }) => (
              <Checkbox
                type='check'
                align='vertical'
                name={'checkbox-group'}
                label={value?.text}
                value={!!cardData[pageKey].answers[index - 1]}
                defaultValue={!!cardData[pageKey].answers[index - 1]}
                readOnly={cardData[pageKey].isSubmitted}
                isError={cardData[pageKey].isSubmitted && cardData[pageKey].solution[index - 1] !== cardData[pageKey].answers[index - 1]}
                onClick={e => handleCheckbox(index - 1)}
              />
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {data
              .filter((e, i) => {
                return cardData[pageKey].solution[i] === 1;
              })
              .map(e => e.text)
              .join(', ')}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
