import {
  Box,
  TMainHeaderInfoTypes,
  ESvgType,
  TextView,
  Input,
  Typography,
  Image,
  SvgIcon,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  EStyleFontSizes,
  PinchZoom,
  ETagLine,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { ChangeEventHandler, useEffect, useState } from 'react';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04C08A05a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageNumber = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A05a);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Point 2 : Practice',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Combine the two sentences using the structure above.',
  };
  const udl = [
    '이미지에는 두 개의 문장이 퍼즐 조각처럼 나뉘어져 있다:',
    '첫 번째 조각: "There\'s a risk"는 "a risk"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.',
    '두 번째 조각: "that"는 빨간색으로 강조되어 있다.',
    '세 번째 조각: "organizations could access personal data without permission."는 "organizations could access personal data without permission."가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.',
  ];

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
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
          },
        ],
      },
    ];
    submitData(pageNumber, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: event.target.value } }));
    changeData(pageNumber, 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <Box>
        <TextView title='보기'>
          <PinchZoom>
            <Image src={'/L04/C08/A05/HE2-L04-C08-A05-P01.jpg'} width={'636px'} alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {udl.map((item, index) => (
                <p key={`img_desc_${index}`}>{item}</p>
              ))}
            </Box>
          </PinchZoom>
        </TextView>
      </Box>
      <Box marginTop='24px'>
        <Box>
          <StyledTypography>2. He has a dream. His dream is that one day he will open a restaurant named after himself.</StyledTypography>
        </Box>
        <Box hAlign={'flex-start'}>
          <StyledTypography>
            <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Input
              textAlign='start'
              ariaLabel='답 입력란'
              placeholder={'내용을 넣어 주세요.'}
              value={cardData.p02.answer}
              onChange={handleInputOnChange}
              maxLength={100}
              width='740px'
              inputSize='x-small'
              readOnly={cardData.p02.isSubmitted}
              status={!isNotEmptyString(cardData.p01.answer) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            />
          </StyledTypography>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {cardData.p02.solution}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const StyledTypography = styled(Typography)`
  display: block;
  position: relative;
  max-width: 100%;
`;
const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
