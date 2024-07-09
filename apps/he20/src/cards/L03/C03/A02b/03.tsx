import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  IAudioPlayerProps,
  TMainHeaderInfoTypes,
  Typography,
  Image,
  Tag,
  ETagLine,
  IQuestionProps,
  EImageType,
  Dropdown,
  BoxWrap,
  EStyleButtonTypes,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C03A02b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02b);
  const { userId } = useRecoilValue(studentAtom);

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
      ],
    },
  ];

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);

  const dropArr = ['15', 'silence', 'emergency'];

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

  const isSubmitDisabled =
    !isNotEmptyString(cardData.p03.answer1) || !isNotEmptyString(cardData.p03.answer2) || !isNotEmptyString(cardData.p03.answer3);

  const handleClickDropdown = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((_, idx) => idx + 1 === index));
    switch (index) {
      case 1:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value || cardData.p03.answer1 } }));
        break;
      case 2:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value || cardData.p03.answer2 } }));
        break;
      case 3:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value || cardData.p03.answer3 } }));
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

      const isCorrect = isAnswer1 && isAnswer2 && isAnswer3;

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
          <Box padding='8px 12px' color='var(--color-blue-700)' fontWeight={900} lineHeight='70px' maxHeight={'70px'}>
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
                  <Box display='inline-block'>
                    <Dropdown
                      width='200px'
                      dropdownList={dropArr}
                      onClick={value => handleClickDropdown(1, value)}
                      selectedValue={cardData.p03.answer1}
                      aria-label='1번 값을 선택하세요.'
                      readOnly={cardData.p03.isSubmitted}
                      isError={cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer1, cardData.p03.solution1)}
                      isOpen={openDropdown[0]}
                    />
                  </Box>
                  &nbsp; your electronic devices.
                </Typography>
              </Box>
              <Box vAlign='top' marginLeft='15px'>
                <Typography lineHeight={'60px'}>2. </Typography>
                <Typography lineHeight={'60px'}>Don’t take photos or make video recordings .</Typography>
              </Box>
              <Box vAlign='top' lineHeight={'60px'} marginLeft='15px'>
                <Typography lineHeight={'60px'}>3. </Typography>
                <Typography lineHeight={'60px'}>
                  For your safety, check the nearest (2)&nbsp;
                  <Box display='inline-block'>
                    <Dropdown
                      width='200px'
                      dropdownList={dropArr}
                      onClick={value => handleClickDropdown(2, value)}
                      selectedValue={cardData.p03.answer2}
                      aria-label='2번 값을 선택하세요.'
                      readOnly={cardData.p03.isSubmitted}
                      isError={cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer2, cardData.p03.solution2)}
                      isOpen={openDropdown[1]}
                    />
                  </Box>
                  &nbsp; exits in case of an emergency.
                </Typography>
              </Box>
            </Box>
            <Box useRound hAlign='center' padding='12px 6px' margin='15px 10px 15px 0px' background={'#E3F2FF'}>
              <Typography weight={'var(--font-weight-bold)'} color={'var(--color-blue-700)'}>
                Break: (3)&nbsp;
              </Typography>
              <Box display='inline-block'>
                <Dropdown
                  width='200px'
                  dropdownList={dropArr}
                  onClick={value => handleClickDropdown(3, value)}
                  selectedValue={cardData.p03.answer3}
                  aria-label='3번 값을 선택하세요.'
                  readOnly={cardData.p03.isSubmitted}
                  isError={cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer3, cardData.p03.solution3)}
                  isOpen={openDropdown[2]}
                  type='up'
                />
              </Box>
              <Typography weight={'var(--font-weight-bold)'} color={'var(--color-blue-700)'}>
                &nbsp; minutes between Act 1 and Act 2
              </Typography>
            </Box>
            <Box vAlign='bottom' lineHeight={'60px'} marginLeft='15px'>
              <Typography lineHeight={'60px'}>•</Typography>
              <Typography lineHeight='60px'>During the break, feel free to get snacks or use the restroom on the first floor.</Typography>
            </Box>
          </BoxWrap>
        </Scroll>
      </Image>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <BoxWrap marginTop='12px' flexDirection='column'>
            {[cardData.p03.solution1, cardData.p03.solution2, cardData.p03.solution3].map((val, idx) => (
              <Box key={idx} marginTop={idx !== 0 ? '12px' : ''}>
                ({idx + 1}) {val}
              </Box>
            ))}
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
