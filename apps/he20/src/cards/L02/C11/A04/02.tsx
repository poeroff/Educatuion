import {
  Box,
  BoxWrap,
  List,
  Scroll,
  Dropdown,
  Question,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C11A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IProps } from '.';

interface Idata {
  num: string;
  dropdownList: string[];
}

const P02 = ({ headerInfo }: IProps) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A04);

  const getAnswer = (num: number) => {
    switch (num) {
      case 1:
        return cardData.p02.answer1;
      case 2:
        return cardData.p02.answer2;
      case 3:
        return cardData.p02.answer3;
      default:
        return '';
    }
  };

  const getSolution = (num: number) => {
    switch (num) {
      case 1:
        return cardData.p02.solution1;
      case 2:
        return cardData.p02.solution2;
      case 3:
        return cardData.p02.solution3;
      default:
        return '';
    }
  };

  const questionText = '2. Choose the grammatically correct words for (A)-(C).';

  const text = (
    <Typography>
      &nbsp;&nbsp; Have you ever bought something online after seeing a message such as “Hurry! One item left!” even though you didn’t intend to buy
      it? Or have you ever felt rushed into making a purchase because of a limited-time offer? If you have, then you{' '}
      <BoldUnderline>(A) may have fallen / cannot have fallen</BoldUnderline> prey to a dark pattern. Dark patterns are manipulative designs on
      websites and applications that trick users into making unintended decisions. These deceptive practices often have consequences that cause
      financial damages to the users. <br></br>&nbsp;&nbsp; A widely used dark pattern is the practice of “forced continuity,” which requires users{' '}
      <BoldUnderline>(B) paying / to pay</BoldUnderline> a membership fee after a free trial ends. Companies deliberately avoid informing users about
      the end of the free trial period or make the cancellation process <BoldUnderline>(C) complicate / complicated</BoldUnderline>. As a result,
      users have to pay membership fees even if they no longer want to use the service.
    </Typography>
  );

  const data: Idata[] = [
    {
      num: '(A)',
      dropdownList: ['may have fallen', 'cannot have fallen'],
    },
    {
      num: '(B)',
      dropdownList: ['paying', 'to pay'],
    },
    {
      num: '(C)',
      dropdownList: ['complicate', 'complicated'],
    },
  ];

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect3 = isAnswer(cardData.p02.answer3, cardData.p02.solution3);
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
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
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

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)}
      onSubmit={onGrade}
      bodyId='targetContainer'
      useExtend={true}
    >
      <BoxWrap useFull>
        <Box useFull useRound lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll>
            <Box>{text}</Box>
          </Scroll>
        </Box>
        <Box>
          <List data={data}>
            {({ index = 0, value }) => (
              <Box hAlign='center' marginBottom='10px' padding='10px'>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
                <Dropdown
                  selectedValue={getAnswer(index)}
                  width='260px'
                  marginLeft='10px'
                  dropdownList={value?.dropdownList}
                  onClick={value => handleChange(index, value ? value : '')}
                  readOnly={cardData.p02.isSubmitted}
                  isError={cardData.p02.isSubmitted && !isAnswer(getAnswer(index), getSolution(index))}
                  ariaLabel='답안 선택'
                ></Dropdown>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>(A) {cardData.p02.solution1}</Box>
          <Box marginTop='12px'>(B) {cardData.p02.solution2}</Box>
          <Box marginTop='12px'>(C) {cardData.p02.solution3}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BoldUnderline = styled.span`
  text-decoration: underline;
  text-underline-position: under;
  font-weight: var(--font-weight-bold);
`;

export default P02;
