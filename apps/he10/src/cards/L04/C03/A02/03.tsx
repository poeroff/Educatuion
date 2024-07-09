import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  SvgIcon,
  EImageType,
  Image,
  Question,
  IAudioPlayerProps,
  InputStatus,
  EStyleButtonTypes,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02);
  const pageNo = 'P03';

  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Find a part that is NOT true according to the talk and correct it.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.mp3',
    captionSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
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
      const isCorrect = cardData.p03.answer.every((val, idx) => isAnswer(val, cardData.p03.solution[idx]));
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

  const getInputStatus = (index: number) => {
    return isNotEmptyString(cardData.p03.answer[index])
      ? isAnswer(cardData.p03.answer[index], cardData.p03.solution[index])
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={handleSubmitClick}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      audioInfo={audioInfo}
      submitDisabled={isNotActive()}
      submitBtnColor={getSubmitBtnColor()}
    >
      <BoxWrap useFull height='185px' width='950px'>
        <Box useFull hAlign='flex-start'>
          <Image
            type={EImageType.IMG_BG}
            src={'/L04/C03/A02/HE1-L04-C03-A02-02-2.jpg'}
            alt='Water Collecting King이라는 서비스 이름이 쓰여있는 대형 트럭'
            width='100%'
            height='420px'
          >
            <BoxWrap display='flex' marginTop='100px'>
              <Box vAlign='flex-start' width='100%' margin='10px 20px'>
                <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-yellow-600)' size={EStyleFontSizes['MEDIUM']}>
                  Waste Collecting King
                </Typography>
              </Box>
              <Box hAlign='end' width='100%' margin='5px 20px'>
                <Typography
                  weight='var(--font-weight-bold)'
                  color='var(--color-green-600)'
                  size={EStyleFontSizes['X-MEDIUM']}
                  style={{ textAlign: 'end' }}
                  usePre
                >
                  {`Home Appliance \n Recycling Pick-up Service`}
                </Typography>
              </Box>
            </BoxWrap>
            <BoxWrap flexDirection='column'>
              <Box vAlign='baseline' margin='0 20px'>
                <Typography weight='var(--font-weight-bold)' size={EStyleFontSizes['MEDIUM']} style={{ marginRight: '75px' }}>
                  Items
                </Typography>
                <Typography size={EStyleFontSizes['MEDIUM']} usePre>
                  {`large home appliances like refrigerators, \n air conditioners, and TVs`}
                </Typography>
              </Box>
              <Box hAlign='baseline' margin='0 20px'>
                <Typography weight='var(--font-weight-bold)' size={EStyleFontSizes['MEDIUM']} style={{ verticalAlign: 'top', marginRight: '85px' }}>
                  Cost
                </Typography>
                <Typography useGap size={EStyleFontSizes['MEDIUM']}>
                  absolutely free
                </Typography>
              </Box>
              <Box hAlign='baseline' margin='0 20px'>
                <Typography weight='var(--font-weight-bold)' style={{ verticalAlign: 'top' }} size={EStyleFontSizes['MEDIUM']}>
                  How to Use
                </Typography>
                <Typography size={EStyleFontSizes['MEDIUM']} usePre>
                  {`Just call to make a reservation, \n and we will pick up your appliances.`}
                </Typography>
              </Box>
            </BoxWrap>
          </Image>
        </Box>
      </BoxWrap>

      <Box vAlign='center' marginTop='125px'>
        <Typography useGap={false} weight='var(--font-weight-bold)' color='var(--color-blue-700)'>
          corrections
        </Typography>
        <BoxWrap>
          <Box vAlign='center' width='98%'>
            <Question type='text' size='small'>
              {'(1)'}
            </Question>
            <Input
              width='310px'
              maxLength={2000}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='1번 답란'
              inputSize='x-small'
              value={cardData.p03.answer[0]}
              status={getInputStatus(0)}
              onChange={e => handleInputChange(0, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
            />
            <SvgIcon src={arrow_right} size='38px' type={ESvgType.IMG} />
            <Question type='text' size='small'>
              {'(2)'}
            </Question>
            <Input
              width='310px'
              maxLength={2000}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='2번 답란'
              inputSize='x-small'
              value={cardData.p03.answer[1]}
              status={getInputStatus(1)}
              onChange={e => handleInputChange(1, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
            />
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} />
            {`call, visit our website`}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
