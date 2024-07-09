import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import ConnectorLine from '@/assets/example/connector_line.svg';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';
import React, { useEffect, useMemo, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03_0001_22 } from './store';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C03_0001_22);

  const [isShow, setShow] = useState<boolean>(false);

  const pageNum = 'P02';

  const { answer, isSubmitted, solution } = cardData[pageNum];

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
      ],
    },
  ];

  const isCorrect = useMemo(() => {
    if (!isSubmitted) {
      return false;
    }

    const result = answer === solution;

    return result;
  }, [isSubmitted]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box display='flex' alignItems='center'>
        <SvgIcon src={headerIcon} size='48px' />
        &nbsp;빈칸에 알맞은 수를 써넣으세요.
      </Box>
    ),
    mark: getMarking(isSubmitted, isCorrect),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCardData(prev => ({
      ...prev,
      [pageNum]: {
        ...prev[pageNum],
        answer: value,
      },
    }));

    changeData(pageNum, 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData.P02.isSubmitted) {
      setShow(prev => !prev);
    } else {
      const isCorrect = answer === solution;
      setCardData(prev => ({ ...prev, [pageNum]: { ...prev[pageNum], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];

      submitDataWithResult(pageNum, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNum]: {
            ...prev[pageNum],
            answer: userSubmissionList[0].inputData[0]?.value,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
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
      headerInfo={null}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={answer === ''}
      submitBtnColor={answer === '' ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              8
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>x 6</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                width='130px'
                value={answer}
                status={isSubmitted ? !isCorrect && InputStatus.ERROR : false}
                disabled={isSubmitted}
                onChange={e => handleInputChange(e)}
                ariaLabel='답안 입력 란'
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>{solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>8×6=48</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P02;
