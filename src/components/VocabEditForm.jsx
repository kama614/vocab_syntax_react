import { useRef, useState } from "react";
import useCreateEditMutation from "../hooks/useCreateEditMutation";
import VocabTypeSelector from "./VocabTypeSelector";
import useVocabFormInputs from "./../hooks/useVocabFormInput";

/*
単語の編集フォーム
プロップス: 単語、編集モード更新関数
*/

export default function VocabEditForm({
  vocab: { id, word, meaning, vocabType, registeredAt, updatedAt },
  setIsEditMode
}) {
  // ミューテーション関数の取得
  const { updateMutation, deleteMutation } = useCreateEditMutation(id);

  // フォーム入力
  const wordRef = useRef();
  const meaningRef = useRef();
  const { getValuesAndValidate } = useVocabFormInputs({ wordRef, meaningRef });

  // 単語の種別はステートで管理
  const [typeId, setTypeId] = useState(vocabType.id);

  // バリデーションエラー表示用
  const [showValidationError, setShowValidationError] = useState(false);

  // 変更確定ボタン
  const handleUpdate = async () => {
    // 入力値の取得(種類はステートから取得)
    const { word, meaning, isValid } = getValuesAndValidate();

    // バリデーション(未入力チェック)
    if (!isValid) {
      setShowValidationError(true);
      return;
    }

    // データの更新
    const vocabType = { id: typeId };
    await updateMutation.mutateAsync({ id, word, meaning, vocabType });

    // 編集モードを解除
    setShowValidationError(false);
    setIsEditMode(false);
  };

  // 削除ボタン
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      {showValidationError ? (
        <div className="alert alert-warning">入力に不備があります</div>
      ) : (
        ""
      )}
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th className="bg-dark text-white">単語・構文</th>
            <td>
              <input type="text" defaultValue={word} ref={wordRef} />
            </td>
          </tr>
          <tr>
            <th className="bg-dark text-white">意味・解説</th>
            <td>
              <textarea cols={80} defaultValue={meaning} ref={meaningRef} />
            </td>
          </tr>
          <tr>
            <th className="bg-dark text-white">種類</th>
            <td>
              <VocabTypeSelector typeId={typeId} setTypeId={setTypeId} />
            </td>
          </tr>
          <tr>
            <th className="bg-dark text-white">登録日時</th>
            <td>{registeredAt}</td>
          </tr>
          <tr>
            <th className="bg-dark text-white">更新日時</th>
            <td>{updatedAt}</td>
          </tr>
        </tbody>
      </table>
      <div className="my-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setIsEditMode(false)}
        >
          キャンセル
        </button>
        <button className="btn btn-warning me-2" onClick={handleUpdate}>
          変更を確定
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          削除
        </button>
      </div>
    </div>
  );
}
