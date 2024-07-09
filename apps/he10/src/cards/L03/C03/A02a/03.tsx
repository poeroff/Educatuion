import {
  BottomSheet,
  Box,
  BoxWrap,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  Image,
  Input,
  InputStatus,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C03A02a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, isSetShow] = useState<boolean>(false);

  const pageNumber = 'P03';
  const pageKey = 'p03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Fill in the blanks using information from the talk.',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.mp3',
    captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const handleChangeValue = (value: string, index: number) => {
    switch (index) {
      case 1:
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer1: cardData[pageKey].answer1 === value ? undefined : value } }));
        changeData(pageNumber, 1, index, cardData[pageKey].answer1 === value ? undefined : value);
        break;
      case 2:
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer2: cardData[pageKey].answer2 === value ? undefined : value } }));
        changeData(pageNumber, 1, index, cardData[pageKey].answer2 === value ? undefined : value);
        break;
      case 3:
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer3: cardData[pageKey].answer3 === value ? undefined : value } }));
        changeData(pageNumber, 1, index, cardData[pageKey].answer3 === value ? undefined : value);
        break;
      case 4:
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer4: cardData[pageKey].answer4 === value ? undefined : value } }));
        changeData(pageNumber, 1, index, cardData[pageKey].answer4 === value ? undefined : value);
        break;
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
            answer1: userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData[pageKey].answer1,
            answer2: userSubmissionList[0].inputData[1]?.value !== undefined ? userSubmissionList[0].inputData[1]?.value : cardData[pageKey].answer2,
            answer3: userSubmissionList[0].inputData[2]?.value !== undefined ? userSubmissionList[0].inputData[2]?.value : cardData[pageKey].answer3,
            answer4: userSubmissionList[0].inputData[2]?.value !== undefined ? userSubmissionList[0].inputData[3]?.value : cardData[pageKey].answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmitClick = () => {
    if (cardData[pageKey].isSubmitted) {
      isSetShow(!isShow);
    } else {
      const isAnswer1 = isAnswer(cardData[pageKey].answer1!, cardData[pageKey].solution1);
      const isAnswer2 = isAnswer(cardData[pageKey].answer2!, cardData[pageKey].solution2);
      const isAnswer3 = isAnswer(cardData[pageKey].answer3!, cardData[pageKey].solution3);
      const isAnswer4 = isAnswer(cardData[pageKey].answer4!, cardData[pageKey].solution4);

      const isCorrect = isAnswer1 && isAnswer2 && isAnswer3 && isAnswer4;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer1,
              isAnswer: isAnswer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer2,
              isAnswer: isAnswer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData[pageKey].answer3,
              isAnswer: isAnswer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData[pageKey].answer4,
              isAnswer: isAnswer4,
            },
          ],
          isCorrect,
        },
      ];
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const isSubmitDisabled =
    !isNotEmptyString(cardData[pageKey].answer1!) ||
    !isNotEmptyString(cardData[pageKey].answer2!) ||
    !isNotEmptyString(cardData[pageKey].answer3!) ||
    !isNotEmptyString(cardData[pageKey].answer4!);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={handleSubmitClick}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      audioInfo={audioInfo}
    >
      <Image size='100%' src={'/L03/C03/A02/HE1-L03-C03-A02-02-1.jpg'} type={EImageType.IMG_BG}>
        <BoxWrap useFull flexDirection={'column'}>
          <Box hAlign='center'>
            <Typography weight='var(--font-weight-bold)'>Welcome to the Whispering Gallery</Typography>
          </Box>
          <BoxWrap useFull>
            <Box vAlign='center' marginLeft='20px'>
              <Image width='300px' height='200px' src={'/L03/C03/A02/HE1-L03-C03-A02-02-2.jpg'} alt='세인트 폴 성당의 위스퍼링 갤러리 내부의 모습' />
            </Box>
            <Box display='flex' flexDirection='column'>
              <Box>
                <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                  The Whispering Gallery is a circular wall
                </Typography>
              </Box>
              <Box vAlign='center' display='inline-flex'>
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  (1)
                </Typography>
                <Input
                  status={
                    !cardData[pageKey].isSubmitted
                      ? InputStatus.ENABLE
                      : isAnswer(cardData[pageKey].answer1!, cardData[pageKey].solution1)
                      ? InputStatus.DEFAULT
                      : InputStatus.ERROR
                  }
                  width='228px'
                  value={cardData[pageKey].answer1}
                  onChange={e => handleChangeValue(e.target.value, 1)}
                  placeholder=''
                  readOnly={cardData[pageKey].isSubmitted}
                  ariaLabel='1번 답란'
                />
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  the dome of
                </Typography>
              </Box>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                St. Paul’s Cathedral in London. When you
              </Typography>
              <Box vAlign='center'>
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  (2)
                </Typography>
                <Input
                  status={
                    !cardData[pageKey].isSubmitted
                      ? InputStatus.ENABLE
                      : isAnswer(cardData[pageKey].answer2!, cardData[pageKey].solution2)
                      ? InputStatus.DEFAULT
                      : InputStatus.ERROR
                  }
                  width='228px'
                  value={cardData[pageKey].answer2}
                  onChange={e => handleChangeValue(e.target.value, 2)}
                  placeholder=''
                  readOnly={cardData[pageKey].isSubmitted}
                  ariaLabel='2번 답란'
                />
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  on one side, your
                </Typography>
              </Box>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                speech can be heard on the
              </Typography>
              <Box vAlign='center'>
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  (3)
                </Typography>
                <Input
                  status={
                    !cardData[pageKey].isSubmitted
                      ? InputStatus.ENABLE
                      : isAnswer(cardData[pageKey].answer3!, cardData[pageKey].solution3)
                      ? InputStatus.DEFAULT
                      : InputStatus.ERROR
                  }
                  width='228px'
                  value={cardData[pageKey].answer3}
                  onChange={e => handleChangeValue(e.target.value, 3)}
                  placeholder=''
                  readOnly={cardData[pageKey].isSubmitted}
                  ariaLabel='3번 답란'
                />
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  side because the
                </Typography>
              </Box>
              <Box vAlign='center' display='inline-flex'>
                <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                  sound waves
                </Typography>
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  (4)
                </Typography>
                <Input
                  status={
                    !cardData[pageKey].isSubmitted
                      ? InputStatus.ENABLE
                      : isAnswer(cardData[pageKey].answer4!, cardData[pageKey].solution4)
                      ? InputStatus.DEFAULT
                      : InputStatus.ERROR
                  }
                  width='228px'
                  value={cardData[pageKey].answer4}
                  onChange={e => handleChangeValue(e.target.value, 4)}
                  placeholder=''
                  readOnly={cardData[pageKey].isSubmitted}
                  ariaLabel='4번 답란'
                />
              </Box>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                the curved wall. Try it out for yourself !
              </Typography>
            </Box>
          </BoxWrap>
        </BoxWrap>
      </Image>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {`(1) ${cardData[pageKey].solution1}\n(2) ${cardData[pageKey].solution2}\n(3) ${cardData[pageKey].solution3}\n(4) ${cardData[pageKey].solution4}`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
