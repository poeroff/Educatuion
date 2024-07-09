import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C04A02 } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C04A02);
  const [isShow, setShow] = useState<boolean>(false);

  const pageNo = 'P03';

  const data = [
    'About the 40,000 cultural heritage piece on display',
    'Iconic treasures like the gold crown and pottery from Goryeo',
    'Special exhibition of items from the Vienna Museum of Art History',
  ];
  const data2 = ['No photography', 'No flash', 'Turn off mobile phones'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Check all that are mentioned in the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C04/A02/HE2-L03-C04-A02.mp3',
    captionSrc: '/L03/C04/A02/HE2-L03-C04-A02.srt',
  };

  const handleRadio = (index: number) => {
    const currentAnswer = Array.isArray(cardData.p03.answer) ? cardData.p03.answer : [];
    const newData = [...currentAnswer];
    newData[0] = index;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const handleRadio2 = (index: number) => {
    const currentAnswer = Array.isArray(cardData.p03.answer) ? cardData.p03.answer : [];
    const newData = [...currentAnswer];
    newData[1] = index;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: newData } }));
    changeData(pageNo, 1, 1, newData);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [-1, -1],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    } else {
      const isCorrect = cardData.p03.answer.every((val, index) => val === cardData.p03.solution[index]);

      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p03.answer[0] === -1 || cardData.p03.answer[1] === -1}
      submitBtnColor={
        cardData.p03.answer[0] === -1 || cardData.p03.answer[1] === -1
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box width='211px' padding='10px'>
          <Typography width='160px' weight='var(--font-weight-bold)' color='var(--color-blue-900)'>
            National Museum of Korea
          </Typography>
        </Box>
        <Box height='100%' width='calc(100% - 235px)'>
          <List
            data={data}
            row={({ value, index = 1 }) => (
              <BoxWrap alignItems='baseline'>
                <Radio
                  type={'circle'}
                  name={'radio-question-A'}
                  value={cardData.p03.answer[0] === index - 1}
                  onClick={() => handleRadio(index - 1)}
                  isError={cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]}
                  readOnly={cardData.p03.isSubmitted}
                />
                <Typography>{value}</Typography>
              </BoxWrap>
            )}
          />

          <Box marginTop='10px' display='flex'>
            <Typography width='130px' weight='var(--font-weight-bold)'>
              Notice :
            </Typography>

            <Box width='calc(100% - 129px)' marginLeft='8px'>
              <List
                align='horizontal'
                gap={0}
                data={data2}
                row={({ value, index = 1 }) => (
                  <BoxWrap alignItems='center'>
                    <Radio
                      type={'circle'}
                      name={'radio-question-B'}
                      value={cardData.p03.answer[1] === index - 1}
                      onClick={() => handleRadio2(index - 1)}
                      isError={cardData.p03.isSubmitted && cardData.p03.answer[1] !== cardData.p03.solution[1]}
                      readOnly={cardData.p03.isSubmitted}
                    />
                    <Typography style={{ marginLeft: '4px' }}>{value}</Typography>
                  </BoxWrap>
                )}
              />
            </Box>
          </Box>

          <Box marginTop='10px' hAlign='center'>
            <Typography weight='var(--font-weight-bold)' color='var(--color-grey-700)'>
              Enjoy our remarkable collection!
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box>
            <Typography>{`- ${data[cardData.p03.solution[0]]}`}</Typography>
            <Typography>{`- ${data2[cardData.p03.solution[1]]}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
      <BackgroundImage>
        <Image src={'/L03/C04/A02/HE2-L03-C04-A02-2.jpg'} alt='국립중앙박물관 전경' width='1000px' height='412px' />
      </BackgroundImage>
    </Container>
  );
};

const BackgroundImage = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  z-index: -1;
`;

export default P03;
