import { ChangeEventHandler, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  SvgIcon,
  EStyleButtonTypes,
  BoxWrap,
  ESvgType,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A03 } from './store';
import { studentAtom } from '@/stores/student';
import { useRecoilState, useRecoilValue } from 'recoil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };
  const questionInfo = {
    text: 'Find and correct grammatical errors in the underlined parts.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
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
        },
      ],
    },
  ];

  const handleOnSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p03.answer, cardData.p03.solution);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isCorrect);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: event.target.value } }));
    changeData('P03', 1, 1, event.target.value);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleOnSubmit}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p03.isSubmitted && !isNotEmptyString(cardData.p03.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p03.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
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
          <Box marginBottom='10px' padding='4px 12px'>
            <Typography>3. Students bought the graphic novel</Typography>
            <Typography textDecoration='underline' useGap={false}>
              that their teacher recommended
            </Typography>
            <Box padding='4px 12px'>
              <Typography textDecoration='underline' useGap={false}>
                it
              </Typography>
              <TextPartRight>.</TextPartRight>
            </Box>
          </Box>

          <Box vAlign='center' padding='4px 12px'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Typography>Students bought the graphic novel</Typography>
            <Input
              width='380px'
              textAlign='start'
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답 입력란'
              value={cardData.p03.answer}
              onChange={handleInputOnChange}
              maxLength={50}
              readOnly={cardData.p03.isSubmitted}
              status={
                !cardData.p03.answer
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && !cardData.p03.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            <TextPartRight>.</TextPartRight>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px' height='48px' padding='4px 12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p03.solution.join(', ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const TextPartRight = styled(Typography)`
  padding-left: 4px;
  padding-right: 0;
`;
