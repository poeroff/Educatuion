import { useEffect, useState } from 'react';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Textarea,
  Dialog,
  IQuestionProps,
  Typography,
  EStyleFontSizes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  BottomSheet,
  Tag,
  ETagLine,
  PinchZoom,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { IDialog } from './02';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A07 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P03 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isComplete, setComplete] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C06A07);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans?(5)',
  };
  const questionInfo: IQuestionProps = {
    text: 'Q6. Add your comment about AI-powered neural implant technology.',
  };

  const dialogWithoutTitle: Omit<IDialog, 'dialogTitle'> = {
    dialogText:
      'I hope that we can overcome these challenges through careful consideration of neuroethics. This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. I think it is important to establish a prior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. This will ensure thatscience and technology progress in accordance with ethical principles. \n What do you think about this technology? Please share your opinion in the comments section below.',
  };

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
      const userSubmisson: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p03.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P03', userSubmisson);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.lenght > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
    changeData('P03', 1, 1, value);
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
      submitDisabled={cardData.p03.answer === ''}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={!cardData.p03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap justifyContent={'flex-end'} marginBottom={'20px'}>
        <Box width={'30%'} hAlign='flex-end'>
          <Button label={'지문보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='132px' useRound onClick={openModal} />
        </Box>
      </BoxWrap>
      <BoxWrap useFull>
        <PinchZoom>
          <Box hAlign={'center'} useFull>
            <Image src={'/L04/C06/A07/HE2-L04-C06-A07-P01.jpg'} height='280px' alt={''} ariaDescribedby='img_desc' />
          </Box>
        </PinchZoom>
        <Box type='hidden' id='img_desc'>
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
        <BoxWrap useFull lineHeight='40px'>
          <Box useFull>
            <Textarea
              tabIndex={101}
              value={cardData.p03.answer}
              onChange={event => handleChange(event.target.value)}
              width='100%'
              height='100%'
              rows={5}
              placeholder='e.g. I’m most interested in'
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='답란'
            />
          </Box>
        </BoxWrap>
        <Dialog
          isShow={isShowModal}
          width={893}
          height={500}
          useFooter
          onClose={() => setIsShowModal(false)}
          closeLabel='지문 닫기'
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
                <Typography fontSize='28px' lineHeight={'40px'} style={{ whiteSpace: 'pre-wrap' }}>
                  {dialogWithoutTitle.dialogText}
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Dialog>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>I’m most interested in {''}</Typography>
            <Typography size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              the incredible potential for AI-powered neural implants in the medical field! It’s inspiring to see how they could revolutionize
              treatments. I hope that more people can access and benefit from this technology.{' '}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
