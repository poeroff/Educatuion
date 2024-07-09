import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  List,
  TMainHeaderInfoTypes,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C09A03 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C09A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', '', '', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mePractice',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '주어진 말을 활용하여 화면 속 인물들의 행동을 묘사해 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const imageInfo = {
    src: `/L02/C09/A03/ME1-L02-C09-A03-P01.jpg`,
    alt: (
      <>
        <p>1번 민호가 노래를 부르고 있다.</p>
        <p>2번 Luna가 수영하고 있다.</p>
        <p>3번 Sunny가 게임을 하고 있다.</p>
        <p>4번 Nuri와 Jay가 춤추고 있다.</p>
      </>
    ),
  };

  const data: React.ReactNode[] = [
    <>These are my friends. What are they doing?</>,
    <>(1) Minho </>,
    <> a song.</>,
    <>(2) Luna </>,
    <>.</>,
    <>(3) Sunny </>,
    <> a video game.</>,
    <>(4) Nuri and Jay </>,
    <>.</>,
  ];

  const suggestion: string[] = ['sing', 'swim', 'play', 'dance'];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: updatedAnswers } }));
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p01.answer.every((a, idx = 0) => isAnswer(a, cardData.p01.solution[idx]));

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      useExtend
    >
      <Box hAlign='center' gap={24}>
        <BoxWrap width='370px'>
          <Box hAlign='center' useFull>
            <Image src={imageInfo.src} ariaDescribedby='img_desc' height='418px' />
            <Box type='hidden' id={'img_desc'}>
              {imageInfo.alt}
            </Box>
          </Box>
        </BoxWrap>
        <BoxWrap marginTop={0} flexDirection='column' flex={1}>
          <Box>
            <Typography>{data[0]}</Typography>
          </Box>
          <Box>
            <List data={cardData.p01.answer} align='horizontal' gap={0}>
              {({ index = 1 }) => (
                <Typography>
                  {index % 2 === 1 ? data[index] : ''}
                  <Input
                    tabIndex={100 + index}
                    width={index % 2 === 1 ? '70px' : '150px'}
                    maxLength={100}
                    value={cardData.p01.answer[index - 1]}
                    onChange={e => handleChangeValue(e, index - 1)}
                    ariaLabel={index + '번 답안'}
                    readOnly={cardData.p01.isSubmitted}
                    status={
                      cardData.p01.answer[index - 1] === ''
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[index - 1], cardData.p01.solution[index - 1])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                  {index % 2 === 0 ? data[index] : ''}
                </Typography>
              )}
            </List>
          </Box>
          <Box marginRight={24} marginTop={10} height={70}>
            <TextView title='제시어'>
              <Box width='400px' display='flex' justifyContent='space-around'>
                {suggestion.map((sugg, idx) => (
                  <Typography key={'suggestion_' + idx} useGap={false}>
                    {sugg}
                  </Typography>
                ))}
              </Box>
            </TextView>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='10px'>
            {Array.from({ length: 4 }, (_, i) => (
              <Typography key={'solution_' + i} style={{ display: 'block' }}>
                ({i + 1}) {cardData.p01.solution[i * 2]} {cardData.p01.solution[i * 2 + 1]}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
