import { layouts } from '@/constants/layout';
import { lazyLoad, IRouteObject } from '@maidt-cntn/router';
import { ELayout } from '@maidt-cntn/ui';

const templates: IRouteObject[] = [
  {
    path: 'samples',
    element: lazyLoad(() => import('../../App')),
    children: [
      {
        path: `L01-C02-A02`,
        element: lazyLoad(() => import('../../samples/L01/C02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
      {
        path: `L01-C04-A02`,
        element: lazyLoad(() => import('../../samples/L01/C04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-001-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-001-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-001-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-001-02')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-001-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-001-03')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-002-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-002-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Intro',
        },
        children: [],
      },
      {
        path: `HE-003-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-003-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
      {
        path: `HE-003-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-003-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
      {
        path: `HE-003-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-003-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-003-04`,
        element: lazyLoad(() => import('../../samples/L01/HE-003-04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-004-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-004-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 2 : New School, New Life ',
        },
        children: [],
      },
      {
        path: `HE-004-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-004-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 2 : New School, New Life',
        },
        children: [],
      },
      {
        path: `HE-004-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-004-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 2 : Understanding Others’ Feeling',
        },
        children: [],
      },
      {
        path: `HE-005-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-005-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
      {
        path: `HE-005-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-005-02')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Unit1.',
          mainChapter: 'Are You Ready?',
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-006-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-006-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read ',
        },
        children: [],
      },
      {
        path: `HE-007-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-007-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 2 : Undaerstanding Other’s Feeling ',
        },
        children: [],
      },
      {
        path: `HE-008-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-008-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
      {
        path: `HE-009-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-009-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 2 : Undaerstanding Other’s Feeling',
        },
        children: [],
      },
      {
        path: `HE-009-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-009-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 2 : Understanding Others’ Feeling',
        },
        children: [],
      },
      {
        path: `HE-010-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-010-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 2 : Understanding Others’ Feeling',
        },
        children: [],
      },
      {
        path: `HE-011-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-011-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-011-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-011-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-011-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-011-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : Eco-Sensitivity',
        },
        children: [],
      },
      {
        path: `HE-011-04`,
        element: lazyLoad(() => import('../../samples/L01/HE-011-04')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Unit1.',
          mainChapter: 'Are You Ready?',
          subChapter: 'Think and Write',
        },
        children: [],
      },
      {
        path: `HE-012-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-012-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
      },
      {
        path: `HE-013-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-013-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Before You Read',
        },
      },
      {
        path: `HE-014-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-014-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-015-00`,
        element: lazyLoad(() => import('../../samples/L01/HE-015-00')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-015-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-015-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
      },
      {
        path: `HE-015-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-015-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
      },
      {
        path: `HE-016-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-016-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-016-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-016-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-016-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-016-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-017-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-017-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-017-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-017-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-017-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-017-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Read',
        },
        children: [],
      },
      {
        path: `HE-018-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-018-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-018-02`,
        element: lazyLoad(() => import('../../samples/L01/HE01802')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-018-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-018-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-018-04`,
        element: lazyLoad(() => import('../../samples/L01/HE-018-04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-019-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-019-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-019-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-019-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-019-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-019-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-021-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-021-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-021-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-021-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak 1 : New School, New Life',
        },
        children: [],
      },
      {
        path: `HE-022-00`,
        element: lazyLoad(() => import('../../samples/L01/HE-022-00')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `HE-022-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-022-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `HE-022-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-022-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Language in Use',
        },
        children: [],
      },
      {
        path: `HE-022-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-022-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-022-04`,
        element: lazyLoad(() => import('../../samples/L01/HE-022-04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-023-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-023-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-024-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-024-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Project + Culture : Heart-Warming Relationships in Movies',
        },
        children: [],
      },
      {
        path: `HE-024-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-024-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Project + Culture : Heart-Warming Relationships in Movies',
        },
        children: [],
      },
      {
        path: `HE-024-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-024-03')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 3.',
          mainChapter: 'Free Yourself with Science',
          subChapter: 'Project + Culture : Inventions Ahead of Their Time PAST',
        },
        children: [],
      },
      {
        path: `HE-025-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-025-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-025-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-025-02')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-025-03`,
        element: lazyLoad(() => import('../../samples/L01/HE-025-03')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-025-04`,
        element: lazyLoad(() => import('../../samples/L01/HE-025-04')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-026-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-026-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Listen & Speak',
        },
        children: [],
      },
      {
        path: `HE-027-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-027-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-028-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-028-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-029-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-029-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-029-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-029-02')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-030-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-030-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-031-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-031-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-032-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-032-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-033-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-033-01')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 3.',
          mainChapter: 'The True Art Lovers',
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-034-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-034-01')),
        params: {
          ...layouts[ELayout.INTRO],
          chapterNum: 'Lesson 2.',
          mainChapter: 'Be a Wise Consumer',
          subChapter: 'After You Read',
        },
        children: [],
      },
      {
        path: `HE-035-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-035-01')),
        params: {
          ...layouts[ELayout.INTRO],
          subChapter: 'Plan & Present : Speech | Welcome to High School',
        },
        children: [],
      },
      {
        path: `HE-036-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-036-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-037-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-037-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-037-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-037-02')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-038-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-038-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-039-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-039-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-040-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-040-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-041-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-041-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-042-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-042-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-043-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-043-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-044-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-044-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-045-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-045-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-045-02`,
        element: lazyLoad(() => import('../../samples/L01/HE-045-02')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-046-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-046-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-047-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-047-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-048-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-048-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
      {
        path: `HE-049-01`,
        element: lazyLoad(() => import('../../samples/L01/HE-049-01')),
        params: {
          ...layouts[ELayout.INTRO],
        },
        children: [],
      },
    ],
  },
];

export default templates;
