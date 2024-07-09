import arrow from '@/assets/icon/arrow-icon.svg';
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
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerText, imageSrc, questionIText, udl } from './commonData';
import { L01C08A03a } from './store';

const page = 'P01';
const answer = 'asked the residents to keep';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03a);
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userAnswer, isSubmitted } = cardData.p01;
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = !removeSpaces(userAnswer);
  const submitLabel = isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '완료하기';

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
          p01: {
            ...prev.p01,
            userAnswer: userSubmissionList[0].inputData[0]?.value || userAnswer,
            isSubmitted,
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
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: userAnswer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(page, userSubmission);
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, userAnswer: e.target.value } }));
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
    size: 'medium',
  };

  const nodeData: { children: React.ReactNode }[] = [
    {
      children: <Typography>1. 건물 관리자가 주민들에게 밤에 소음을 줄여달라고 요청했다.</Typography>,
    },
    {
      children: (
        <Box marginTop={'10px'}>
          <SvgIcon src={arrow} size='38px' />
          <Typography>The building manager </Typography>
          <Input
            ariaLabel='답란'
            value={userAnswer}
            onChange={handleInputChange}
            placeholder='내용을 넣어 주세요.'
            width='430px'
            maxLength={27}
            readOnly={isSubmitted}
            status={isNotEmptyString(userAnswer) ? InputStatus.ENABLE : InputStatus.DEFAULT}
          />
          <Typography>the noise down at night.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box marginTop={'20px'} padding='4px 12px 10px' backgroundColor={'var(--color-blue-50)'}>
          <Typography color={'var(--color-blue-800)'} size={EStyleFontSizes['X-MEDIUM']}>
            제시어 : keep, ask, the residents
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
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P01;
