import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";

const colors = {
  bg: "#111111",
  bgElevated: "#171717",
  bgActive: "#1A1A1A",
  bgGutter: "#111111",
  bgSelectionFocused: "#1e4e8c",
  fg: "#C9D1D9",
  fgDim: "#8B949E",
  border: "#2E2E2E",
  cursor: "#C9D1D9",
  comment: "#6A9955",
  keyword: "#FF7B72",
  controlKeyword: "#D2A8FF",
  string: "#A5D6FF",
  number: "#79C0FF",
  function: "#D2A8FF",
  type: "#7EE787",
  variable: "#FFA657",
  constant: "#79C0FF",
  operator: "#FF7B72",
  bracket: "#FFD700",
  tag: "#7EE787",
  attribute: "#79C0FF",
  regexp: "#FF7B72",
  meta: "#A9B2C3",
  searchBg: "#515C6A",
  searchCurrent: "#0A2568",
  searchMatchBg: "#612E0F",
  lineNumber: "#484F58",
  lineNumberActive: "#C9D1D9",
  foldIcon: "#8B949E",
  foldIconActive: "#C9D1D9",
};

export const devroastTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: colors.bg,
      color: colors.fg,
      fontSize: "13px",
      fontFamily:
        "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    "&.cm-focused": {
      outline: "none",
    },
    ".cm-content": {
      caretColor: colors.cursor,
      padding: "12px 0",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: colors.cursor,
      borderLeftWidth: "2px",
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: colors.bgSelectionFocused,
    },
    ".cm-line": {
      padding: "0 16px",
    },
    ".cm-panels": {
      backgroundColor: colors.bgElevated,
      color: colors.fg,
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: `1px solid ${colors.border}`,
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: `1px solid ${colors.border}`,
    },
    ".cm-searchMatch": {
      backgroundColor: colors.searchMatchBg,
      outline: `1px solid ${colors.searchBg}`,
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: colors.searchCurrent,
    },
    ".cm-activeLine": {
      backgroundColor: colors.bgActive,
    },
    ".cm-selectionMatch": {
      backgroundColor: `${colors.bgSelectionFocused}40`,
    },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: `${colors.keyword}20`,
      outline: `1px solid ${colors.keyword}60`,
      borderRadius: "2px",
    },
    ".cm-gutters": {
      backgroundColor: colors.bgGutter,
      color: colors.lineNumber,
      border: "none",
      borderRight: `1px solid ${colors.border}`,
    },
    ".cm-gutterElement": {
      padding: "0 8px",
    },
    ".cm-activeLineGutter": {
      backgroundColor: colors.bgActive,
      color: colors.lineNumberActive,
    },
    ".cm-foldGutter": {
      width: "20px",
    },
    ".cm-foldGutter .cm-gutterElement": {
      padding: "0 4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: colors.bgElevated,
      color: colors.fgDim,
      border: `1px solid ${colors.border}`,
      borderRadius: "4px",
      padding: "0 4px",
    },
    ".cm-tooltip": {
      backgroundColor: colors.bgElevated,
      border: `1px solid ${colors.border}`,
      color: colors.fg,
      borderRadius: "6px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: colors.border,
      borderBottomColor: colors.border,
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: colors.bgElevated,
      borderBottomColor: colors.bgElevated,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: colors.bgActive,
        color: colors.fg,
      },
    },
    ".cm-completionIcon": {
      marginRight: "8px",
    },
    ".cm-completionLabel": {
      fontFamily: "inherit",
    },
    ".cm-completionDetail": {
      color: colors.fgDim,
      fontStyle: "italic",
      marginLeft: "12px",
    },
    ".cm-hintSection": {
      borderTop: `1px solid ${colors.border}`,
      padding: "8px",
    },
    ".cm-scroller": {
      overflow: "auto",
      fontFamily: "inherit",
    },
  },
  { dark: true },
);

export const devroastHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: colors.keyword },
  { tag: [t.controlKeyword, t.name], color: colors.controlKeyword },
  { tag: t.operator, color: colors.operator },
  { tag: t.punctuation, color: colors.fg },
  { tag: t.bracket, color: colors.bracket },
  { tag: t.string, color: colors.string },
  { tag: [t.literal, t.number], color: colors.number },
  { tag: t.bool, color: colors.number },
  { tag: t.null, color: colors.keyword },
  { tag: t.comment, color: colors.comment, fontStyle: "italic" },
  { tag: t.lineComment, color: colors.comment, fontStyle: "italic" },
  { tag: t.blockComment, color: colors.comment, fontStyle: "italic" },
  { tag: t.function(t.variableName), color: colors.function },
  { tag: t.function(t.propertyName), color: colors.function },
  { tag: t.definition(t.variableName), color: colors.variable },
  { tag: t.definition(t.propertyName), color: colors.variable },
  { tag: t.variableName, color: colors.variable },
  { tag: t.propertyName, color: colors.fg },
  { tag: t.typeName, color: colors.type },
  { tag: t.className, color: colors.type },
  { tag: t.tagName, color: colors.tag },
  { tag: t.attributeName, color: colors.attribute },
  { tag: t.attributeValue, color: colors.string },
  { tag: t.constant(t.variableName), color: colors.constant },
  { tag: t.constant(t.propertyName), color: colors.constant },
  { tag: t.regexp, color: colors.regexp },
  { tag: t.escape, color: colors.controlKeyword },
  { tag: t.special(t.string), color: colors.string },
  { tag: t.meta, color: colors.meta },
  { tag: t.link, color: colors.keyword, textDecoration: "underline" },
  { tag: t.heading, color: colors.keyword, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  {
    tag: t.invalid,
    color: colors.regexp,
    textDecoration: "underline wavy red",
  },
  { tag: t.processingInstruction, color: colors.meta },
  { tag: t.atom, color: colors.number },
]);

export function createDevroastTheme(): Extension {
  return [devroastTheme, syntaxHighlighting(devroastHighlightStyle)];
}

export { colors as devroastColors };
