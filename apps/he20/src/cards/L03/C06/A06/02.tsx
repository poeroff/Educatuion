import { useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  SvgIcon,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C06A06 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A06);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState(false);

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
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. Fill in the blank to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim().toLowerCase() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim().toLowerCase() === cardData.p02.solution2;
      const isCorrect3 = cardData.p02.answer3.trim().toLowerCase() === cardData.p02.solution3;
      const isCorrect4 = cardData.p02.answer4.trim().toLowerCase() === cardData.p02.solution4;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.answer4,
              isCorrect: isCorrect4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer4: value } }));
    }
    changeData('P02', 1, subKey, value);
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

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3 && cardData.p02.answer4)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3 && cardData.p02.answer4)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button tabIndex={101} label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>

      <Scroll>
        <Box background={'white'} useRound>
          <Box>
            <Typography>How did Anna Ancher differ from other artists of that era?</Typography>
          </Box>
          <Box>
            <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' />
            <Typography>She showcased women as</Typography>
            <Input
              minWidth={'235px'}
              maxLength={1000}
              name='value1'
              value={cardData.p02.answer1}
              width='240px'
              onChange={e => handleChange(1, e.target.value)}
              placeholder='내용을 넣어주세요.'
              status={cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1) ? 'error' : undefined}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='1번 답란'
            />{' '}
            <Input
              minWidth={'235px'}
              maxLength={1000}
              name='value2'
              value={cardData.p02.answer2}
              width='240px'
              onChange={e => handleChange(2, e.target.value)}
              placeholder='내용을 넣어주세요.'
              status={cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2) ? 'error' : undefined}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='2번 답란'
            />
            <Typography>in everyday tasks while other artists depicted them as</Typography>
            <Input
              minWidth={'235px'}
              maxLength={1000}
              name='value3'
              value={cardData.p02.answer3}
              width='240px'
              onChange={e => handleChange(3, e.target.value)}
              placeholder='내용을 넣어주세요.'
              status={cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer3, cardData.p02.solution3) ? 'error' : undefined}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='3번 답란'
            />{' '}
            <Input
              minWidth={'235px'}
              maxLength={1000}
              name='value4'
              value={cardData.p02.answer4}
              width='240px'
              onChange={e => handleChange(4, e.target.value)}
              placeholder='내용을 넣어주세요.'
              status={cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer4, cardData.p02.solution4) ? 'error' : undefined}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='4번 답란'
            />
            <Typography>subjects.</Typography>
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p02.isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>active, participants, still, life</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog width={921} height={500} isShow={isShowModal} onClose={closeModal} useFooter={true} closeLabel='지문 닫기'>
        <Box tabIndex={104} useFull padding='24px 32px'>
          <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='#EFF0F2' marginBottom='24px' tabIndex={105}>
            <Typography weight='var(--font-weight-bold)'>From Shadows to Spotlights(4)</Typography>
          </Box>
          <Scroll height='290px'>
            <Box padding='4px 12px' display='flex' flexDirection='column' tabIndex={106}>
              <Typography>Now let’s take a look at the final artist of this exhibition: Anna Ancher, a famous painter from Denmark.</Typography>
              <Typography>When observing her paintings, you may notice a common theme—they all feature female figures.</Typography>
              <Typography>Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school.</Typography>
              <Typography>After that, she even studied abroad in Paris, which was unusual for women at the time.</Typography>
              <Typography>Thanks to her mother’s encouragement, she was able to take advantage of these opportunities.</Typography>
              <Typography>
                Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on
                household duties.
              </Typography>
              <Typography>Ancher differed from other artists of that era, who depicted women as still life subjects.</Typography>
              <Typography>
                In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing
                Fisherman’s Wife.
              </Typography>
              <Typography>She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark.</Typography>
              <Typography>
                In her painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed.
              </Typography>
              <Typography>
                Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent.
              </Typography>
              <Typography>Her paintings continue to amaze us to this day.</Typography>
              <br />
              <Typography>
                Thank you for joining this guided tour, and I hope my explanations have aided you in appreciating these paintings.
              </Typography>
              <Typography>Please take some time to further explore the exhibition.</Typography>
            </Box>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;
