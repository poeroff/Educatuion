import {
  Box,
  TextView,
  Image,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  EStyleButtonTypes,
  Typography,
  Input,
  InputStatus,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { IContentList, IProps } from '.';

import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C08A03b } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = ({ headerInfo, questionText, imageSrc, udl }: IProps) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A03b);
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
      ],
    },
  ];
  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim().toLowerCase() === cardData.p01.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
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

  const nodeData: IContentList[] = [
    {
      children: (
        <Box>
          <Typography>
            1. He{' '}
            <Typography useGap={false} textDecoration={'underline'}>
              seldom
            </Typography>{' '}
            says no to his friends when they ask for help.
          </Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box marginTop='10px' marginLeft='38px'>
          <Typography>
            <StyledIcon src={arrowRight} size='38px' />
            Seldom{' '}
            <Input
              value={cardData.p01.answer1}
              onChange={event => handleChange(1, event.target.value)}
              textAlign='left'
              width='90px'
              maxLength={20}
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p01.answer1.trim() !== cardData.p01.solution1
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel={'Seldom 이후에 들어갈 문장(단어)'}
            />{' '}
            he{' '}
            <Input
              value={cardData.p01.answer2}
              maxLength={20}
              onChange={event => handleChange(2, event.target.value)}
              textAlign='left'
              width='90px'
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p01.answer2.trim() !== cardData.p01.solution2
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel={'he 이후에 들어갈 문장(단어)'}
            />{' '}
            no to his friends when they ask for help.
          </Typography>
        </Box>
      ),
    },
  ];

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onGrade}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <Box marginTop={'8px'}>
              <Image src={imageSrc} width={'862px'} alt={''} ariaDescribedby='img_desc' />
              {udl && (
                <Box type='hidden' id='img_desc'>
                  {udl.map((item, index) => (
                    <p key={`img_desc_${index}`}>{item}</p>
                  ))}
                </Box>
              )}
            </Box>
          </TextView>
        </Box>
        <Box marginTop='20px'>
          {nodeData.map((item, index) => {
            return <Box key={index}>{item?.children}</Box>;
          })}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>
            {cardData.p01.solution1}, {cardData.p01.solution2}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  margin-left: -38px;
`;

export default P01;
