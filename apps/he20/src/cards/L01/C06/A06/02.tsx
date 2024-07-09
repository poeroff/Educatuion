import { useState, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  BottomSheet,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  Tag,
  ETagLine,
  IQuestionProps,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A06 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A06);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary(4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. Fill in the blank to complete the sentences.',
    mark: !cardData.p02.isSubmitted ? undefined : cardData.p02.isCorrect ? 'correct' : 'incorrect',
    markSize: 'middle',
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
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

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p02.value1.trim() === cardData.p02.answer1;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1.trim(),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            value1: userSubmissionList[0].inputData[0]?.value || cardData.p02.value1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (str: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, value1: str } }));
    changeData('P02', 1, 1, str);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      vAlign={'flex-start'}
      submitDisabled={cardData.p02.isSubmitted ? false : !isNotEmptyString(cardData.p02.value1)}
      onSubmit={submitAnswer}
      submitBtnColor={
        cardData.p02.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : !isNotEmptyString(cardData.p02.value1)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      bodyId='targetContainer'
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>

      <Scroll>
        <Box background={'white'} useRound>
          <Box>
            <Typography>How are desirable behaviors encouraged in positive reinforcement training?</Typography>
          </Box>
          <Box>
            <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' />
            <Typography>They are encouraged using</Typography>
            <Input
              value={cardData.p02.value1}
              width='auto'
              minWidth={'300px'}
              maxLength={30}
              onChange={e => {
                handleChange(e.target.value);
              }}
              ariaLabel='답란'
              placeholder='내용을 넣어 주세요.'
              status={cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? InputStatus.DEFAULT : InputStatus.ERROR) : InputStatus.ENABLE}
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p02.isSubmitted && isShowAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>rewards</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog width={921} height={500} isShow={isShowModal} closeLabel='지문 닫기' onClose={closeModal} tabIndex={101} useFooter={true}>
        <Box vAlign='center' width='100%' height='50px' backgroundColor='var(--color-grey-100)' marginBottom='20px' useRound>
          <Typography weight='bold'>July 31, Wednesday</Typography>
        </Box>
        <Scroll height='300px' tabIndex={0}>
          <Box display='flex' flexDirection='column'>
            <Typography>This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant.</Typography>
            <Typography>After spending 25 years carrying tourists along rough roads, she developed a twisted spine and foot pain.</Typography>
            <Typography>
              In order to support Jane in taking care of Molly’s foot, we took part in positive reinforcement training, which involves using rewards
              to encourage desirable behaviors.
            </Typography>
            <Typography>
              When I gently touched her foot with a pole and called out, “foot,” she lifted it. We then rewarded her with a sweet piece of watermelon,
              her favorite fruit.
            </Typography>
            <Typography>
              This training helps reduce the stress that animals experience during controlled situations, such as treatment or a health examination.
            </Typography>
            <Typography>The good news is Molly seems to be adapting well, and I expect her to get better soon.</Typography>
          </Box>
        </Scroll>
      </Dialog>
    </Container>
  );
};

export default P02;
