import VocabListTableRow from "./VocabListTableRow";

/*
単語リスト表示テーブル
プロップス：単語リスト(配列)
*/

export default function VocabListTable({ vocabList }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>単語・構文</th>
          <th>意味・解説</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {vocabList.map((vocab) => (
          <VocabListTableRow key={vocab.id} vocab={vocab} />
        ))}
      </tbody>
    </table>
  );
}
