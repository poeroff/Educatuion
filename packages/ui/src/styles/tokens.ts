import { TableSet } from './emotion';
import { EStyleThemeTypes, ETypographyTypes, EStyleFontSizes, EStyleButtonTypes, EStyleShadowedButtonTypes, EStyleTableTypes } from './types';
import { ButtonSet, TagSet, TypographySet } from '@emotion/react';

export const buttons: ButtonSet = {
  [EStyleButtonTypes.NORMAL]: {
    background: 'none',
  },
  [EStyleButtonTypes.PRIMARY]: {
    color: 'var(--color-white)',
    background: '#232426',
  },
  [EStyleButtonTypes.DEFAULT]: {
    color: '#232426',
    background: '#EFF0F2',
  },
  [EStyleButtonTypes.SECONDARY]: {
    color: '#6A6D73',
    background: 'var(--color-white)',
    border: '1px solid #B0B6C0',
  },
  [EStyleButtonTypes.SUCCESS]: {
    color: '#00A42E',
    background: 'var(--color-white)',
    border: '1px solid #00A42E',
  },
  [EStyleButtonTypes.TERTIARY]: {
    color: '#B0B6C0',
    background: 'var(--color-white)',
    border: '1px solid #B0B6C0',
    borderRadius: '24px',
    padding: '6px 16px',
    fontSize: '16px',
  },
  [EStyleButtonTypes.YELLOW]: {
    color: '#232426',
    background: 'var(--color-yellow-500)',
    borderRadius: '24px',
    padding: '6px 16px',
    fontSize: '16px',
  },
  [EStyleButtonTypes.GRAY]: {
    color: '#232426',
    background: '#EFF0F2',
    border: '1px solid #B0B6C0',
    borderRadius: '24px',
    padding: '6px 16px',
    fontSize: '16px',
  },

  [EStyleButtonTypes.BROWN]: {
    color: 'var(--color-white)',
    background: 'var(--color-yellow-700)',
    borderRadius: '24px',
    padding: '6px 16px',
    fontSize: '16px',
  },

  [EStyleButtonTypes.LIGHTBROWN]: {
    color: 'var(--color-black)',
    background: 'var(--color-yellow-100)',
    fontSize: '24px',
    fontWeight: '500',
  },

  [EStyleButtonTypes.BLUE]: {
    color: 'var(--color-white)',
    background: 'var(--color-blue-800)',
    fontSize: '24px',
    fontWeight: '500',
  },

  [EStyleButtonTypes.LIGHTBLUE]: {
    color: 'var(--color-black)',
    background: 'var(--color-blue-100)',
    fontSize: '24px',
    fontWeight: '500',
  },
};

const baseShadowedButtonStyle = {
  display: 'flex',
  justifyContent: 'center',

  fontSize: '24px',
  fontWeight: '700',
  color: '#232426',

  borderRadius: '8px',
} as const;

