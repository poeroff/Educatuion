import {
  Box,
  List,
  BoxWrap,
  IAudioPlayerProps,
  BottomSheet,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { IProps } from '.';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C02A03a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import styled from '@emotion/styled';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = ({ headerInfo }: IProps) => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A03a);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    text: 'Listen to the dialogue and correct the underlined part in each sentence.',
    mark: 'none',
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE1-L02-C02-A03-02.mp3',
    captionSrc: '/L02/C02/A03/HE1-L02-C02-A03-02.srt',
  };
  const contents: React.ReactNode[] = [
    <Typography>
      <Indent />
      (1) The boy thinks <Underline>novels are a bit boring and prefers poems</Underline>.
    </Typography>,
    <Typography>
      <Indent />
      (2) The girl says the interpretation of poetry <Underline>cannot differ from person to person</Underline>.
    </Typography>,
    <Typography>
      <Indent />
      (3) The speakers are going to attend a poetry reading event <Underline>this Sunday</Underline>.
    </Typography>,
  ];

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

  const onGrade = () => {
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
              value: cardData.p03.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
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

  const getAnswer = (index: number) => {
    if (index === 1) {
      return cardData.p03.answer1;
    } else if (index === 2) {
      return cardData.p03.answer2;
    } else if (index === 3) {
      return cardData.p03.answer3;
    }
    return '';
  };
  const getSolution = (index: number) => {
    if (index === 1) {
      return cardData.p03.solution1;
    } else if (index === 2) {
      return cardData.p03.solution2;
    } else if (index === 3) {
      return cardData.p03.solution3;
    }
    return '';
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={cardData.p03.answer1 === '' || cardData.p03.answer2 === '' || cardData.p03.answer3 === ''}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
      vAlign='flex-start'
    >
      <BoxWrap>
        <List data={contents}>
          {({ value, index = 1 }) => (
            <Box marginLeft={'48px'} marginTop={'20px'}>
              <Typography>{value}</Typography>
              <Input
                value={getAnswer(index)}
                onChange={e => handleChange(index, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                width='80%'
                maxLength={100}
                readOnly={cardData.p03.isSubmitted}
                textAlign='left'
                ariaLabel={`${index}번 답 입력란`}
              ></Input>
            </Box>
          )}
        </List>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>(1) {getSolution(1)}</Box>
          <Box marginTop='12px'>(2) {getSolution(2)}</Box>
          <Box marginTop='12px'>(3) {getSolution(3)}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Underline = styled.span`
  text-decoration: underline;
`;
const Indent = styled.span`
  margin-left: -48px;
`;

export default P03;
