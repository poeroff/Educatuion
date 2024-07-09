import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  SvgIcon,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C12A02 } from './store';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const page = 'P02';
const answers = ['tightly', 'ightly'];
const answerText = '(t)ightly';
const headerText = 'Words and Expressions';
const questionText = '2. 그림을 보고, 빈칸에 알맞은 말을 써 봅시다.';
const text = ['My mom holds my hand t', '.'];
const imageSrc = '/L01/C12/A02/ME1-L01-C12-A02-P02.jpg';
const alt = '엄마가 남자 아이의 손을 꽉 잡고 있는 모습';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C12A02);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted, isCorrect } = cardData.p02;
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !userAnswer || !removeSpaces(userAnswer), [userAnswer]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'), [isSubmitted, isAnswerShow]);
  const mark: TMarkType = useMemo(() => getMarking(isSubmitted, isCorrect), [isCorrect, isSubmitted]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: mark,
  };

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

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: e.target.value } }));
    changeData(page, 1, 1, e.target.value);
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect = answers.some(answer => isAnswer(userAnswer, answer));
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
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

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userAnswer: userSubmissionList[0].inputData[0]?.value || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitDisabled={isDisabled}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={submitLabel}
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        <Box width={'480px'}>
          <Image src={imageSrc} alt={alt} />
        </Box>
        <Box>
          <Box lineHeight='42px' paddingTop={'70px'}>
            <Typography style={{ padding: '4px 0px 12px 12px' }}>{text[0]}</Typography>
            <Typography title='빈칸' type='blank' boxColor='var(--color-black)' width='60px'></Typography>
            <Typography style={{ padding: '4px 12px' }}>{text[1]}</Typography>
          </Box>
          <Box display='flex'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Input
              width='250px'
              value={userAnswer}
              onChange={handleInputChange}
              ariaLabel='답 입력란'
              placeholder='내용을 넣어 주세요.'
              maxLength={999}
              readOnly={isSubmitted}
              status={isSubmitted ? (isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.DEFAULT}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>{answerText}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
