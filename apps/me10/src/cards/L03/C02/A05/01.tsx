import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Dropdown,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  PinchZoom,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A05 } from './store';

const page = 'P01';
const pageKey = 'p01';

const imgSrc = '/L03/C02/A05/ME1-L03-C02-A05-P01.jpg';
const imgAlt =
  '남학생과 여학생이 공원 벤치에 앉아 대화를 나누고 있다. 여학생은 양 손으로 배를 만지고 있다. 남자 말: What’s the problem?  여자 말 : I’m [upset / hungry].';

const dropdownList = ['upset', 'hungry'];

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { answer, solution, isSubmitted, isCorrect } = cardData[pageKey];
  const [isShowAnswer, setShowAnswer] = useState(false);
  const isDisabled = !isNotEmptyString(answer);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Check',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is Jiwon’s problem?',
    mark: getMarking(isSubmitted, isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A05/ME1-L03-C02-A05-P01.mp3',
    captionSrc: '/L03/C02/A05/ME1-L03-C02-A05-P01.srt',
  };

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
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0].value || answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = isAnswer(answer, solution);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const handleDropdownClick = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(page, 1, 1, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        <Box vAlign='center' flex='1'>
          <PinchZoom>
            <Image src={imgSrc} width='460px' height='240px' />
            <Box type='hidden' id='img_desc'>
              {imgAlt}
            </Box>
          </PinchZoom>
        </Box>
        <Box width='490px' height='342px'>
          <Box vAlign='center' marginTop='20px' marginLeft='12px'>
            <Typography>I’m</Typography>
            <Dropdown
              width='264px'
              ariaLabel='답안'
              dropdownList={dropdownList}
              onClick={value => value && handleDropdownClick(value)}
              readOnly={isSubmitted}
              isError={isSubmitted && !isCorrect}
              selectedValue={answer}
            />
            <Typography>.</Typography>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography usePre>{solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
