import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { addVocab } from "../api/vocabApi";
import useVocabFormInputs from "../hooks/useVocabFormInput";
import VocabTypeSelector from "./VocabTypeSelector";

/*
単語登録フォーム
*/
export default function VocabRegistrationForm() {
  // フォーム入力
  const wordRef = useRef();
  const meaningRef = useRef();
  const { getValuesAndValidate, resetFormInputs } = useVocabFormInputs({
    wordRef,
    meaningRef
  });

  // 単語の種別はステートで管理
  const [typeId, setTypeId] = useState(1);
  // バリデ―ジョンエラー表示用
  const [showValidationError, setShowValidationError] = useState(false);

  // React Query
  const QueryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newVocab) => addVocab(newVocab),
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["vocabs"] })
  });

  // イベントハンドラ
  const handleSubmit = (e) => {
    e.preventDefault();

    // 入力値の取得(種類はステートから取得)
    const { word, meaning, isValid } = getValuesAndValidate();

    // バリデーション(未入力チェック)
    if (!isValid) {
      setShowValidationError(true);
      return;
    }

    // データの追加
    const vocabType = { id: typeId };
    addMutation.mutate({ word, meaning, vocabType });

    // フォームの初期化
    setShowValidationError(false);
    resetFormInputs();
    setTypeId(1);
  };

  return (
    <div className="my-3">
      {showValidationError ? (
        <div className="alert alert-warning">入力に不備があります</div>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="d-inline-block me-3">
            単語・構文:
            <input className="ms-2" type="text" ref={wordRef} />
          </label>
          <label className="d-inline-block me-3">
            種類:
            <VocabTypeSelector
              typeId={typeId}
              setTypeId={setTypeId}
              additionalClassName="ms-2"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="d-flex me-3">
            <span>意味・解説:</span>
            <textarea className="ms-2" cols={100} ref={meaningRef} />
          </label>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
        <input type="submit" className="btn btn-success" value="登録" />
        </div>
      </form>
    </div>
  );
}
