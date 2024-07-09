import React, { useEffect, useRef, useState } from 'react';
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
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A06b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A06b);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (4)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Q4. In addition to friendliness and cooperation, what other characteristics do you think we need today?',
  };

  const modalText = `Now let’s turn our attention to ourselves, Homo sapiens.\nHow have we managed to survive for so long?\nNeanderthals existed together with Homo sapiens until about 40,000 years ago, and they were known to be intelligent and physically superior to Homo sapiens. \n    Neanderthals were able to make tools and fire and had strong bodies with well-developed muscles and broad shoulders. \nDespite these attributes, however, it was Homo sapiens who ultimately survived and thrived. \nOne possible explanation is that our ancestors lived in larger communities that promoted cooperation and the free exchange of knowledge, \nwhile Neanderthals tended to live in smaller groups. \nThese social differences may have given Homo sapiens a competitive advantage over Neanderthals, \nallowing them to adapt to an ever-changing environment.`;
  const modelAnswer = {
    answer1: `(1) creativity`,
    answer2: `(2) the world is changing fast and creative people can keep up with the changes`,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, subKey: number) => {
    const { value } = e.target;
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
      changeData('P02', 1, 1, value);
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
      changeData('P02', 1, 2, value);
    }
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

  const DialogHeader = () => {
    return (
      <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
        <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
          The Power of Friendliness: Soft but Strong (4)
        </Typography>
      </Box>
    );
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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
      vAlign={'flex-start'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)}
      submitBtnColor={
        cardData.p02.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isNotEmptyString(cardData.p02.answer1) && isNotEmptyString(cardData.p02.answer2)
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
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
          <Box>
            <Box vAlign='flex-start'>
              <Typography>I think we need (1) </Typography>
              <Input
                name='value1'
                value={cardData.p02.answer1.trim()}
                minWidth='587px'
                onChange={e => {
                  handleInputChange(e, 1);
                }}
                placeholder={'내용을 넣어 주세요.'}
                maxLength={100}
                ariaLabel='1번 답란'
                readOnly={cardData.p02.isSubmitted}
              />
            </Box>
            <Box vAlign='flex-start' marginTop={10}>
              <Typography>That's because (2) </Typography>
              <Input
                name='value2'
                value={cardData.p02.answer2.trim()}
                minWidth='577px'
                onChange={e => {
                  handleInputChange(e, 2);
                }}
                placeholder={'내용을 넣어 주세요.'}
                maxLength={100}
                ariaLabel='2번 답란'
                readOnly={cardData.p02.isSubmitted}
              />
            </Box>
          </Box>
        </Scroll>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Typography>{modelAnswer.answer1}</Typography>
            <Typography>{modelAnswer.answer2}</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        useHeader
        header={DialogHeader}
        topHeight={50}
        width={921}
        height={500}
        isShow={isShowModal}
        onClose={closeModal}
        useFooter={true}
        closeLabel={'지문 닫기'}
        tabIndex={101}
      >
        <Box>
          {modalText.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                {paragraph}
              </Typography>
              <br />
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;
