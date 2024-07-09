import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerText, imageSrc, questionIText, udl } from './commonData';
import { L04C08A03b } from './store';

const page = 'P05';
const answer = 'with the sun setting';

const P05 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A03b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted, isCorrect } = cardData.p05;
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = !removeSpaces(userAnswer);
  const submitLabel = isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const mark: TMarkType = getMarking(isSubmitted, isCorrect);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            userAnswer: userSubmissionList[0].inputData[0]?.value || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect = isAnswer(userAnswer, answer);
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: userAnswer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const handleRadioClick: ChangeEventHandler<HTMLInputElement> = e => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, userAnswer: e.target.value } }));
    changeData(page, 1, 1, e.target.value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };

  const questionInfo: IQuestionProps = {
    text: questionIText,
    mark: mark,
  };

  const nodeData: { children: React.ReactNode }[] = [
    {
      children: (
        <Box>
          <Typography>5. In the evening, We walked along the beautiful beach </Typography>
          <Input
            ariaLabel='답란'
            value={userAnswer}
            onChange={handleRadioClick}
            placeholder='내용을 넣어 주세요.'
            width='270px'
            maxLength={999}
            readOnly={isSubmitted}
            status={
              isSubmitted
                ? isCorrect
                  ? InputStatus.ENABLE
                  : InputStatus.ERROR
                : isNotEmptyString(userAnswer)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
          />
          <Typography>behind us.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box marginTop={'20px'} padding='4px 12px 10px' backgroundColor={'var(--color-blue-50)'}>
          <Typography color={'var(--color-blue-800)'} size={EStyleFontSizes['X-MEDIUM']}>
            제시어 : setting, with, the sun
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      submitBtnColor={!isDisabled ? (isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <Image src={imageSrc} width={'100%'} alt={''} />
            {udl && <Box type='hidden'>{udl.join('')}</Box>}
          </TextView>
        </Box>
        <Box marginTop='20px'>
          {nodeData.map((item, index) => {
            return <Box key={index}>{item?.children}</Box>;
          })}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
