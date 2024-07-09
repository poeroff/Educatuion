import { ChangeEvent, useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Button,
  Input,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  Scroll,
} from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L04C06A07b } from './store';
import usePageData from '@/hooks/usePageData';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

export interface IDialog {
  dialogTitle: React.ReactNode;
  dialogText: string;
}

const P03 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();

  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A07b);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans?(5)',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Q6. Add your comment about AI-powered neural implant technology.',
  };

  const dialogWithoutTitle: Omit<IDialog, 'dialogTitle'> = {
    dialogText:
      'I hope that we can overcome these challenges through careful consideration of neuroethics. This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. I think it is important to establish a prior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. This will ensure thatscience and technology progress in accordance with ethical principles.​ What do you think about this technology? Please share your opinion in the comments section below.',
  };

  const { userId } = useRecoilValue(studentAtom);

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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P03', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page == 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const inputChangeHandler = (subKey: number, e: ChangeEvent<HTMLInputElement>) => {
    const truncateValue = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        [`answer${subKey}`]: truncateValue,
      },
    }));
    changeData('P03', 1, subKey, truncateValue);
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

  const openModal = () => {
    setIsShowModal(true);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2)}
      submitLabel={cardData.p03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={handleSubmit}
    >
      <BoxWrap justifyContent={'flex-end'} marginTop={'24px'} width={'100%'} marginBottom={'24px'}>
        <Box width={'30%'} hAlign='flex-end'>
          <Button label={'지문보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='132px' useRound onClick={openModal} />
        </Box>
      </BoxWrap>

      <Dialog
        width={893}
        height={500}
        isShow={isShowModal}
        closeLabel='지문 닫기'
        onClose={() => setIsShowModal(false)}
        useFooter={true}
        confirmLabel='지문 닫기'
      >
        <Box tabIndex={103} useFull padding='24px 32px'>
          <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px'>
            <Typography weight={'bold'} size={EStyleFontSizes['X-MEDIUM']}>
              Will AI-Powered Neural Implants Make Us Super-Humans?(5)
            </Typography>
          </Box>
          <Scroll height='270px'>
            <Box padding='4px 12px'>
              <Typography fontSize='28px' lineHeight={'40px'}>
                {dialogWithoutTitle.dialogText}
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </Dialog>

      <BoxWrap useFull>
        <PinchZoom>
          <Box hAlign={'center'}>
            <Image src={'/L04/C06/A07/HE2-L04-C06-A07-P01.jpg'} alt={''} width='350px' ariaDescribedby='img_desc' />
          </Box>
        </PinchZoom>
        <Box type='hidden'>
          <p>인터넷 게시글에 작성된 세 개의 코멘트 프로필 사진 옆에 그 사람이 작성한 코멘트가 있다. (오래된 순)</p>

          <p>
            작성자 : Eric Davis 작성 시각 : 9 minutes ago 공감 수 : 4 작성 글: Wow, AI-powered neural implants sound incredible! I can’t believe that
            AI can help the disabled walk again and use artificial arms that move according to their thoughts!
          </p>

          <p>
            작성자 : Yumi Lee 작성 시각 : 5 minutes ago 공감 수 : 9 작성 글: Well, the technology sounds amazing, but I’m really worried about the
            privacy issues it might cause. I think it is necessary to strictly enforce privacy laws to protect the personal information of
            individuals.
          </p>

          <p>
            작성자 : Andy Taylor 작성 시각 : 2 minutes ago 공감 수 : 17 작성 글: Thank you all for sharing your thoughts. I’ll talk more about how to
            address the concerns in my next post
          </p>
        </Box>
        <BoxWrap>
          <Box background={'white'} useRound>
            <Typography>
              I’m most interested in the incredible potential for {''}
              <Input
                maxLength={150}
                value={cardData.p03.answer1}
                inputSize='x-small'
                width='280px'
                onChange={event => inputChangeHandler(1, event)}
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p03.isSubmitted}
                ariaLabel='1번 답란'
              />
              {''} .
            </Typography>
            <Typography>I hope that</Typography>

            <Input
              maxLength={150}
              value={cardData.p03.answer2}
              inputSize='x-small'
              width='280px'
              onChange={event => inputChangeHandler(2, event)}
              placeholder='내용을 넣어 주세요.'
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='2번 답란'
            />
            <Typography>and more people can access and benefit from this technology.</Typography>
          </Box>
        </BoxWrap>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>I’m most interested in the incredible potential for</Typography>
            <Typography size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              AI-powered neural implants in the medical field.
            </Typography>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>I hope that</Typography>
            <Typography size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              they could revolutionize treatments
            </Typography>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>and more people can access and benefit from this technology.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
