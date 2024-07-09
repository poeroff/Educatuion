import { layouts } from '@/constants/layout';
import { lazyLoad } from '@maidt-cntn/router';
import { EMathLayout } from '@maidt-cntn/ui';

export const templates_em31 = [
  {
    path: `EM-0001`,
    element: lazyLoad(() => import('../../samples/A01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-000-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-000-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
    },
    children: [],
  },
  {
    path: `EM-001-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-001-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-001-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-001-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-001-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-001-02')),
    params: {
      ...layouts[EMathLayout.INTRO],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-001-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-001-03')),
    params: {
      ...layouts[EMathLayout.SECONDARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-002-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-002-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EMA-002-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-002-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EM-002-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-002-02')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EM-003-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-003-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-003-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-003-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-003-02`,
    element: lazyLoad(() => import('../../samples/A01/EMA-003-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-003-03`,
    element: lazyLoad(() => import('../../samples/A01/EMA-003-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '4.',
      mainChapter: '곱셈',
      subChapter: '2. (두 자리 수)×(한 자리 수)를 계산해요(2)',
    },
    children: [],
  },
  {
    path: `EM-004-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-004-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EM-004-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-004-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
    },
    children: [],
  },
  {
    path: `EM-004-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-004-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '4.',
      mainChapter: '곱셈',
      subChapter: '2. (두 자리 수) × (한 자리 수)를 계산해요(2)',
    },
    children: [],
  },
  {
    path: `EM-004-03_2`,
    element: lazyLoad(() => import('../../samples/A01/EM-004-03_2')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '2. 세 자리 수의 덧셈을 해요(2)',
    },
    children: [],
  },
  {
    path: `EMA-004-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-004-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EM-005-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-005-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EMA-005-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-005-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-005-02_2`,
    element: lazyLoad(() => import('../../samples/A01/EMA-005-02_2')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-006-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-006-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
    },
    children: [],
  },

  {
    path: `EM-007-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-007-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
    },
  },
  {
    path: `EMA-007-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-007-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '1. 세자리 수의 덧셈을 해요(1)',
    },
  },
  {
    path: `EM-008-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-008-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-008-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-008-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-008-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-008-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '곱셈',
      subChapter: '4. (두 자리 수)×(두 자리 수)를 계산해요(1) ',
    },
    children: [],
  },
  {
    path: `EMA-008-02`,
    element: lazyLoad(() => import('../../samples/A01/EMA-008-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-009-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-009-01')),
    params: {
      ...layouts[EMathLayout.TERTIARY],
    },
  },
  {
    path: `EM-009-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-009-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '1. 세 자리 수의 덧셈을 해요(2)',
    },
    children: [],
  },
  {
    path: `EM-009-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-009-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },

  {
    path: `EM-010-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-010-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-010-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-010-02')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-011-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-011-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-012-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-012-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-012-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-012-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-013-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-013-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '7. 어림셈을 해요',
    },
    children: [],
  },
  {
    path: `EMA-013-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-013-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '7. 어림셈을 해요',
    },
    children: [],
  },
  {
    path: `EM-013-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-013-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '7. 어림셈을 해요',
    },
    children: [],
  },
  {
    path: `EM-014-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-014-01')),
    params: {
      ...layouts[EMathLayout.SECONDARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-014-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-014-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-015-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-015-01')),
    params: {
      ...layouts[EMathLayout.TERTIARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-016-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-016-01')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-017-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-017-01')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-018-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-018-01')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-018-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-018-02')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-019-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-019-01')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      subChapter: '문제로 마무리',
    },
    children: [],
  },
  {
    path: `EM-020-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-020-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EM-020-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-020-02')),
    params: {
      ...layouts[EMathLayout.TERTIARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-021-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-021-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-021-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-021-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
    },
  },
  {
    path: `EM-021-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-021-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
    },
  },
  {
    path: `EM-022-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-022-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1.',
      mainChapter: '덧셈과 뺄셈',
      subChapter: '7. 어림셈을 해요',
    },
    children: [],
  },
  {
    path: `EM-023-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-023-01')),
    params: {
      ...layouts[EMathLayout.SECONDARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-024-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-024-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '단원 도입',
    },
    children: [],
  },
  {
    path: `EM-025-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-025-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      chapterNum: '3.',
      mainChapter: '나눗셈',
    },
    children: [],
  },
  {
    path: `EM-025-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-025-02')),
    params: {
      ...layouts[EMathLayout.INTRO],
      chapterNum: '3.',
      mainChapter: '나눗셈',
    },
    children: [],
  },
  {
    path: `EM-026-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-026-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
    },
  },
  {
    path: `EM-026-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-026-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '2. 나눗셈식을 알아봐요(2)',
    },
  },
  {
    path: `EM-026-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-026-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '1. 나눗셈식을 알아봐요(1)',
    },
  },
  {
    path: `EM-027-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-027-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '4. 나눗셈의 몫을 구해요',
    },
    children: [],
  },
  {
    path: `EM-027-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-027-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '4. 나눗셈의 몫을 구해요',
    },
    children: [],
  },
  {
    path: `EM-027-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-027-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5. ',
      mainChapter: '길이와 시간',
      subChapter: '1. mm를 알아봐요',
    },
    children: [],
  },
  {
    path: `EM-027-06`,
    element: lazyLoad(() => import('../../samples/A01/EM-027-06')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '7. 계산이 맞는지 확인해요',
    },
    children: [],
  },
  {
    path: `EM-027-04`,
    element: lazyLoad(() => import('../../samples/A01/EM-027-04')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3. ',
      mainChapter: '나눗셈',
      subChapter: '2. (두 자리 수)÷(한 자리 수)를 계산해요(2)',
    },
    children: [],
  },
  {
    path: `EM-027-05`,
    element: lazyLoad(() => import('../../samples/A01/EM-027-05')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3. ',
      mainChapter: '나눗셈',
      subChapter: '4. (두 자리 수)÷(한 자리 수)를 계산해요(4)',
    },
    children: [],
  },
  {
    path: `EM-029-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-029-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
    },
  },
  {
    path: `EM-028-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-028-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
    },
    children: [],
  },
  {
    path: `EM-030-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-030-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '3. 곱셈과 나눗셈의 관계를 알아봐요',
    },
    children: [],
  },
  {
    path: `EM-031-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-031-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      mainChapter: '나눗셈',
      subChapter: '4. 나눗셈의 몫을 구해요',
    },
    children: [],
  },
  {
    path: `EM-031-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-031-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      mainChapter: '나눗셈',
      subChapter: '1. 나눗셈식을 알아봐요(1)',
    },
    children: [],
  },
  {
    path: `EM-032-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-032-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      // subChapter: '',
    },
    children: [],
  },

  {
    path: `EM-033-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-033-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '4. 나눗셈의 몫을 구해요',
    },
  },
  {
    path: `EM-034-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-034-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '4.',
      mainChapter: '나눗셈',
      subChapter: '4. 나눗셈의 몫을 구해요',
    },
    children: [],
  },
  {
    path: `EM-034-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-034-02')),
    params: {
      ...layouts[EMathLayout.SECONDARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '함께하는 수학',
    },
    children: [],
  },
  {
    path: `EM-034-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-034-03')),
    params: {
      ...layouts[EMathLayout.SECONDARY],
      // subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-035-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-035-01')),
    params: {
      ...layouts[EMathLayout.TERTIARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '해결하는 수학',
    },
    children: [],
  },
  {
    path: `EM-036-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-036-01')),
    params: {
      ...layouts[EMathLayout.TERTIARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '해결하는 수학',
    },
    children: [],
  },
  {
    path: `EM-036-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-036-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '3. 길이를 어림해요',
    },
    children: [],
  },
  {
    path: `EM-036-02-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-036-02-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EMA-036-02`,
    element: lazyLoad(() => import('../../samples/A01/EMA-036-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '4학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-037-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-037-01')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
    },
    children: [],
  },
  {
    path: `EM-037-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-037-02')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
    },
    children: [],
  },
  {
    path: `EM-038-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-038-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '함께하는 수학',
    },
    children: [],
  },
  {
    path: `EM-039-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-039-01')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
    },
    children: [],
  },
  {
    path: `EM-040-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-040-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
    },
    children: [],
  },
  {
    path: `EM-041-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-041-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '단원 도입',
    },
    children: [],
  },
  {
    path: `EM-054-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-054-01')),
    params: {
      ...layouts[EMathLayout.INTRO],
      chapterNum: '2.',
      mainChapter: '평면도형',
      subChapter: '단원 도입',
    },
    children: [],
  },
  {
    path: `EM-041-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-041-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '4. 초를 알아봐요',
    },
    children: [],
  },
  {
    path: `EM-041-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-041-03')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '문제로 마무리',
    },
    children: [],
  },
  {
    path: `EM-042-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-042-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '1.mm를 알아봐요',
    },
    children: [],
  },

  {
    path: `EM-043-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-043-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '1. mm를 알아봐요',
    },
  },

  {
    path: `EM-044-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-044-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '1. mm를 알아봐요',
    },
  },
  {
    path: `EM-045-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-045-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '2. km를 알아봐요',
    },
    children: [],
  },
  {
    path: `EM-046-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-046-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '3. 길이를 어림해요',
    },
    children: [],
  },
  {
    path: `EM-047-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-047-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '5.길이와 시간',
    },
    children: [],
  },
  {
    path: `EM-048-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-048-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '5. 시간의 덧셈과 뺄셈을 해요(2)',
    },
    children: [],
  },
  {
    path: `EM-048-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-048-02')),
    params: {
      ...layouts[EMathLayout.QUATERNARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '문제로 마무리',
    },
    children: [],
  },
  {
    path: `EM-049-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-049-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3',
      mainChapter: '학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-049-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-049-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '4',
      mainChapter: '학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-049-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-049-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '4학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-050-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-050-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '4학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-050-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-050-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '4학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-051-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-051-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      mainChapter: '4학년 진단평가',
    },
    children: [],
  },
  {
    path: `EM-052-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-052-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '4학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-069-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-069-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '4. (두 자리 수)÷(한 자리 수)를 계산해요(4)',
    },
    children: [],
  },
  {
    path: `EM-069-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-069-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '4. (두 자리 수)÷(한 자리 수)를 계산해요(4)',
    },
    children: [],
  },
  {
    path: `EM-069-03`,
    element: lazyLoad(() => import('../../samples/A01/EM-069-03')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '4. (두 자리 수)÷(한 자리 수)를 계산해요(4)',
    },
    children: [],
  },
  {
    path: `EM-074-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-074-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '5. 시간의 덧셈과 뺄셈을 해요(1)',
    },
    children: [],
  },
  {
    path: `EM-074-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-074-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '5. 시간의 덧셈과 뺄셈을 해요(1)',
    },
    children: [],
  },
  {
    path: 'EM-084-01',
    element: lazyLoad(() => import('../../samples/A01/EM-084-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '2. km를 알아봐요',
    },
    children: [],
  },
  {
    path: 'EM-097-01',
    element: lazyLoad(() => import('../../samples/A01/EM-097-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '1. mm를 알아봐요',
    },
    children: [],
  },
  {
    path: 'EM-098-01',
    element: lazyLoad(() => import('../../samples/A01/EM-098-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '3 길이를 어림해요',
    },
    children: [],
  },
  {
    path: 'EM-098-02',
    element: lazyLoad(() => import('../../samples/A01/EM-098-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '3 길이를 어림해요',
    },
    children: [],
  },
  {
    path: 'EM-101-01',
    element: lazyLoad(() => import('../../samples/A01/EM-101-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '5. 시간의 덧셈과 뺄셈을 해요(2)',
    },
    children: [],
  },
  {
    path: `EM-101-02`,
    element: lazyLoad(() => import('../../samples/A01/EM-101-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '5. 시간의 덧셈과 뺄셈을 해요(2)',
    },
  },
  {
    path: `EM-102-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-102-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '문제로 마무리',
    },
  },
  {
    path: 'EM-104-01',
    element: lazyLoad(() => import('../../samples/A01/EM-104-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: 'EM-105-01',
    element: lazyLoad(() => import('../../samples/A01/EM-105-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
    children: [],
  },
  {
    path: `EM-106-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-106-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
  },
  {
    path: `EMA-004-02`,
    element: lazyLoad(() => import('../../samples/A01/EMA-004-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
  },
  {
    path: `EMA-009-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-009-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '2. (두 자리수)÷(한 자리 수)를 계산해요(2)',
    },
  },
  {
    path: `EMA-009-02`,
    element: lazyLoad(() => import('../../samples/A01/EMA-009-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '2. (세 자리수)÷(한 자리 수)를 계산해요(2)',
    },
  },
  {
    path: `EMA-010-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-010-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '6.',
      mainChapter: '분수와 소수',
      subChapter: '4. 단위분수를 알아봐요',
    },
    children: [],
  },
  {
    path: `EMA-005-02`,
    element: lazyLoad(() => import('../../samples/A01/EMA-005-02')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '1. ',
      mainChapter: '곱셈',
      subChapter: '4. (두 자리 수)×(두 자리 수)를 계산해요(1)',
    },
  },
  {
    path: `EMA-011-01`,
    element: lazyLoad(() => import('../../samples/A01/EMA-011-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
  },
  {
    path: 'EM-099-01',
    element: lazyLoad(() => import('../../samples/A01/EM-099-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '3. 길이를 어림해요',
    },
    children: [],
  },
  {
    path: `EM-100-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-100-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '5.',
      mainChapter: '길이와 시간',
      subChapter: '4. 초를 알아봐요',
    },
    children: [],
  },
  {
    path: `EM-103-01`,
    element: lazyLoad(() => import('../../samples/A01/EM-103-01')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
  },
  {
    path: `EM-EX-001`,
    element: lazyLoad(() => import('../../samples/A01/EM-EX-001')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '',
      mainChapter: '3학년 진단평가',
      subChapter: '',
    },
  },
  {
    path: `LatexInputterSample`,
    element: lazyLoad(() => import('../../samples/A01/LatexInputterSample')),
    params: {
      ...layouts[EMathLayout.QUINARY],
      chapterNum: '3.',
      mainChapter: '나눗셈',
      subChapter: '2. 나눗셈식을 알아봐요(2)',
    },
    children: [],
  },
];
