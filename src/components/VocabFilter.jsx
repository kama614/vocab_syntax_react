import { useAtom } from "jotai";
import VocabTypeSelector from "./VocabTypeSelector";
import { currentVocabTypeAtom } from "../atoms/currentVocabTypeAtom";

/*
絞り込み用プルダウンメニュー
プロップス: 追加CSSクラス
*/
export default function VocabFilter({ additionalClassName }) {
  const [currentTypeId, setCurrentTypeId] = useAtom(currentVocabTypeAtom);

  return (
    <div className={additionalClassName}>
      絞り込み:
      <VocabTypeSelector
        typeId={currentTypeId}
        setTypeId={setCurrentTypeId}
        showAll={true}
        additionalClassName="ms-2"
      />
    </div>
  );
}
