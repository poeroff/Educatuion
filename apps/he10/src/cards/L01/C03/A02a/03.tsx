import {
  Box,
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  Typography,
  Input,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  List,
  EStyleButtonTypes,
  BoxWrap,
  Question,
  SvgIcon,
} from '@maidt-cntn/ui';
import { useState, useEffect } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C03A02a } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A02a);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    text: 'Find a part that is NOT true according to the dialogue and correct it.',
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-02.mp3',
    captionSrc: '/L01/C03/A02/HE1-L01-C03-A02-02.srt',
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
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, errorAnswers: [value, prev.p03.errorAnswers[1], prev.p03.errorAnswers[2]] } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, errorAnswers: [prev.p03.errorAnswers[0], value, prev.p03.errorAnswers[2]] } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, errorAnswers: [prev.p03.errorAnswers[0], prev.p03.errorAnswers[1], value] } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, correctAnswers: [value, prev.p03.correctAnswers[1], prev.p03.correctAnswers[2]] } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, correctAnswers: [prev.p03.correctAnswers[0], value, prev.p03.correctAnswers[2]] } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, correctAnswers: [prev.p03.correctAnswers[0], prev.p03.correctAnswers[1], value] } }));
    }
    changeData('P03', 1, subKey, value);
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.errorAnswers[0],
              isAnswer: false,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.errorAnswers[1],
              isAnswer: false,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.errorAnswers[2],
              isAnswer: false,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p03.correctAnswers[0],
              isAnswer: false,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p03.correctAnswers[1],
              isAnswer: false,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p03.correctAnswers[2],
              isAnswer: false,
            },
          ],
        },
      ];
      submitData('P03', userSubmission);
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
            errorAnswers: [
              userSubmissionList[0].inputData[0]?.value || cardData.p03.errorAnswers[0],
              userSubmissionList[0].inputData[1]?.value || cardData.p03.errorAnswers[1],
              userSubmissionList[0].inputData[2]?.value || cardData.p03.errorAnswers[2],
            ],
            correctAnswers: [
              userSubmissionList[0].inputData[3]?.value || cardData.p03.correctAnswers[0],
              userSubmissionList[0].inputData[4]?.value || cardData.p03.correctAnswers[1],
              userSubmissionList[0].inputData[5]?.value || cardData.p03.correctAnswers[2],
            ],
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      vAlign='flex-start'
      useExtend
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p03.errorAnswers.every(isNotEmptyString) && cardData.p03.correctAnswers.every(isNotEmptyString))}
      submitBtnColor={
        cardData.p03.errorAnswers.every(isNotEmptyString) && cardData.p03.correctAnswers.every(isNotEmptyString)
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box alignContent='center' hAlign='center'>
        <Box width='910px' padding='20px' background='white' useRound>
          <Box marginTop='12px'>(1) The boy won the singing competition.</Box>
          <Box marginTop='12px'>(2) The girl danced at the school festival last year.</Box>
          <Box marginTop='12px'>(3) The speakers feel so sorry for their team members.</Box>
        </Box>
      </Box>

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
                  ariaLabel={index + '번 입력란'}
                  value={cardData.p03.errorAnswers[index - 1]}
                  readOnly={cardData.p03.isSubmitted}
                  width='410px'
                  placeholder='내용을 넣어 주세요.'
                  onChange={e => {
                    handleChange(index, e.target.value);
                  }}
                />
                <SvgIcon src={arrowRight} size='38px' />
                <Input
                  ariaLabel={index + '번 입력란'}
                  value={cardData.p03.correctAnswers[index - 1]}
                  readOnly={cardData.p03.isSubmitted}
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
              {value.num} {cardData.p03.errorSolutions[index]}, {cardData.p03.correctSolutions[index]}
            </Box>
          ))}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
