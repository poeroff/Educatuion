import {
  Box,
  Label,
  Radio,
  TMainHeaderInfoTypes,
  PinchZoom,
  Image,
  EImageType,
  BoxWrap,
  EStyleShadowedButtonTypes,
  Typography,
  BottomSheet,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C05A03 } from '@/cards/L03/C05/A03/store';
import { studentAtom } from '@/stores/student';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C05A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the word to fill in the blank.',
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
  };

  interface IImageInfo {
    label: string;
    imgSrc: string;
    imgAlt: string;
  }

  const imgs: IImageInfo[] = [
    { label: 'vibrate', imgSrc: '/L03/C05/A03/HE1-L03-C05-A03-04.jpg', imgAlt: '1. 휴대전화에 전화가 와서 진동하고 있다.' },
    { label: 'transmit', imgSrc: '/L03/C05/A03/HE1-L03-C05-A03-03.jpg', imgAlt: '2. 송전탑에서 전파를 보내고 있다.' },
    { label: 'interfere', imgSrc: '/L03/C05/A03/HE1-L03-C05-A03-05.jpg', imgAlt: '3. 차례로 넘어지는 도미노를 손으로 막고 있다.' },
  ];

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: index.toString() } }));
    changeData('P05', 1, 1, index.toString());
  };

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p05.answer, cardData.p05.solution);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P05', userSubmission, isCorrect);
  };

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitDisabled={!isNotEmptyString(cardData.p05.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p05.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
    >
      <Box useFull hAlign='center' padding='10px 0px'>
        <Box useFull hAlign='center' flexDirection='column'>
          <Box width='926px' display='flex' justifyContent='center' padding='20px' background='white' useRound>
            I set my phone to <CustomUnderline width={'130px'} /> before watching a movie in the theater.
          </Box>
        </Box>
      </Box>
      <BoxWrap>
        {imgs.map((item, index) => {
          const adjustedIndex = index + 1;
          return (
            <Radio
              key={adjustedIndex}
              name={'radio-question-A'}
              value={adjustedIndex === Number(cardData.p05.answer)}
              onClick={() => handleRadioClick(adjustedIndex)}
              readOnly={cardData.p05.isSubmitted}
            >
              <ShadowedButton
                key={adjustedIndex}
                type='img'
                state={
                  adjustedIndex === Number(cardData.p05.answer)
                    ? cardData.p05.isSubmitted
                      ? adjustedIndex === Number(cardData.p05.solution)
                        ? EStyleShadowedButtonTypes.PRIMARY
                        : EStyleShadowedButtonTypes.WARNING
                      : EStyleShadowedButtonTypes.PRIMARY
                    : EStyleShadowedButtonTypes.DEFAULT
                }
                tabIndex={0}
              >
                <Box>
                  <Label value={adjustedIndex} /> {item.label}
                </Box>
                <Box marginTop='8px'>
                  <PinchZoom>
                    <Image width='268px' height='179px' src={item.imgSrc} alt={item.imgAlt} type={EImageType.IMG} />
                  </PinchZoom>
                </Box>
              </ShadowedButton>
            </Radio>
          );
        })}
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
            <Typography>{cardData.p05.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;

const CustomUnderline = styled.span<{ width: string }>`
  position: relative;
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
  width: ${({ width }) => width || 'auto'};
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px; /* 밑줄의 위치 조정 */
    height: 2px; /* 밑줄의 굵기 */
    background-color: black; /* 밑줄의 색상 */
    width: ${({ width }) => width || '100%'};
  }
`;
