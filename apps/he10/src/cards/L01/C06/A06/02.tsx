import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  Input,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  Tag,
  ETagLine,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L01C06A06 } from './store';
import ContentInfo from '../../C07/A03/contentInfo';

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A06);
  const { userId } = useRecoilValue(studentAtom);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (4/5)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Q4. In addition to friendliness and cooperation, what other characteristics do you think we need today?',
  };

  const modalText =
    'It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and why is it important?';

  const modelAnswer = {
    answer1: `(1) creativity is required.`,
    answer2: `(2) The world is changing rapidly, so people need to be creative in order to keep up with the changes. Those who are creative are able to come up with better solutions.`,
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, subKey: number) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: e.target.value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: e.target.value } }));
    }
    changeData('P02', 1, subKey, e.target.value);
  };

  const openModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={onSubmitText}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap marginBottom={'4px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button
            label='지문보기'
            ariaLabel='지문보기'
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            width='96px'
            onClick={openModal}
            useRound
          />
        </Box>
      </BoxWrap>
      <Box background={'white'} useRound useFull hAlign={'center'} textAlign={'center'} height='auto'>
        <Scroll tabIndex={0}>
          <Box display='flex' gap='10px' flexDirection='column'>
            <Box>
              <Typography>I think (1) </Typography>
              <Input
                name='value1'
                value={cardData.p02.answer1}
                minWidth='500px'
                onChange={e => {
                  handleInputChange(e, 1);
                }}
                placeholder={'내용을 넣어 주세요.'}
                maxLength={100}
                ariaLabel='1번 답 입력란'
                readOnly={cardData.p02.isSubmitted}
              />
            </Box>
            <Box>
              <Typography>(2) </Typography>
              <Input
                name='value2'
                value={cardData.p02.answer2}
                minWidth='577px'
                onChange={e => {
                  handleInputChange(e, 2);
                }}
                placeholder={'내용을 넣어 주세요.'}
                maxLength={100}
                ariaLabel='2번 답 입력란'
                readOnly={cardData.p02.isSubmitted}
              />
            </Box>
          </Box>
        </Scroll>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Typography>{modelAnswer.answer1}</Typography>
            <Typography>{modelAnswer.answer2}</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        topHeight={50}
        width={893}
        height={458}
        isShow={isShowModal}
        onClose={closeModal}
        useFooter={true}
        closeLabel={'지문 닫기'}
        useHeader
        header={() => (
          <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              What’s in Your School Surviva Kit?
            </Typography>
          </Box>
        )}
        tabIndex={101}
      >
        <Typography>
          <ContentInfo />
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P02;
