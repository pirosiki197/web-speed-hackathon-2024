type Params = {
  query: string;
  target: string;
};

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  // 正規化して、ひらがな・カタカナ・全角・半角の違いを無視する
  const normalizedQuery = query.normalize('NFKC'); // 正規化 (全角・半角の違いを統一)
  const normalizedTarget = target.normalize('NFKC');

  // target に query が含まれているかを調べる
  return normalizedTarget.includes(normalizedQuery);
}
