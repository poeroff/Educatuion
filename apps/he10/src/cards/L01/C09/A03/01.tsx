import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  ETextViewColor,
  Textarea,
  IQuestionProps,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { ChangeEvent, useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import Pen from '@maidt-cntn/assets/icons/pen_color.svg';
import Help from '@maidt-cntn/assets/icons/help_circle_contained.svg';
import arrowRight from '@maidt-cntn/assets/icons/arrow_right_template.svg';

import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L01C09A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Write and Share',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Ask your partner about their problems and think about helpful advice for them.',
    size: 'small',
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const submissionData: inputDatasType[] = cardData.p01.answer.map((answer, index) => {
      return {
        subKey: index + 1,
        type: 'TEXT',
        value: answer,
      };
    });
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: submissionData,
      },
    ];
    submitData('P01', userSubmission);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newAnswer = cardData.p01.answer.map((val, idx) => (idx === index ? event.target.value : val));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newAnswer } }));
    changeData('P01', 1, index + 1, event.target.value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData.map((item: inputDatasType) => item.value) || cardData.p01.answer,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      submitDisabled={cardData.p01.isSubmitted || cardData.p01.answer.some(answer => !isNotEmptyString(answer))}
      submitBtnColor={
        cardData.p01.isSubmitted || cardData.p01.answer.some(answer => !isNotEmptyString(answer))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap useFull height='350px'>
        <Box useFull>
          <TextView type={ETextViewColor.SKYBLUE} title={'My Partner’s Problem'} icon={Help} hAlign='center'>
            <Box width='100%' height='100%'>
              <Textarea
                placeholder='내용을 넣어 주세요.'
                value={cardData.p01.answer[0]}
                onChange={event => {
                  handleChange(event, 0);
                }}
                name='value1'
                ariaLabel='첫 번째 답 입력란'
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
          </TextView>
        </Box>

        <Box useFull>
          <TextView type={ETextViewColor.YELLOW} title={'My Advice'} height='100%' isBorder={false} icon={Pen} vAlign='start'>
            <Box width='100%' marginTop='12px'>
              <Input
                width='100%'
                onChange={event => {
                  handleChange(event, 1);
                }}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='두 번째 답 입력란'
                value={cardData.p01.answer[1]}
                maxLength={100}
                name='value2'
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
            <Box vAlign='center' marginTop='24px'>
              <ArrowImg src={arrowRight} alt='오른쪽 가르키는 화살표' />
              <div style={{ width: '250px' }}>
                <Typography>This will help you</Typography>
              </div>
              <Input
                width='140px'
                onChange={event => {
                  handleChange(event, 2);
                }}
                placeholder=''
                ariaLabel='세 번째 답 입력란'
                value={cardData.p01.answer[2]}
                name='value3'
                readOnly={cardData.p01.isSubmitted}
              />
            </Box>
          </TextView>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;

const ArrowImg = styled.img`
  width: 30px;
  height: 30px;
`;
