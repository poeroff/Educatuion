import { TMainHeaderInfoTypes, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE2-L03-C03-A02-02.mp3',
    captionSrc: '/L03/C03/A02/HE2-L03-C03-A02-02.srt',
  };

  const WLabel = {
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  };

  const noLabel = {
    inLine: true,
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Good evening, everyone.',
      translation: '좋은 저녁입니다, 여러분.',
      ...WLabel,
    },
    {
      originText: 'Welcome to the show!',
      translation: '공연을 보러 오신 것을 환영합니다!',
      ...noLabel,
    },
    {
      originText: (
        <>
          We're thrilled to present to you the musical production of&nbsp;
          <Typography fontStyle='italic' useGap={false} style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
            Matilda
          </Typography>
          , based on the popular novel by Roald Dahl.
        </>
      ),
      translation: 'Roald Dahl의 인기 소설을 원작으로 한 뮤지컬 <Matilda>를 여러분께 선보이게 되어 매우 기쁩니다.',
      ...noLabel,
    },
    {
      originText: "Before the show begins, we'd like to remind you of a few things to make sure everyone has an enjoyable experience.",
      translation: '공연이 시작되기 전에 모두가 즐거운 경험을 할 수 있도록 몇 가지 사항을 알려드리고자 합니다.',
      ...noLabel,
    },
    {
      originText:
        'First, please turn off or silence any electronic devices including mobile phones, because these devices can distract the performers and the audience.',
      translation: '휴대전화를 포함한 모든 전자기기는 공연자와 관객의 주의를 분산시킬 수 있으므로 전원을 끄거나 무음으로 설정해 주세요.',
      ...noLabel,
    },
    {
      originText: "Also, please keep in mind that you're not allowed to take photographs or make video recordings during the performance.",
      translation: '또한 공연 중에는 사진 촬영이나 동영상 촬영이 금지되어 있다는 점을 유념해 주세요.',
      ...noLabel,
    },
    {
      originText: 'Finally, please take a moment to check the nearest emergency exits to your left and right in case of an emergency.',
      translation: '마지막으로 비상 상황에 대비해 잠시 시간을 내어 좌우로 가장 가까운 비상구를 확인해 주세요.',
      ...noLabel,
    },
    {
      originText: 'There will be a 15-minute break between Act One and Act Two.',
      translation: '1막과 2막 사이에는 15분간의 휴식 시간이 있습니다.',
      ...noLabel,
    },
    {
      originText: 'You may take a rest, get some snacks, or use the restrooms on the first floor during that time.',
      translation: '그 시간 동안 휴식을 취하시거나 간식을 드시거나 1층 화장실을 이용하시면 됩니다.',
      ...noLabel,
    },
    {
      originText: "Thank you for joining us tonight, and enjoy this evening's show!",
      translation: '오늘 밤 함께 해 주셔서 감사드리며 오늘 저녁 공연을 즐기세요!',
      ...noLabel,
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
