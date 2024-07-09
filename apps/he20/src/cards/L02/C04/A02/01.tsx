import {
  Box,
  Image,
  TMainHeaderInfoTypes,
  IQuestionProps,
  PinchZoom,
  Table,
  TR,
  TH,
  TBody,
  TD,
  Radio,
  List,
  IAudioPlayerProps,
  EStyleTableTypes,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  Typography,
  Label,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L02C04A02 } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [show, setShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L02C04A02);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };
  const questionInfo: IQuestionProps = {
    text: '1. Choose the age group and skin type at which the advertisement is aimed',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A02/HE2-L02-C04-A02.mp3',
    captionSrc: '/L02/C04/A02/HE2-L02-C04-A02.srt',
  };

  const ageData = [
    {
      text: 'Teenagers',
    },
    {
      text: 'Adults',
    },
    {
      text: 'Seniors',
    },
  ];

  const skinTypeData = [
    {
      text: 'Dry & Sensitive',
    },
    {
      text: 'Combination',
    },
    {
      text: 'Oily & Sensitive',
    },
  ];

  const correctAnswer = `(1) Teenagers\n(2) Oily & Sensitive`;

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const handleRowClick = (index: number, questionIndex: number) => {
    if (questionIndex === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: index } }));
      changeData('P01', 1, 1, index);
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: index } }));
      changeData('P01', 1, 2, index);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!show);
    } else {
      const isCorrect1 = cardData.p01.answer1 === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2 === cardData.p01.solution2;
      const isCorrect = isCorrect1 && isCorrect2;

      setCardData(prev => ({
        ...prev,
        p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'NUMBER',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect: isCorrect,
        },
      ];

      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      try {
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
      } catch (error) {
        console.error('Error fetching user submissions:', error);
      }
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (show ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p01.answer1 === 0 || cardData.p01.answer2 === 0}
      submitBtnColor={
        cardData.p01.answer1 !== 0 && cardData.p01.answer2 !== 0
          ? show
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
    >
      <Box hAlign='center'>
        <PinchZoom>
          <Image alt='태블릿으로 Green Plus Skin-care Set 이라고 쓰여진 화장품 광고를 보고 있는 모습' src={'/L02/C04/A02/HE2-L02-C04-A02-1.jpg'} />
        </PinchZoom>
      </Box>
      <Box marginTop='20px'>
        <Table color={EStyleTableTypes.SECONDARY} sizes={['204px', 'auto']}>
          <TBody>
            <TR>
              <TH scope='row'>(1) Age</TH>
              <TD vAlign='middle'>
                <List
                  align='horizontal'
                  gap={8}
                  data={ageData}
                  row={({ value, index = 1 }) => (
                    <Radio
                      type={'circle'}
                      align='horizontal'
                      name={'radio-age'}
                      label={value?.text}
                      ariaLabel={index + '번 나이 문항'}
                      value={index === cardData.p01.answer1}
                      onClick={() => handleRowClick(index, 1)}
                      isError={cardData.p01.isSubmitted && cardData.p01.answer1 !== cardData.p01.solution1}
                      readOnly={cardData.p01.isSubmitted}
                    ></Radio>
                  )}
                />
              </TD>
            </TR>
            <TR>
              <TH scope='row'>(2) Skin Type</TH>
              <TD vAlign='middle'>
                <List
                  align='horizontal'
                  gap={8}
                  data={skinTypeData}
                  row={({ value, index = 1 }) => (
                    <Radio
                      type={'circle'}
                      align='horizontal'
                      name={'radio-skin-type'}
                      label={value?.text}
                      ariaLabel={index + '번 스킨 타입 문항 보기'}
                      value={index === cardData.p01.answer2}
                      onClick={() => handleRowClick(index, 2)}
                      isError={cardData.p01.isSubmitted && cardData.p01.answer2 !== cardData.p01.solution2}
                      readOnly={cardData.p01.isSubmitted}
                    ></Radio>
                  )}
                />
              </TD>
            </TR>
          </TBody>
        </Table>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height={'40%'} show={show}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{correctAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
