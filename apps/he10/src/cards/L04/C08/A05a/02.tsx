import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ESvgType,
  ETagLine,
  Image,
  Input,
  IQuestionProps,
  PinchZoom,
  SvgIcon,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04C08A05a } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const answer = 'Andrew not only exercises regularly but also maintains a healthy diet.';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Combine the two sentences using the given expressions.',
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
      ],
    },
  ];

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
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
      submitData('P02', userSubmission);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
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
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer)}
      onSubmit={onSubmitText}
    >
      <Box>
        <TextView title='보기'>
          <PinchZoom>
            <Image src={'/L04/C08/A05/HE1-L04-C08-A05-P01.jpg'} width={'806px'} alt='' />
          </PinchZoom>
          <Box type='hidden'>
            {`
             이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:
             첫 번째 조각: "Reusable cups"는 검은색으로 표시되어 있다.
             두 번째 조각: "not only"는 빨간색으로 강조되어 있다.
             세 번째 조각: "have an appealing appearance"는 "have"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
             네 번째 조각: "but (also)"는 빨간색으로 강조되어 있다.
             다섯 번째 조각: "preserve the taste of the coffee."는 "preserve"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
            `}
          </Box>
        </TextView>
      </Box>
      <Box marginTop='30px'>
        <Box>
          <Typography useGap={false}>2. Andrew exercises regularly. He also maintains a healthy diet. </Typography>
          <Typography>(not only ~ but also …)</Typography>
        </Box>
        <Box hAlign={'flex-start'}>
          <Typography>
            <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Input
              width='780px'
              textAlign='start'
              maxLength={answer.length + 10}
              placeholder={'내용을 넣어 주세요.'}
              ariaLabel='답란'
              inputSize={'x-small'}
              value={cardData.p02.answer}
              onChange={handleInputChange}
              readOnly={cardData.p02.isSubmitted}
            />
          </Typography>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              Andrew not only exercises regularly but also maintains a healthy diet.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
