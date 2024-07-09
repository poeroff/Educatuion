import { Box, TextView, Image, IQuestionProps, Tag, ETagLine, BottomSheet, EStyleButtonTypes, Typography, Input, InputStatus } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { IContentList, IProps } from '.';

import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C08A03a } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P04 = ({ headerInfo, questionText, imageSrc, udl }: IProps) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A03a);
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
      ],
    },
  ];
  const onGrade = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p04.answer1, cardData.p04.solution1);
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
        <Box marginTop='10px' marginLeft='30px' vAlign='flex-start'>
          <Typography lineHeight='50px'>
            <span style={{ marginLeft: '-30px' }}></span>
            4. Sujin was listening to her favorite song in the living room{' '}
            <Input
              value={cardData.p04.answer1}
              maxLength={40}
              onChange={event => handleChange(1, event.target.value)}
              textAlign='left'
              readOnly={cardData.p04.isSubmitted}
              status={
                !cardData.p04.isSubmitted
                  ? InputStatus.ENABLE
                  : !isAnswer(cardData.p04.answer1, cardData.p04.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              width='272px'
              ariaLabel={'"Sujin was listening to her favorite song in the living room" 이후에 들어갈 문장(단어)'}
              placeholder='내용을 넣어 주세요.'
            />
            .
          </Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
          <Typography useGap={false} color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
            제시어 : with, closed, her eyes
          </Typography>
        </Box>
      ),
    },
  ];

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onGrade}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p04.answer1}
      submitBtnColor={!cardData.p04.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
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
          <Box marginTop='12px'>{cardData.p04.solution1}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;