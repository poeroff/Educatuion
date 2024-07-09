import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  IAudioPlayerProps,
  Input,
  TMainHeaderInfoTypes,
  Typography,
  Image,
  Tag,
  ETagLine,
  IQuestionProps,
  EStyleButtonTypes,
  EImageType,
  BoxWrap,
  Scroll,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const displayCorrectAnswers = ['silence', 'distract', 'video recordings', 'emergency exits', 'emergency', '15', 'first'];

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the reminders using information from the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE2-L03-C03-A02-02.mp3',
    captionSrc: '/L03/C03/A02/HE2-L03-C03-A02-02.srt',
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
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 9,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isSubmitDisabled =
    !isNotEmptyString(cardData.p03.answer1) ||
    !isNotEmptyString(cardData.p03.answer2) ||
    !isNotEmptyString(cardData.p03.answer3) ||
    !isNotEmptyString(cardData.p03.answer4) ||
    !isNotEmptyString(cardData.p03.answer5) ||
    !isNotEmptyString(cardData.p03.answer6) ||
    !isNotEmptyString(cardData.p03.answer7) ||
    !isNotEmptyString(cardData.p03.answer8) ||
    !isNotEmptyString(cardData.p03.answer9);

  const getInputStatus = (answer: string, solution: string) => {
    if (!cardData.p03.isSubmitted || cardData.p03.isCorrect) {
      return '';
    }
    return !isAnswer(answer, solution) ? InputStatus.ERROR : InputStatus.ENABLE;
  };

  const handleInputChange = (value: string, index: number) => {
    switch (index) {
      case 1:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
        break;
      case 2:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
        break;
      case 3:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
        break;
      case 4:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer4: value } }));
        break;
      case 5:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer5: value } }));
        break;
      case 6:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer6: value } }));
        break;
      case 7:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer7: value } }));
        break;
      case 8:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer8: value } }));
        break;
      case 9:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer9: value } }));
        break;
    }
    changeData('P03', 1, index, value);
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isAnswer1 = isAnswer(cardData.p03.answer1, cardData.p03.solution1);
      const isAnswer2 = isAnswer(cardData.p03.answer2, cardData.p03.solution2);
      const isAnswer3 = isAnswer(cardData.p03.answer3, cardData.p03.solution3);
      const isAnswer4 = isAnswer(cardData.p03.answer4, cardData.p03.solution4);
      const isAnswer5 = isAnswer(cardData.p03.answer5, cardData.p03.solution5);
      const isAnswer6 = isAnswer(cardData.p03.answer6, cardData.p03.solution6);
      const isAnswer7 = isAnswer(cardData.p03.answer7, cardData.p03.solution7);
      const isAnswer8 = isAnswer(cardData.p03.answer8, cardData.p03.solution8);
      const isAnswer9 = isAnswer(cardData.p03.answer9, cardData.p03.solution9);

      const isCorrect = isAnswer1 && isAnswer2 && isAnswer3 && isAnswer4 && isAnswer5 && isAnswer6 && isAnswer7 && isAnswer8 && isAnswer9;

      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: isAnswer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: isAnswer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: isAnswer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p03.answer4,
              isAnswer: isAnswer4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p03.answer5,
              isAnswer: isAnswer5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p03.answer6,
              isAnswer: isAnswer6,
            },
            {
              subKey: 7,
              type: 'TEXT',
              value: cardData.p03.answer7,
              isAnswer: isAnswer7,
            },
            {
              subKey: 8,
              type: 'TEXT',
              value: cardData.p03.answer8,
              isAnswer: isAnswer8,
            },
            {
              subKey: 9,
              type: 'TEXT',
              value: cardData.p03.answer9,
              isAnswer: isAnswer9,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p03.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p03.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p03.answer6,
            answer7: userSubmissionList[0].inputData[6]?.value || cardData.p03.answer7,
            answer8: userSubmissionList[0].inputData[7]?.value || cardData.p03.answer8,
            answer9: userSubmissionList[0].inputData[8]?.value || cardData.p03.answer9,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitLabel={cardData.p03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Image
        alt='알림의 의미를 가진 종모양 장식 이미지'
        type={EImageType.IMG_BG}
        src='/L03/C03/A02/HE2-L03-C03-A02-02.jpg'
        height='100%'
        style={{ padding: '24px', justifyContent: 'space-between' }}
      >
        <Box hAlign='flex-start' vAlign='flex-start'>
          <Box width='64px' height='64px'></Box>
          <Box padding='8px 12px' color='var(--color-blue-700)' fontWeight={900} lineHeight='54px' maxHeight={'70px'}>
            <Typography style={{ fontSize: '36px' }} useGap={false}>
              Musical&nbsp;
            </Typography>
            <Typography style={{ fontSize: '36px' }} fontStyle='italic' useGap={false}>
              Matilda
            </Typography>
          </Box>
        </Box>
        <Scroll height={'294px'} paddingRight={0} tabIndex={0}>
          <BoxWrap display='block' background={'#F4F9FF'}>
            <Box marginTop='15px'>
              <Box vAlign='top' lineHeight={'60px'} marginLeft='15px'>
                <Typography lineHeight={'60px'}>1. </Typography>
                <Typography lineHeight={'60px'}>
                  Turn off or (1)&nbsp;
                  <Input
                    aria-label='1번 답을 입력하세요'
                    width='120px'
                    inputSize='x-small'
                    value={cardData.p03.answer1}
                    onChange={event => handleInputChange(event.target.value, 1)}
                    status={getInputStatus(cardData.p03.answer1, cardData.p03.solution1)}
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={100}
                  />
                  &nbsp;your electronic devices not to&nbsp;
                  <Input
                    aria-label='2번 답을 입력하세요'
                    width='120px'
                    inputSize='x-small'
                    value={cardData.p03.answer2}
                    onChange={event => handleInputChange(event.target.value, 2)}
                    status={getInputStatus(cardData.p03.answer2, cardData.p03.solution2)}
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={100}
                  />
                  &nbsp;others.
                </Typography>
              </Box>
              <Box vAlign='top' lineHeight={'60px'} marginLeft='15px'>
                <Typography lineHeight={'60px'}>2. </Typography>
                <Typography lineHeight={'60px'}>
                  Don’t take photos or make (3)&nbsp;
                  <Input
                    aria-label='3-1번 답을 입력하세요'
                    width='120px'
                    inputSize='x-small'
                    value={cardData.p03.answer3}
                    onChange={event => handleInputChange(event.target.value, 3)}
                    status={getInputStatus(cardData.p03.answer3, cardData.p03.solution3)}
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={100}
                  />
                  &nbsp;
                  <Input
                    aria-label='3-2번 답을 입력하세요'
                    width='160px'
                    inputSize='x-small'
                    value={cardData.p03.answer4}
                    onChange={event => handleInputChange(event.target.value, 4)}
                    status={getInputStatus(cardData.p03.answer4, cardData.p03.solution4)}
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={100}
                  />
                  .
                </Typography>
              </Box>
              <Box vAlign='top' lineHeight={'60px'} marginLeft='15px'>
                <Typography lineHeight={'60px'}>3. </Typography>
                <Typography lineHeight={'60px'}>
                  For your safety, check the nearest (4)&nbsp;
                  <Input
                    aria-label='4-1번 답을 입력하세요'
                    width='160px'
                    inputSize='x-small'
                    value={cardData.p03.answer5}
                    onChange={event => handleInputChange(event.target.value, 5)}
                    status={getInputStatus(cardData.p03.answer5, cardData.p03.solution5)}
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={100}
                  />
                  &nbsp;
                  <Input
                    aria-label='4-2번 답을 입력하세요'
                    width='80px'
                    inputSize='x-small'
                    value={cardData.p03.answer6}
                    onChange={event => handleInputChange(event.target.value, 6)}
                    status={getInputStatus(cardData.p03.answer6, cardData.p03.solution6)}
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={100}
                  />
                  &nbsp; in case of a(n) (5)&nbsp;
                  <Input
                    aria-label='5번 답을 입력하세요'
                    width='160px'
                    inputSize='x-small'
                    value={cardData.p03.answer7}
                    onChange={event => handleInputChange(event.target.value, 7)}
                    status={getInputStatus(cardData.p03.answer7, cardData.p03.solution7)}
                    readOnly={cardData.p03.isSubmitted}
                    maxLength={100}
                  />
                  .
                </Typography>
              </Box>
            </Box>
            <Box useRound padding='12px 24px' margin='15px 10px 15px 0px' background={'#E3F2FF'}>
              <Typography weight={'var(--font-weight-bold)'} color={'var(--color-blue-700)'}>
                Break: (6)&nbsp;
                <Input
                  aria-label='6번 답을 입력하세요'
                  width='80px'
                  inputSize='x-small'
                  value={cardData.p03.answer8}
                  onChange={event => handleInputChange(event.target.value, 8)}
                  status={getInputStatus(cardData.p03.answer8, cardData.p03.solution8)}
                  readOnly={cardData.p03.isSubmitted}
                  maxLength={10}
                />
                &nbsp; minutes between Act 1 and Act 2
              </Typography>
            </Box>
            <Box vAlign='bottom' lineHeight={'60px'} marginLeft='15px'>
              <Typography lineHeight={'60px'}>•</Typography>
              <Typography lineHeight='60px'>
                During the break, feel free to get snacks or use the restroom on the (7)&nbsp;
                <Input
                  aria-label='7번 답을 입력하세요'
                  width='100px'
                  inputSize='x-small'
                  value={cardData.p03.answer9}
                  onChange={event => handleInputChange(event.target.value, 9)}
                  status={getInputStatus(cardData.p03.answer9, cardData.p03.solution9)}
                  readOnly={cardData.p03.isSubmitted}
                  maxLength={11}
                />
                &nbsp; floor.
              </Typography>
            </Box>
          </BoxWrap>
        </Scroll>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Box>
            <BoxWrap marginTop='12px' flexDirection='column'>
              {displayCorrectAnswers.map((val, idx) => (
                <Box key={idx} marginTop={idx !== 0 ? '12px' : ''}>
                  ({idx + 1}) {val}
                </Box>
              ))}
            </BoxWrap>
          </Box>
        </BottomSheet>
      </Image>
    </Container>
  );
};

export default P03;
