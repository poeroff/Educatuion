import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  PinchZoom,
  List,
  SvgIcon,
  EImageType,
  Image,
  Question,
  IAudioPlayerProps,
  IQuestionProps,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C04A02 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A02);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Find the three parts that are NOT true according to the ad and correct them.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A02/HE2-L02-C04-A02.mp3',
    captionSrc: '/L02/C04/A02/HE2-L02-C04-A02.srt',
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const data = [{ num: '(1)' }, { num: '(2)' }, { num: '(3)' }];

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, errorAnswers: [value, prev.p02.errorAnswers[1], prev.p02.errorAnswers[2]] } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, errorAnswers: [prev.p02.errorAnswers[0], value, prev.p02.errorAnswers[2]] } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, errorAnswers: [prev.p02.errorAnswers[0], prev.p02.errorAnswers[1], value] } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, correctAnswers: [value, prev.p02.correctAnswers[1], prev.p02.correctAnswers[2]] } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, correctAnswers: [prev.p02.correctAnswers[0], value, prev.p02.correctAnswers[2]] } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, correctAnswers: [prev.p02.correctAnswers[0], prev.p02.correctAnswers[1], value] } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const handleSubmit = () => {
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
              value: cardData.p02.errorAnswers[0],
              isAnswer: false,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.errorAnswers[1],
              isAnswer: false,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.errorAnswers[2],
              isAnswer: false,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.correctAnswers[0],
              isAnswer: false,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p02.correctAnswers[1],
              isAnswer: false,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p02.correctAnswers[2],
              isAnswer: false,
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
            errorAnswers: [
              userSubmissionList[0].inputData[0]?.value || cardData.p02.errorAnswers[0],
              userSubmissionList[0].inputData[1]?.value || cardData.p02.errorAnswers[1],
              userSubmissionList[0].inputData[2]?.value || cardData.p02.errorAnswers[2],
            ],
            correctAnswers: [
              userSubmissionList[0].inputData[3]?.value || cardData.p02.correctAnswers[0],
              userSubmissionList[0].inputData[4]?.value || cardData.p02.correctAnswers[1],
              userSubmissionList[0].inputData[5]?.value || cardData.p02.correctAnswers[2],
            ],
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      vAlign='flex-start'
      useExtend
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p02.errorAnswers.every(isNotEmptyString) && cardData.p02.correctAnswers.every(isNotEmptyString))}
      submitBtnColor={
        cardData.p02.errorAnswers.every(isNotEmptyString) && cardData.p02.correctAnswers.every(isNotEmptyString)
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull height='239px' width='970px'>
        <Box useFull hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image
              type={EImageType.IMG}
              src={'/L02/C04/A02/HE2-L02-C04-A02-02.jpg'}
              alt='녹색의 화장품 3개가 세트로 구성되어 놓여져있고, Best라고 쓰여진 광고'
              width='699px'
              height='239px'
            />
          </PinchZoom>
        </Box>
      </BoxWrap>

      <BoxWrap useFull height='fit-content'>
        <Box useFull>
          <Box hAlign='center' useFull width='447px'>
            <Typography>errors</Typography>
          </Box>
        </Box>
        <Box useFull>
          <Box hAlign='center' useFull width='447px'>
            <Typography>corrections</Typography>
          </Box>
        </Box>
      </BoxWrap>

      <Box vAlign='center' marginTop='9px'>
        <List data={data}>
          {({ value, index = 0 }) => (
            <Box vAlign='center' key={`box-${index}`}>
              <Box width={70}>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
              </Box>
              <ItemWrap>
                <Input
                  ariaLabel={index + '번 오류 입력란'}
                  value={cardData.p02.errorAnswers[index - 1]}
                  readOnly={cardData.p02.isSubmitted}
                  maxLength={100}
                  width='410px'
                  placeholder='내용을 넣어 주세요.'
                  onChange={e => {
                    handleChange(index, e.target.value);
                  }}
                />
                <SvgIcon src={arrowRight} size='38px' />
                <Input
                  ariaLabel={index + '번 수정사항 입력란'}
                  value={cardData.p02.correctAnswers[index - 1]}
                  readOnly={cardData.p02.isSubmitted}
                  maxLength={100}
                  width='410px'
                  placeholder='내용을 넣어 주세요.'
                  onChange={e => {
                    handleChange(index + 3, e.target.value);
                  }}
                />
              </ItemWrap>
            </Box>
          )}
        </List>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          {data.map((value, index) => (
            <Box marginTop='12px' key={`solution-${index}`}>
              {value.num} {cardData.p02.errorSolutions[index]}
              <SvgIcon src={arrowRight} size='38px' /> {cardData.p02.correctSolutions[index]}
            </Box>
          ))}
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
  & > svg {
    flex-shrink: 0; /* ensure the arrow doesn't shrink */
  }
  width: 100%; /* Ensure it takes full width */
`;

const StyledInput = styled(Input)`
  width: 410px;
  flex: none; /* ensure the input doesn't grow */
  box-sizing: border-box;
`;

export default P02;
