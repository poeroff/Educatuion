import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Dropdown,
  BottomSheet,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  EStyleFontSizes,
  Tag,
  ETagLine,
  IQuestionProps,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import React, { useEffect, useState } from 'react';
import { L04_C06_A05 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04_C06_A05);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const dropArr = ['processing', 'storing', 'learning'];
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (3)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q3. Choose the appropriate words for the blanks.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = cardData.p02.answer1 === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2 === cardData.p02.solution2;
      const isCorrect3 = cardData.p02.answer3 === cardData.p02.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));

    if (index === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value ? value : '' } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value ? value : '' } }));
    } else if (index === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value ? value : '' } }));
    }

    changeData('P02', 1, index, value);
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
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

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)}
      vAlign={'flex-start'}
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>

      <Box background={'white'} width={910} useRound>
        <Box>
          <Typography useGap={false}>How will AI-powered neural implants change the way our brains work?</Typography>
        </Box>
        <Box display='flex' flexWrap='wrap'>
          <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px', marginTop: '10px' }} src={arrow_right} size='36px' />
          <Typography>The brain’s role would shift from</Typography>
          <Dropdown
            width='200px'
            dropdownList={dropArr}
            selectedValue={cardData.p02.answer1}
            readOnly={cardData.p02.isSubmitted}
            isError={cardData.p02.isSubmitted && cardData.p02.answer1 !== cardData.p02.solution1}
            isOpen={openDropdown[0]}
            onClick={value => handleDropdownClick(1, value)}
          />
          <Typography>and</Typography>
          <Dropdown
            width='200px'
            dropdownList={dropArr}
            selectedValue={cardData.p02.answer2}
            readOnly={cardData.p02.isSubmitted}
            isError={cardData.p02.isSubmitted && cardData.p02.answer2 !== cardData.p02.solution2}
            isOpen={openDropdown[1]}
            onClick={value => handleDropdownClick(2, value)}
          />
          <Typography>information to</Typography>
          <Dropdown
            width='200px'
            dropdownList={dropArr}
            selectedValue={cardData.p02.answer3}
            readOnly={cardData.p02.isSubmitted}
            isError={cardData.p02.isSubmitted && cardData.p02.answer3 !== cardData.p02.solution3}
            isOpen={openDropdown[2]}
            onClick={value => handleDropdownClick(3, value)}
          />
          <Typography>the vast amounts of data provided by the implants.</Typography>
        </Box>
      </Box>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'40%'}
        show={showAnswer}
        closeOption={{ useYn: true, onClose: () => setShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px' flexDirection='column' display='flex'>
            <Typography useGap={false}>(1) {cardData.p02.solution1}</Typography>
            <Typography useGap={false}>(2) {cardData.p02.solution2}</Typography>
            <Typography useGap={false}>(3) {cardData.p02.solution3}</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog width={921} height={500} isShow={isShowModal} onClose={closeModal} useFooter={true} closeLabel='지문 닫기' tabIndex={101}>
        <Box useFull padding='24px 32px'>
          <Box vAlign='center' width='100%' backgroundColor='var(--color-grey-100)' marginBottom='20px' useRound>
            <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes['X-MEDIUM']}>
              Will AI-Powered Neural Implants Make Us Super-Humans? (3)
            </Typography>
          </Box>
          <Box>
            <Scroll height={'270px'} tabIndex={0}>
              <Typography>
                The success of AI-powered neural implants in health care is also expected to spread to other industries. Some futurists predict that
                these implants will become commercially available in the next 20 to 30 years and significantly change our daily lives. For example,
                advances in neural implant technology will make it possible to install in our brains software that can read our minds. This could
                enable us to play games, type social media messages, and stream music simply by thinking. There is also great potential for
                memory-enhancing brain implants, similar to computer memory chips. Such devices would allow us to capture and enhance memories, and
                even upload and download them using the digital cloud. We could look through our memories like a social media feed, vividly recall our
                favorite life moments, share memories with others, and back up our most valuable memories. Finally, AI-powered neural implants would
                revolutionize the way our brains work. The role of the brain would shift from learning and storing information to processing the vast
                amounts of data provided by the implants. Instead of simply memorizing information, we would be able to download knowledge, use our
                creativity to interpret it, and generate new ideas.
              </Typography>
            </Scroll>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;
