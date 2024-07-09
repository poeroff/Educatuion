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

const P03 = ({ headerInfo, questionText, imageSrc, udl }: IProps) => {
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
          value: 0,
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
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer1.trim() === cardData.p03.solution1;
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    }
    changeData('P03', 1, subKey, value);
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

  const nodeData: IContentList[] = [
    {
      children: (
        <Box>
          <Typography>
            3. A beautiful park where people can relax lies{' '}
            <Typography useGap={false} textDecoration={'underline'}>
              in the heart of the city
            </Typography>{' '}
            .
          </Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box marginTop='10px' marginLeft='38px'>
          <Typography>
            <StyledIcon src={arrowRight} size='38px' />
            In the heart of the city{' '}
            <Input
              value={cardData.p03.answer1}
              onChange={event => handleChange(1, event.target.value)}
              textAlign='left'
              width='70px'
              maxLength={20}
              readOnly={cardData.p03.isSubmitted}
              status={
                !cardData.p03.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p03.answer1.trim() !== cardData.p03.solution1
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel={'Seldom 이후에 들어갈 문장(단어)'}
            />{' '}
            a beautiful park where people can relax.
          </Typography>
        </Box>
      ),
    },
  ];

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onGrade}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p03.answer1}
      submitBtnColor={!cardData.p03.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
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
          <Box marginTop='12px'>{cardData.p03.solution1}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  margin-left: -38px;
`;

export default P03;
