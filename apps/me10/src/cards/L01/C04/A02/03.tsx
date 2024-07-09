import styled from '@emotion/styled';
import {
  EStyleButtonTypes,
  InputStatus,
  Box,
  BoxWrap,
  IQuestionProps,
  Image,
  Input,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import heart from '@/assets/icon/heart.svg';
import star from '@/assets/icon/star.svg';
import video from '@/assets/icon/video.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C04A02 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

export const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A02);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'My Video Channel: Step2',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '예시의 밑줄 친 부분을 고쳐 자신의 동영상 채널을 소개하는 프로필을 작성해 봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (!cardData.p03.isSubmitted) {
      const isCorrect = true;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: true,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: true,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p03.answer4,
              isAnswer: true,
              isCorrect: true,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p03.answer5,
              isAnswer: true,
              isCorrect: true,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p03.answer6,
              isAnswer: true,
              isCorrect: true,
            },
          ],
        },
      ];
      submitData('P03', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p03.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p03.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p03.answer6,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer6: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  const checkBtnColorInput = () => {
    return (
      cardData.p03.answer1 &&
      isNotEmptyString(cardData.p03.answer1) &&
      cardData.p03.answer2 &&
      isNotEmptyString(cardData.p03.answer2) &&
      cardData.p03.answer3 &&
      isNotEmptyString(cardData.p03.answer3) &&
      cardData.p03.answer4 &&
      isNotEmptyString(cardData.p03.answer4) &&
      cardData.p03.answer5 &&
      isNotEmptyString(cardData.p03.answer5) &&
      cardData.p03.answer6 &&
      isNotEmptyString(cardData.p03.answer6)
    );
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      useExtend
      submitLabel='완료하기'
      onSubmit={() => {
        submitAnswer();
      }}
      submitDisabled={
        !(
          cardData.p03.answer1 &&
          isNotEmptyString(cardData.p03.answer1) &&
          cardData.p03.answer2 &&
          isNotEmptyString(cardData.p03.answer2) &&
          cardData.p03.answer3 &&
          isNotEmptyString(cardData.p03.answer3) &&
          cardData.p03.answer4 &&
          isNotEmptyString(cardData.p03.answer4) &&
          cardData.p03.answer5 &&
          isNotEmptyString(cardData.p03.answer5) &&
          cardData.p03.answer6 &&
          isNotEmptyString(cardData.p03.answer6)
        ) || cardData.p03.isSubmitted
      }
      submitBtnColor={
        checkBtnColorInput() ? (cardData.p03.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap boxGap={90} justifyContent='center' marginTop={'-6vh'} marginLeft={22}>
        <Box display='flex' flexDirection='column'>
          <Typography color='var(--color-white)' weight='var(--font-weight-bold)'>
            Channel Name:
          </Typography>
          <Input
            minWidth='263px'
            placeholder='e.g. BadminChris'
            value={cardData.p03.answer1}
            status={!(cardData.p03.answer1 && isNotEmptyString(cardData.p03.answer1)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            readOnly={cardData.p03.isSubmitted}
            onChange={event => handleChange(1, event.target.value)}
            ariaLabel='1번 답 입력란'
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography color='var(--color-white)' weight='var(--font-weight-bold)'>
            My Name:
          </Typography>
          <Input
            minWidth='263px'
            placeholder='e.g. Chris'
            value={cardData.p03.answer2}
            status={!(cardData.p03.answer2 && isNotEmptyString(cardData.p03.answer2)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            readOnly={cardData.p03.isSubmitted}
            onChange={event => handleChange(2, event.target.value)}
            ariaLabel='2번 답 입력란'
          />
        </Box>
      </BoxWrap>
      <Box padding='0 40px' marginTop={30}>
        <Box vAlign='center'>
          <SvgIcon src={heart} size='32px' style={{ margin: '10px' }} />
          <Typography>Likes: I like</Typography>
          <Box flex='1'>
            <Input
              minWidth='243px'
              width='100%'
              placeholder='e.g. sports'
              value={cardData.p03.answer3}
              status={!(cardData.p03.answer3 && isNotEmptyString(cardData.p03.answer3)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
              readOnly={cardData.p03.isSubmitted}
              onChange={event => handleChange(3, event.target.value)}
              ariaLabel='3번 답 입력란'
            />
          </Box>
          &nbsp;.
        </Box>
        <Box vAlign='center' marginTop={10}>
          <SvgIcon src={star} size='32px' style={{ margin: '10px' }} />
          <Typography>Favorite: My Favorite</Typography>
          <Box flex='1'>
            <Input
              minWidth='243px'
              width='100%'
              placeholder='e.g. sports'
              value={cardData.p03.answer4}
              status={!(cardData.p03.answer4 && isNotEmptyString(cardData.p03.answer4)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
              readOnly={cardData.p03.isSubmitted}
              onChange={event => handleChange(4, event.target.value)}
              ariaLabel='4번 답 입력란'
            />
          </Box>
          <Typography>is</Typography>
          <Box flex='1'>
            <Input
              minWidth='243px'
              width='100%'
              placeholder='e.g. badminton'
              value={cardData.p03.answer5}
              status={!(cardData.p03.answer5 && isNotEmptyString(cardData.p03.answer5)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
              readOnly={cardData.p03.isSubmitted}
              onChange={event => handleChange(5, event.target.value)}
              ariaLabel='5번 답 입력란'
            />
          </Box>
          &nbsp;.
        </Box>
        <Box vAlign='center' marginTop={10}>
          <SvgIcon src={video} size='32px' style={{ margin: '10px' }} />
          <Typography>My videos are about</Typography>
          <Box flex='1'>
            <Input
              minWidth='243px'
              width='100%'
              placeholder='e.g. badminton'
              value={cardData.p03.answer6}
              status={!(cardData.p03.answer6 && isNotEmptyString(cardData.p03.answer6)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
              readOnly={cardData.p03.isSubmitted}
              onChange={event => handleChange(6, event.target.value)}
              ariaLabel='6번 답 입력란'
            />
          </Box>
          &nbsp;.
        </Box>
      </Box>
      <BackgroundImage>
        <Image src={'/L01/C04/A02/ME1-L01-C04-A02-P03.jpg'} alt='' width='100%' height='380px' />
      </BackgroundImage>
    </Container>
  );
};

export const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  z-index: -1;
  right: 0;
  top: 0;
`;

export default P03;
