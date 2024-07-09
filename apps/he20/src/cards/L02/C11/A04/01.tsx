import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import styled from '@emotion/styled';
import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C11A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IProps } from '.';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

interface IP01Info {
  text: React.ReactNode;
  data: Idata[];
  answer: string;
}

interface Idata {
  text: string;
}

const P01 = ({ headerInfo }: IProps) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A04);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionText = '1. Which is NOT true according to the passage?';

  const data: Idata[] = [
    {
      text: 'Dark patterns trick users into making decisions against their will.',
    },
    {
      text: '“Forced continuity” ends a membership after a free trial.',
    },
    {
      text: 'Some companies do not let users know when a free trial ends.',
    },
    {
      text: 'Users may have difficulty cancelling memberships due to dark patterns.',
    },
  ];

  const info: IP01Info = {
    text: (
      <Typography>
        &nbsp;&nbsp; Have you ever bought something online after seeing a message such as “Hurry! One item left!” even though you didn’t intend to buy
        it? Or have you ever felt rushed into making a purchase because of a limited-time offer? If you have, then you{' '}
        <Underline>(A) may have fallen / cannot have fallen</Underline> prey to a dark pattern. Dark patterns are manipulative designs on websites and
        applications that trick users into making unintended decisions. These deceptive practices often have consequences that cause financial damages
        to the users. <br></br>&nbsp;&nbsp; A widely used dark pattern is the practice of “forced continuity,” which requires users{' '}
        <Underline>(B) paying / to pay</Underline> a membership fee after a free trial ends. Companies deliberately avoid informing users about the
        end of the free trial period or make the cancellation process <Underline>(C) complicate / complicated</Underline>. As a result, users have to
        pay membership fees even if they no longer want to use the service.
      </Typography>
    ),
    data: data,
    answer: '2',
  };

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend={true}
      vAlign={'flex-start'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer}
      submitBtnColor={!cardData.p01.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={onGrade}
      bodyId='targetContainer'
    >
      <BoxWrap useFull>
        <Box useFull background='white' lineHeight='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>{info.text}</Scroll>
        </Box>
        <Box useFull>
          <List
            gap={10}
            data={info.data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                ariaLabel={index + '번 보기'}
                value={index === cardData.p01.answer}
                onClick={() => handleChange(index)}
                readOnly={cardData.p01.isSubmitted}
                isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow} marginTop={140}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{info.answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Underline = styled.span`
  text-decoration: underline;
  text-underline-position: under;
`;

export default P01;
