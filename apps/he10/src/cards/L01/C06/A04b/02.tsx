import { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  Button,
  BoxWrap,
  EStyleButtonTypes,
  Typography,
  Dropdown,
  Scroll,
  IQuestionProps,
  TMainHeaderInfoTypes,
  EStyleSizes,
  SvgIcon,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import arrow_right from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A04b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A04b);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong  (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q2. Choose the correct words to complete the sentence.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const contents =
    'The responsive behavior of dogs also caught the attention of an evolutionary anthropologist, Brian Hare.' +
    ' He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor.' +
    ' He placed two cups on the ground with food hidden under only one of them.' +
    ' When he pointed to the cup with the food, the dogs found it easily.' +
    ' The wolves, however, struggled and chose cups at random, paying no attention to his gestures.' +
    ' Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves.' +
    ' He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness.' +
    ' This explanation sounds reasonable according to several evolutionary biologists.' +
    ' They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves.' +
    ' Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.';

  const dropdownLabels = ['communicative', 'survival'];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.answer === cardData.p02.solution;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p02.answer,
              isCorrect: isCorrect,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted: isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData('P02', 1, 1, index);
  };

  const handleClickDropdown = (value?: string) => {
    const answerIndex = dropdownLabels.findIndex(label => label === value);
    if (answerIndex >= 0) {
      handleChange(answerIndex + 1);
    }
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
      vAlign={'flex-start'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p02.answer === 0}
      submitBtnColor={cardData.p02.answer === 0 ? EStyleButtonTypes.SECONDARY : !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY}
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button tabIndex={101} label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>
      <Scroll>
        <Box background={'white'} useRound>
          <Box hAlign={'center'}>
            <Typography>What skills have dogs developed?</Typography>
          </Box>
          <Box hAlign={'center'}>
            <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' />
            <Typography>Dogs have developed </Typography>
            <Dropdown
              dropdownList={dropdownLabels}
              width={'240px'}
              onClick={handleClickDropdown}
              ariaLabel='값을 선택하세요.'
              selectedValue={dropdownLabels[cardData.p02.answer - 1]}
              readOnly={cardData.p02.isSubmitted}
              isError={cardData.p02.isSubmitted ? (cardData.p02.answer === cardData.p02.solution ? false : true) : false}
            />
            <Typography>skills with humans.</Typography>
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p02.isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>communicative</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        topHeight={50}
        width={921}
        height={500}
        isShow={isShowModal}
        onClose={closeModal}
        useFooter={true}
        closeLabel='지문 닫기'
        useHeader
        header={() => (
          <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              The Power of Friendliness: Soft but Strong (2)
            </Typography>
          </Box>
        )}
        tabIndex={102}
      >
        <Typography>{contents}</Typography>
      </Dialog>
    </Container>
  );
};

export default P02;
