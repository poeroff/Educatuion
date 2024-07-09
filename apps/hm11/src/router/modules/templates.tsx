import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout, EMathLayout } from '@maidt-cntn/ui';

const templates: IRouteObject[] = [
  {
    path: 'samples',
    element: lazyLoad(() => import('../../App')),
    children: [
      {
        path: `HM-000-01`,
        element: lazyLoad(() => import('../../samples/A01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-001-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-001-01')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'math_thumb',
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-002-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-002-01')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'math_intro',
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-003-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-003-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-004-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-004-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-004-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-004-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-005-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-005-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-005-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-005-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지정리와 인수분해',
        },
        children: [],
      },
      {
        path: `HM-005-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-005-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지정리와 인수분해',
        },
        children: [],
      },
      {
        path: `HM-005-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-005-04')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지정리와 인수분해',
        },
        children: [],
      },
      {
        path: `HM-005-05`,
        element: lazyLoad(() => import('../../samples/A01/HM-005-05')),
        params: {
          ...layouts[ELayout.SECONDARY],
          mainChapter: '방정식과 부등식',
          subChapter: '3. 여러 가지 방정식과 부등식',
          minorChapter: '01 삼차방정식과 사차방정식',
        },
        children: [],
      },
      {
        path: `HM-005-06`,
        element: lazyLoad(() => import('../../samples/A01/HM-005-06')),
        params: {
          ...layouts[ELayout.SECONDARY],
          mainChapter: '방정식과 부등식',
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '03 이차방정식의 근과 계수의 관계',
        },
        children: [],
      },
      {
        path: `HM-006-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-006-01')),
        params: {
          ...layouts[ELayout.INTRO],
          backGroundColor: 'math_index',
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-007-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-007-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-008-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-008-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-008-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-008-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-04')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-008-05`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-05')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-008-06`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-06')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-008-07`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-07')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-008-08`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-08')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '02 나머지정리',
        },
        children: [],
      },
      {
        path: `HM-008-09`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-09')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '02 나머지정리',
        },
        children: [],
      },
      {
        path: `HM-008-10`,
        element: lazyLoad(() => import('../../samples/A01/HM-008-10')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지 정리와 인수분해',
          minorChapter: '03 인수분해',
        },
        children: [],
      },
      {
        path: `HM-009-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-009-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-009-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-009-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-009-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-009-04')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '02 나머지정리',
        },
        children: [],
      },
      {
        path: `HM-009-05`,
        element: lazyLoad(() => import('../../samples/A01/HM-009-05')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '01 복소수와 그 연산',
        },
        children: [],
      },
      {
        path: `HM-009-06`,
        element: lazyLoad(() => import('../../samples/A01/HM-009-06')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Ⅱ. ',
          mainChapter: '방정식과 부등식',
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '01 복소수와 그 연산',
        },
        children: [],
      },
      {
        path: `HM-010-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-010-01')),
        params: {
          ...layouts[ELayout.TERTIARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-010-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-010-02')),
        params: {
          ...layouts[ELayout.TERTIARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-011-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-011-01')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-011-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-011-02')),
        params: {
          ...layouts[ELayout.QUATERNARY],
          subChapter: '2. 나머지 정리와 인수분해',
          minorChapter: '01 항등식',
        },
        children: [],
      },
      {
        path: `HM-012-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-012-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-012-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-012-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
      },
      {
        path: `HM-012-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-012-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
      },
      {
        path: `HM-012-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-012-04')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '3. 여러 가지 방정식과 부등식',
          minorChapter: '01 연립일차부등식',
        },
      },
      {
        path: `HM-012-05`,
        element: lazyLoad(() => import('../../samples/A01/HM-012-05')),
        params: {
          ...layouts[ELayout.SECONDARY],
          mainChapter: '방정식과 부등식',
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '01 복소수와 그 연산',
        },
      },
      {
        path: `HM-012-06`,
        element: lazyLoad(() => import('../../samples/A01/HM-012-06')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
        },
      },
      {
        path: `HM-012-07`,
        element: lazyLoad(() => import('../../samples/A01/HM-012-07')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
      },
      {
        path: `HM-013-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-013-01')),
        params: {
          ...layouts[ELayout.TERTIARY],
          backGroundColor: 'img_pink',
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-014-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-014-01')),
        params: {
          ...layouts[ELayout.TERTIARY],
          backGroundColor: 'img_pink',
          subChapter: '2. 다항식의 연산',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-015-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-015-01')),
        params: {
          ...layouts[EMathLayout.TERTIARY],
          backGroundColor: 'img_pink',
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-015-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-015-02')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-015-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-015-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-015-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-015-04')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-015-05`,
        element: lazyLoad(() => import('../../samples/A01/HM-015-05')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          subChapter: '2. 다항식의 연산',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-015-06`,
        element: lazyLoad(() => import('../../samples/A01/HM-015-06')),
        params: {
          ...layouts[EMathLayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
        },
        children: [],
      },
      {
        path: `HM-016-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-016-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },

      {
        path: `HM-016-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-016-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-016-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-016-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-017-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-017-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-017-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-017-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지정리와 인수분해',
          minorChapter: '02 나머지정리',
        },
      },
      {
        path: `HM-017-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-017-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 이차방정식과 이차함수',
          minorChapter: '02 이차함수의 최대, 최소',
        },
      },
      {
        path: `HM-018-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-018-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-018-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-018-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-018-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-018-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-018-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-018-04')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-018-05`,
        element: lazyLoad(() => import('../../samples/A01/HM-018-05')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-019-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-019-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 항등식',
        },
        children: [],
      },
      {
        path: `HM-020-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-020-01')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'white',
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-021-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-021-01')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'img_blue',
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-022-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-022-01')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'white',
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-023-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-023-02')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'white',
          subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-024-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-024-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-025-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-025-02')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'white',
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-025-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-025-03')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'white',
          subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-025-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-025-04')),
        params: {
          ...layouts[ELayout.SENARY],
          backGroundColor: 'white',
          subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-026-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-026-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-026-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-026-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          // subChapter: '',
        },
        children: [],
      },
      {
        path: `HM-027-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-027-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
      },
      {
        path: `HM-028-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-028-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-02')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지 정리와 인수분해',
          minorChapter: '03 인수분해',
        },
        children: [],
      },
      {
        path: `HM-028-03`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-03')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-028-04`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-04')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Ⅱ. ',
          mainChapter: '방정식과 부등식',
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '01 복소수와 그 연산',
        },
        children: [],
      },
      {
        path: `HM-028-05`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-05')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Ⅱ. ',
          mainChapter: '방정식과 부등식',
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '02 이차방정식의 판별식',
        },
        children: [],
      },
      {
        path: `HM-028-06`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-06')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Ⅱ. ',
          mainChapter: '방정식과 부등식',
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '02 이차방정식의 판별식',
        },
        children: [],
      },
      {
        path: `HM-028-07`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-07')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Ⅱ. ',
          mainChapter: '방정식과 부등식',
          subChapter: '2. 이차방정식과 이차함수',
          minorChapter: '02 이차함수의 최대, 최소',
        },
        children: [],
      },
      {
        path: `HM-028-09`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-09')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '3. 여러가지 방정식과 부등식',
          minorChapter: '01 삼차방정식과 사차방정식',
        },
        children: [],
      },
      {
        path: `HM-028-10`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-10')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '3. 여러 가지 방정식과 부등식',
          minorChapter: '03 연립일차부등식',
        },
        children: [],
      },
      {
        path: `HM-028-11`,
        element: lazyLoad(() => import('../../samples/A01/HM-028-11')),
        params: {
          ...layouts[ELayout.SECONDARY],
          minorChapter: '01 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-030-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-030-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지 정리와 인수분해',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-031-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-031-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          backGroundColor: 'math_quiz',
        },
        children: [],
      },
      {
        path: `HM-032-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-032-01')),
        params: {
          ...layouts[ELayout.TERTIARY],
          backGroundColor: 'img_yellow',
        },
        children: [],
      },
      {
        path: `HM-032-02`,
        element: lazyLoad(() => import('../../samples/A01/HM-032-02')),
        params: {
          ...layouts[ELayout.TERTIARY],
          backGroundColor: 'img_yellow',
        },
        children: [],
      },
      {
        path: `HM-034-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-034-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          backGroundColor: 'math_wave_blue',
          subChapter: '1. 다항식의 연산',
          minorChapter: '01 다항식의 덧셈과 뺄셈',
        },
        children: [],
      },
      {
        path: `HM-035-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-035-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          backGroundColor: 'math_quiz',
        },
        children: [],
      },
      {
        path: `HM-036-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-036-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          backGroundColor: 'img_yellow',
        },
        children: [],
      },
      {
        path: `HM-037-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-037-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-037-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-037-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '1. 다항식의 연산',
          minorChapter: '02 다항식의 곱셈과 나눗셈',
        },
        children: [],
      },
      {
        path: `HM-M-037-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-M-037-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          subChapter: '2. 나머지정리와 인수분해',
          minorChapter: '02 나머지정리',
        },
        children: [],
      },
      {
        path: `HM-038-01`,
        element: lazyLoad(() => import('../../samples/A01/HM-038-01')),
        params: {
          ...layouts[ELayout.SECONDARY],
          chapterNum: 'Ⅱ. ',
          mainChapter: '방정식과 부등식',
          subChapter: '1. 복소수와 이차방정식',
          minorChapter: '01 복소수와 그 연산',
        },
        children: [],
      },
    ],
  },
];

export default templates;
