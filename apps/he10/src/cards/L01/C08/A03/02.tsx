import { ChangeEventHandler, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ESvgType,
  ETagLine,
  Image,
  Input,
  InputStatus,
  SvgIcon,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };
  const questionInfo = {
    text: 'Find and correct grammatical errors in the underlined parts.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const { userId } = useRecoilValue(studentAtom);
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

  const handleOnSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: event.target.value } }));
    changeData('P02', 1, 1, event.target.value);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleOnSubmit}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p02.isSubmitted && !isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull flexDirection='column' paddingTop='20px'>
        <Box width='920px'>
          <TextView title='보기' height='106px'>
            <Image src='/L01/C08/A03/HE1-L01-C08-A03.jpg' width='636px' alt='' ariaDescribedby='example_desc' />
            <Box type='hidden' id='example_desc'>
              They set up a device which required two individuals to pull both ends of a rope at the same time. 빨간 색자 which가 이끄는 절이 which
              앞의 파란 색자 a device를 수식하는 모습을 나타낸다.
            </Box>
          </TextView>
        </Box>
        <Box useFull marginTop='30px'>
          <Box vAlign='center' padding='4px 12px'>
            <Typography>2.</Typography>
            <Typography textDecoration='underline' useGap={false}>
              Anyone loves to sing
            </Typography>
            <Typography>can take part in the singing contest.</Typography>
          </Box>
          <Box vAlign='center' marginTop='10px' padding='4px 12px'>
            <StyledSvg src={RightArrowIcon} type={ESvgType.IMG} />
            <Input
              width='400px'
              textAlign='start'
              value={cardData.p02.answer}
              onChange={handleInputOnChange}
              maxLength={50}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답 입력란'
              readOnly={cardData.p02.isSubmitted}
              status={
                !cardData.p02.answer
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            <Typography>can take part in the singing </Typography>
          </Box>
          <Box vAlign='center' padding='4px 12px'>
            <Typography>contest.</Typography>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px' height='48px' padding='4px 12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p02.solution.join(', ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const StyledSvg = styled(SvgIcon)`
  margin-right: 8px;
`;
