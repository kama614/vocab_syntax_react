import { useQuery } from "@tanstack/react-query";
import { getVocabTypes } from "../api/vocabApi";

/*
単語の種類を選択するためのプルダウンメニュー
※ 選択中の種類IDは、親コンポーネントで管理する

プロップス:
1.現在選択中の種類ID
2.選択中の種類IDを変更するための関数
3.選択肢「全て」を表示するか否か
4.追加のCSSクラス
*/

export default function VocabTypeSelector({
  typeId,
  setTypeId,
  showAll,
  additionalClassName
}) {
  // 種類一覧の取得
  const { data: types, isLoading } = useQuery({
    queryKey: ["vocabTypes"],
    queryFn: getVocabTypes,
    staleTime: Infinity
  });
  return (
    <select
      className={additionalClassName}
      value={typeId}
      onChange={(e) => setTypeId(Number(e.target.value))}
    >
      {showAll ? <option value={0}>全て</option> : ""}
      {isLoading ? (
        <option>-</option>
      ) : (
        types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))
      )}
    </select>
  );
}
