import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  Box,
  IAudioPlayerProps,
  TMainHeaderInfoTypes,
  Image,
  Typography,
  IQuestionProps,
  Dropdown,
  BoxWrap,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C02A08b } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A08b);
  const [isShow, setIsShow] = useState<boolean>(false);
  const dropArr1: string[] = ['2', '5'];
  const dropArr2: string[] = ['Kung Fu Panda', 'Wonder Woman'];
  const dropAnswer = (
    <Box key={1} marginTop='12px'>
      {cardData.p01.solution1}, {cardData.p01.solution2}
    </Box>
  );

  const imageSrc = '/L01/C02/A08a/ME1-L01-C02-A08a-P01.jpg';
  const imageAlt = '교복을 입은 여학생이 인사하고 있는 모습';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen More',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A08/ME1-L01-C02-A08-P01.mp3',
    captionSrc: '/L01/C02/A08/ME1-L01-C02-A08-P01.srt',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Box marginRight='10px'>
        <Typography useGap={false} fontSize={'var(--font-size-32)'} lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
          1. Listen and Choose
        </Typography>
        <Typography>잘 듣고, 유나에 관해 알맞은 것을 표시해 봅시다.</Typography>
      </Box>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, [saveData]);

  const handleDropdownClick = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, index, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Image src={imageSrc} alt={imageAlt} width='100%' />
        <Box position='absolute' right={150} bottom={130}>
          <Box vAlign='center' padding='0 12px' paddingBottom={20}>
            <Circle />
            <Typography>유나는 </Typography>
            <Dropdown
              isError={cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer1, cardData.p01.solution1)}
              readOnly={cardData.p01.isSubmitted}
              width='264px'
              dropdownList={dropArr1}
              selectedValue={cardData.p01.answer1}
              onClick={value => handleDropdownClick(1, value || '')}
              ariaLabel={'답란1'}
            />
            <Typography> 반이다.</Typography>
          </Box>
          <Box vAlign='center' padding='0 12px'>
            <Circle />
            <Typography>유나가 가장 좋아하는 영화는 </Typography>
          </Box>
          <Box vAlign='center' padding='0 12px'>
            <Italic>
              <Dropdown
                isError={cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer2, cardData.p01.solution2)}
                readOnly={cardData.p01.isSubmitted}
                width='264px'
                dropdownList={dropArr2}
                selectedValue={cardData.p01.answer2}
                onClick={value => handleDropdownClick(2, value || '')}
                ariaLabel={'답란2'}
              />
            </Italic>
            <Typography>이다. </Typography>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            {dropAnswer}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const Circle = styled.div`
  margin: 16px;

  border-radius: 50%;
  background-color: var(--color-black);

  position: relative;
  top: -5px;
  min-width: inherit !important;
  min-height: inherit !important;
  width: 12px !important;
  height: 12px !important;
`;

const Italic = styled.div`
  font-style: italic !important;
`;
