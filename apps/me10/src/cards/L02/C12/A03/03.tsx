import {
  Box,
  Input,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  SvgIcon,
  IAudioPlayerProps,
  EStyleButtonTypes,
  BoxWrap,
  Typography,
  InputStatus,
  EStyleFontSizes,
  ESvgType,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { isAnswer, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { Container } from '@maidt-cntn/ui/en';
import { L02C12A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P03 = () => {
  const pageNo = 'P03';
  const pageKey = 'p03';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C12A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo = {
    headerText: 'Listening',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C12/A03/ME1-L02-C12-A03-P03.mp3',
    captionSrc: '/L02/C12/A03/ME1-L02-C12-A03-P03.srt',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '7',
    text: '잘 듣고, 물음에 답해 봅시다.',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
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
          [pageKey]: {
            ...prev[pageKey],
            answer1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleInputChange = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer1: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer2: value } }));
    }
    changeData(pageNo, 1, index, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData[pageKey].answer1, cardData[pageKey].solution1);
      const isCorrect2 = isAnswer(cardData[pageKey].answer2, cardData[pageKey].solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !(cardData[pageKey].answer1 && cardData[pageKey].answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!(cardData[pageKey].answer1 && cardData[pageKey].answer2)}
      onSubmit={handleSubmit}
    >
      <BoxWrap flexDirection='column' useFull paddingTop='40px'>
        <Box marginTop='50px' flexDirection='row'>
          <Box marginTop='24px'>
            <Typography>What is Hajin doing?</Typography>
          </Box>
          <Box>
            <Box marginTop='24px' paddingLeft={'12px'} vAlign='center'>
              <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
              <Typography useGap={true}>He’s doing his </Typography>
              <Input
                value={cardData[pageKey].answer1}
                onChange={e => handleInputChange(1, e.target.value)}
                placeholder=''
                width='150px'
                maxLength={cardData[pageKey].answer1.length + 5}
                inputSize='x-small'
                readOnly={cardData[pageKey].isSubmitted}
                status={
                  cardData[pageKey].isSubmitted && cardData[pageKey].answer1 !== cardData[pageKey].solution1
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData[pageKey].answer1) || cardData[pageKey].isSubmitted
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                ariaLabel='답란'
              />
              &nbsp;
              <Input
                value={cardData[pageKey].answer2}
                onChange={e => handleInputChange(2, e.target.value)}
                placeholder=''
                width='200px'
                maxLength={cardData[pageKey].answer2.length + 5}
                inputSize='x-small'
                readOnly={cardData[pageKey].isSubmitted}
                status={
                  cardData[pageKey].isSubmitted && cardData[pageKey].answer2 !== cardData[pageKey].solution2
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData[pageKey].answer2) || cardData[pageKey].isSubmitted
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                ariaLabel='답란'
              />
            </Box>
          </Box>
        </Box>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
          <Box background='lightGray' borderRadius='12px' marginTop='40px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Box>{' '}
            <Box marginTop='10px' padding={8}>
              <Typography size={EStyleFontSizes.MEDIUM}>
                {cardData[pageKey].solution1} {cardData[pageKey].solution2}
              </Typography>
            </Box>
          </Box>
        </BottomSheet>
      </BoxWrap>
    </Container>
  );
};

export default P03;
