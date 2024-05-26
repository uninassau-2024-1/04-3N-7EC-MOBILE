type Options = [
    {
        readonly allowTwoWayDataBinding?: boolean;
        readonly allowStylePrecedenceDuplicates?: boolean;
        readonly ignore?: readonly string[];
    }
];
export type MessageIds = 'noDuplicateAttributes' | 'suggestRemoveAttribute';
export declare const RULE_NAME = "no-duplicate-attributes";
declare const _default: import("@typescript-eslint/utils/ts-eslint").RuleModule<MessageIds, Options, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
export default _default;
//# sourceMappingURL=no-duplicate-attributes.d.ts.map