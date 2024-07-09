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

const page = 'P03';
const answer = 'tell drivers not to park';

const P03 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03a);
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userAnswer, isSubmitted } = cardData.p03;
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
          p03: {
            ...prev.p03,
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
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
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
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, userAnswer: e.target.value } }));
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
      children: <Typography>3. 공무원이 운전자에게 긴급 차량을 위해 해당 지역에 주차하지 말라고 말한다.</Typography>,
    },
    {
      children: (
        <Box marginTop='10px'>
          <SvgIcon src={arrow} size='38px' />
          <Typography>Government officers </Typography>
          <Input
            ariaLabel='답란'
            value={userAnswer}
            onChange={handleInputChange}
            placeholder='내용을 넣어 주세요.'
            width='300px'
            maxLength={999}
            readOnly={isSubmitted}
            status={isNotEmptyString(userAnswer) ? InputStatus.ENABLE : InputStatus.DEFAULT}
          />
          <Typography> in the area for emergency vehicles.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box marginTop={'20px'} padding='4px 12px 10px' backgroundColor={'var(--color-blue-50)'}>
          <Typography color={'var(--color-blue-800)'} size={EStyleFontSizes['X-MEDIUM']}>
            제시어 : park, tell, drivers
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
export default P03;