export const shadowedButtons = {
  [EStyleShadowedButtonTypes.DEFAULT]: {
    ...baseShadowedButtonStyle,
    background: 'var(--color-white)',
  },
  [EStyleShadowedButtonTypes.PRIMARY]: {
    ...baseShadowedButtonStyle,
    background: '#f4f8ff',
    border: '2px solid #1d77ff',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  [EStyleShadowedButtonTypes.SUCCESS]: {
    ...baseShadowedButtonStyle,
    background: '#F8FEE8',
    border: '2px solid #70C954',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  [EStyleShadowedButtonTypes.WARNING]: {
    ...baseShadowedButtonStyle,
    background: '#fff4f3',
    border: '2px solid #eb1807',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
};

export const tags: TagSet = {
  [EStyleThemeTypes.PRIMARY]: {
    background: 'var(--color-blue-500)',
    color: 'var(--color-white)',
  },
  [EStyleThemeTypes.DEFAULT]: {
    background: 'var(--color-grey-900)',
    color: 'var(--color-white)',
  },
};
export const typographies: TypographySet = {
  [ETypographyTypes.TITLE]: {
    size: EStyleFontSizes.LARGE,
    color: 'var(--color-black)',
    weight: 'bold',
  },
  [ETypographyTypes.BODY]: {
    size: EStyleFontSizes.MEDIUM,
    color: 'var(--color-black)',
  },
  [ETypographyTypes.CAPTION]: {
    size: EStyleFontSizes.SMALL,
    color: 'var(--color-grey-900)',
  },
};

export const tables: TableSet = {
  [EStyleTableTypes.DEFAULT]: {
    list: {},
    table: {
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'center',
      color: '#000000',
      lineHeight: '47px',
      padding: '6px 20px',
      backgroundColor: '#E2F2FF',
    },
    td: { padding: '6px 8px' },
    cssStyle: `
      th, td { border: 1px solid var(--color-grey-200) } 
    `,
  },
  [EStyleTableTypes.SECONDARY]: {
    // List Table
    list: {},
    table: {
      border: '1px solid #C0C5CC',
      borderRadius: '8px',
      borderCollapse: 'separate',
    },
    th: {
      textAlign: 'start',
      fontWeight: 700,
      color: `${'var(--color-white)'}`,
      padding: '16px 14px',
    },
    td: {
      padding: '0 12px 0 24px',
    },
    cssStyle: `
      tr {
        height : 67px;
      }

      tr:nth-of-type(odd) {
        background-color : #F7EFF6;
        > th {
          position: relative;
          background-color: #AA54A1;

          &::before {
            content: ""; 
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #F7EFF6; 
            border-radius: 8px 0 0 0;
            z-index: -1;
          }
        }
      }

      tr:nth-of-type(even) {
        background-color : #D3ECF2;
        > th {
          position: relative;
          background-color : #2294B4;

          &::before {
            content: ""; 
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #D3ECF2; 
            border-radius: 0 0 0 8px;
            z-index: -1;
          }
        }
      }

      tr:first-of-type {
        > th {
          border-radius : 7px 7px 0px 0px;
        }
        > td {
          border-radius : 0px 7px 0px 0px;
        }
      }
      
      tr:last-of-type {
        > th {
          border-radius : 0px 0px 7px 7px;
        }
        > td {
          border-radius : 0px 0px 7px 0px;
        }
      }
    `,
  },
  [EStyleTableTypes.TERTIARY]: {
    list: {},
    table: { borderCollapse: 'collapse' },
    th: { color: '#00593E', lineHeight: '52px', padding: '8px 0', backgroundColor: '#C0E4CB', fontSize: 'var(--font-size-24),' },
    td: { padding: '8px 0', lineHeight: '52px', color: 'var(--color-black)' },
    cssStyle: `th, td { border: 1px solid var(--color-grey-200) }`,
  },
  [EStyleTableTypes.GRAY]: {
    // List Table
    list: {},
    table: {
      border: '1px solid var(--color-grey-200)',
      borderCollapse: 'collapse',
    },

    th: {
      textAlign: 'center',
      fontWeight: 700,
      color: `${'var(--color-black)'}`,
      padding: '10px 9px',
      fontSize: '28px',
      backgroundColor: '#EFF0F2',
    },

    td: {
      textAlign: 'center',
      padding: '14px 8px',
    },

    cssStyle: `th, td { border: 1px solid var(--color-grey-200) }`,
  },
  [EStyleTableTypes.RED]: {
    // List Table
    list: {},
    table: {
      borderCollapse: 'collapse',
    },

    th: {
      textAlign: 'center',
      fontWeight: 700,
      color: `${'var(--color-black)'}`,
      padding: '10px 9px',
      fontSize: '28px',
      backgroundColor: 'var(--color-pink-1050)',
    },

    td: {
      textAlign: 'center',
      padding: '14px 8px',
    },

    cssStyle: `
      th, td { 
        border: 1px solid var(--color-pink-1000);
      }
    `,
  },
  [EStyleTableTypes.MATH]: {
    list: {},
    table: { borderCollapse: 'collapse', borderSpacing: '2px' },
    th: {},
    td: {},
    cssStyle: `
      font-size: 28px;
      line-height: 42px;

      span{
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip-path:inset(50%);
        border:0;
        clip:rect(0 0 0 0);
      }

      tr {
        display:flex;
        flex-direction:row-reverse;
      }
      tr th, tr td {
        flex:1 1 auto;
        text-align:center;
        width: 52px;
        min-height: 52px;
        line-height: 52px;
      }
      tbody tr:first-of-type td {
        border-top:none;
      }
      tbody tr:last-of-type td {
        border-bottom:none;
      }
      tbody tr td {
        border-bottom: 0.5px dotted var(--color-blue-1000);
        border-right: 0.5px dotted var(--color-blue-1000);
        padding: 0 !important;
      }
      tbody tr td:first-of-type {
        border-right: none !important;
      }
      tr td:last-of-type{
        border-left:none;
      }
      tfoot tr td{
        border-top:2px solid #333;
        padding: 1px !important;
        border-right: 0.5px dotted var(--color-blue-1000); 
      }
      tfoot tr td:first-of-type {
        border-right: none !important;
      }
      tr td input{
        height: 50px;
        width:100%;
        text-align:center;
        box-sizing:border-box;
      }
    `,
  },
  [EStyleTableTypes.MATH_DIVIDE]: {
    list: {},
    table: { borderCollapse: 'collapse', borderSpacing: '2px' },
    th: {},
    td: {},
    cssStyle: `
      font-size: 28px;
      line-height: 42px;

      span{
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip-path:inset(50%);
        border:0;
        clip:rect(0 0 0 0);
      }

      tr {
        display:flex;
      }
      tr th, tr td {
        flex:1 1 auto;
        display:flex;
        justify-content: center;
        align-items: center;
        text-align:center;
        width: 59px;
        min-height: 57px;
        line-height: 57px;
      }
      tbody tr:first-of-type td {
        border-top:none;
      }
      tbody tr:last-of-type td {
        border-bottom:none;
      }
      tbody tr th, tbody tr td {
        border-bottom: 0.5px dotted var(--color-blue-300);
        border-right: 0.5px dotted var(--color-blue-300);
        padding: 0 !important;
      }
      tbody tr td:last-of-type {
        border-right: none !important;
      }
      tfoot tr td{
        padding: 1px !important;
        border-left: 0.5px dotted var(--color-blue-300); 
      }
      tfoot tr td:first-of-type {
        border-left: none !important;
      }
      tr td input{
        height: 50px;
        width: 50px;
        text-align:center;
        box-sizing:border-box;
        margin: 0 auto;
      }
    `,
  },
  [EStyleTableTypes.MATH_NONE]: {
    list: {},
    table: { borderCollapse: 'collapse', borderSpacing: '2px' },
    th: {},
    td: {},
    cssStyle: `
      font-size: 28px;
      line-height: 42px;

      caption, span{
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip-path:inset(50%);
        border:0;
        clip:rect(0 0 0 0);
      }

      tr {
        display:flex;
        flex-direction:row-reverse;
      }
      tr th, tr td {
        flex:1 1 auto;
        text-align:center;
        width: 52px;
      }
      tbody tr:first-of-type td {
        border-top:none;
      }
      tbody tr:last-of-type td {
        border-bottom:none;
      }
      tbody tr td {
        padding: 0 !important;
        
      }
      tbody tr td:first-of-type {
        border-right: none !important;
      }
      tr td:last-of-type{
        border-left:none;
      }
      tfoot td{
        border-top:2px solid #333;
        padding: 1px !important;
      }
      tfoot td input{
        width:100%;
        text-align:center;
        box-sizing:border-box;
      }
    `,
  },
  [EStyleTableTypes.COLORFUL]: {
    list: {},
    table: {},
    th: {
      fontWeight: 700,
      lineHeight: '40px',
    },
    td: {
      padding: '8px',
    },
    cssStyle: `
      th, td { border: 1px solid var(--color-grey-200) }
      tr:first-of-type {
        > th {
          background-color : var(--color-pink-200);
        }
      }
      
      tr:nth-of-type(2) {
        > th {
          background-color : #BADDFF;
        }
      }

      tr:nth-of-type(3) {
        > th {
          background-color : var(--color-yellow-100);
        }
      }
      
      tr:last-of-type {
        > th {
          background-color : #C0E4CB;
        }
      }

    `,
  },
  [EStyleTableTypes.YELLOW_SECONDARY]: {
    list: {},
    table: { borderCollapse: 'collapse' },
    th: {
      color: 'var(--color-grey-900)',
      lineHeight: '50px',
      padding: '8px 0',
      backgroundColor: 'var(--color-yellow-100)',
      fontSize: 'var(--font-size-24),',
    },
    td: { padding: '16px 0' },
    cssStyle: `th, td { border: 1px solid var(--color-grey-200) }`,
  },
  [EStyleTableTypes.YELLOW_TERTIARY]: {
    list: {},
    table: { borderCollapse: 'collapse' },
    th: {
      color: 'var(--color-grey-900)',
      lineHeight: '50px',
      padding: '8px 0',
      backgroundColor: 'var(--color-yellow-200)',
      fontSize: 'var(--font-size-24),',
    },
    td: { padding: '16px 0' },
    cssStyle: `th, td { border: 1px solid var(--color-grey-200) }`,
  },
  [EStyleTableTypes.PINK_AND_GREEN]: {
    list: {},
    table: {},
    th: {
      fontWeight: 700,
      lineHeight: '40px',
      padding: '8px 20px',
    },
    td: {
      lineHeight: '40px',
      padding: '8px',
    },
    cssStyle: `
      th, td { border: 1px solid var(--color-grey-200) }

      thead:first-of-type {
        th:nth-of-type(odd) {
          background-color : var(--color-pink-200);
        }
        th:nth-of-type(even) {
          background-color : var(--color-green-100);
        }
      }

      tr:first-of-type {
        td:nth-of-type(odd) {
          background-color : var(--color-pink-100);
        }
        td:nth-of-type(even) {
          background-color : var(--color-green-50);
        }

        > td {
          padding: 30px 0 !important;
        }
      }
    `,
  },
  [EStyleTableTypes.ENGLISH_POINT]: {
    list: {},
    table: {},
    th: {},
    td: {
      border: '2px solid var(--color-pink-400)',
      backgroundColor: 'var(--color-yellow-50)',
    },
    cssStyle: ``,
  },
};
