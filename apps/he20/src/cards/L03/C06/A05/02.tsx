import { useEffect, useRef, useState } from 'react';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  IQuestionProps,
  EStyleButtonTypes,
  Input,
  Tag,
  Button,
  Dialog,
  ETagLine,
  EStyleFontSizes,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { L03C06A05 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A05);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (3)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q3. Why do you think people are inspired by Maud Lewis’ story?',
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
      ],
    },
  ];

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const handleSubmit = () => {
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
              value: cardData.p02.answer,
              isAnswer: false,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
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
      vAlign='center'
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p02.answer}
      submitBtnColor={cardData.p02.answer !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap height={'200px'}>
        <Box useFull width='100%' textAlign={'right'}>
          <Box width={'100%'} marginBottom={'20px'}>
            <Button
              label={'지문 보기'}
              color={EStyleButtonTypes.SECONDARY}
              size={EStyleSizes['SMALL']}
              minWidth='96px'
              useRound
              onClick={openModal}
            />
          </Box>
          <Box background={'white'} useRound vAlign='center'>
            <Typography>
              Her story shows that{' '}
              <Input
                maxLength={999}
                name='value1'
                width='570px'
                placeholder='내용을 넣어 주세요.'
                value={cardData.p02.answer}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel={'답란'}
                onChange={e => {
                  handleChange(1, e.target.value);
                }}
              />
              &nbsp;.
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px'>
          <Typography useGap={false}>
            <Box marginBottom={'10px'}>
              <Tag type={ETagLine.GREEN} label='예시답안' />
            </Box>
          </Typography>
          <Box marginTop='10px'>
            <Typography useGap={false}>Her story shows that </Typography>
            <Typography useGap={false} textDecoration={'underline'}>
              {cardData.p02.solution}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        width={921}
        height={500}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              What’s in Your School Surviva Kit?
            </Typography>
          </Box>
        )}
        isShow={isShowModal}
        closeLabel='지문 닫기'
        onClose={closeModal}
        useFooter={true}
        confirmLabel='지문 닫기'
        tabIndex={101}
        tabIndexCount={3}
      >
        <Typography>
          It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I had
          trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations like this, we
          want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and why is it important?
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P02;
