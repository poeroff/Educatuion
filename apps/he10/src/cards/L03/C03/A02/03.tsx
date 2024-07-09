import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  Image,
  BoxWrap,
  Scroll,
  EStyleFontSizes,
  Tag,
  ETagLine,
  IQuestionProps,
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { L03C03A02 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const vitePath = import.meta.env.VITE_CDN_PATH;
const backgroundImg = `${vitePath}/L03/C03/A02/HE1-L03-C03-A02-02-1.jpg`;

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02);
  const pageNo = 'P03';

  const [isShow, setShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
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
            isCorrect: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmitClick = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrectList = cardData.p03.solution.map((solution, idx) => {
        if (idx === 1) {
          const solutionArr = solution.split('/');
          if (solutionArr.every(val => !isAnswer(cardData.p03.answer[idx], val))) return false;
        } else {
          if (!isAnswer(cardData.p03.answer[idx], solution)) return false;
        }
        return true;
      });
      const isCorrect = isCorrectList.every(val => val);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswer = cardData.p03.answer.map((val, idx) => (idx === index ? truncateToMaxBytes(value) : val));
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: updatedAnswer } }));
    changeData(pageNo, 1, 1, updatedAnswer);
  };

  const isNotActive = () => {
    if (cardData.p03.answer.some(val => val == '')) return true;
    else return false;
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p03.isSubmitted) {
      return isNotActive() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY;
    }
  };

  const isCorrect = (index: number) => {
    if (index === 1) {
      const solutionArr = cardData.p03.solution[index].split('/');
      if (solutionArr.every(val => !isAnswer(cardData.p03.answer[index], val))) return false;
    } else {
      if (!isAnswer(cardData.p03.answer[index], cardData.p03.solution[index])) return false;
    }
    return true;
  };

  const getInputStatus = (index: number) => {
    return isNotEmptyString(cardData.p03.answer[index])
      ? isCorrect(index)
        ? InputStatus.ENABLE
        : cardData.p03.isSubmitted && InputStatus.ERROR
      : InputStatus.DEFAULT;
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks using information from the talk.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.mp3',
    captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.srt',
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      onSubmit={handleSubmitClick}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isNotActive()}
      submitBtnColor={getSubmitBtnColor()}
    >
      <BackgroundWrap>
        <Box hAlign='center' paddingTop='15px' marginBottom={20}>
          <Typography useGap={false} weight='var(--font-weight-extraBold)'>
            Welcome to the Whispering Gallery
          </Typography>
        </Box>
        <BoxWrap>
          <Box hAlign='center' vAlign='center' padding={15}>
            <Image src={'/L03/C03/A02/HE1-L03-C03-A02-02-2.jpg'} alt='세인트 폴 성당의 위스퍼링 갤러리 내부의 모습' width='300px' height='200px' />
          </Box>
          <Scroll height='100%' tabIndex={0}>
            <Typography useGap={false}>
              The Whispering Gallery is a circular wall (1)
              <Input
                textAlign='left'
                width='240px'
                maxLength={2000}
                inputSize='x-small'
                placeholder='내용을 넣어 주세요.'
                ariaLabel='1번 답란'
                status={getInputStatus(0)}
                onChange={e => handleInputChange(0, e.target.value)}
                value={cardData.p03.answer[0]}
                readOnly={cardData.p03.isSubmitted}
              />{' '}
              the dome of St. Paul’s Cathedral in London. When you whisper on one side, your speech can be heard on the (2)
              <Input
                minWidth='240px'
                maxLength={2000}
                inputSize='x-small'
                placeholder='내용을 넣어 주세요.'
                ariaLabel='2번 답란'
                status={getInputStatus(1)}
                onChange={e => handleInputChange(1, e.target.value)}
                value={cardData.p03.answer[1]}
                readOnly={cardData.p03.isSubmitted}
              />
              side because the sound waves (3)
              <Input
                minWidth='240px'
                maxLength={2000}
                inputSize='x-small'
                placeholder='내용을 넣어 주세요.'
                ariaLabel='3번 답란'
                status={getInputStatus(2)}
                onChange={e => handleInputChange(2, e.target.value)}
                value={cardData.p03.answer[2]}
                readOnly={cardData.p03.isSubmitted}
              />{' '}
              Along the curved wall. Try it out for yourself !
            </Typography>
          </Scroll>
        </BoxWrap>
      </BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              under, other/opposite, travel
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div`
  min-height: 400px;
  width: 100%;
  background: center / cover no-repeat url('${backgroundImg}');
`;

export default P03;
