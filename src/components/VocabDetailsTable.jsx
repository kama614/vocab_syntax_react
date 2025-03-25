import { Link } from "react-router-dom";

/*
単語の詳細
プロップス: 単語、編集モード更新関数
*/

export default function VocabDetailsTable({
  vocab: { word, meaning, vocabType, registeredAt, updatedAt },
  setIsEditMode
}) {
  return (
    <div>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th className="bg-dark text-white">単語・構文</th>
            <td>{word}</td>
          </tr>
          <tr>
            <th className="bg-dark text-white">意味・解説</th>
            <td>{meaning}</td>
          </tr>
          <tr>
            <th className="bg-dark text-white">種類</th>
            <td>{vocabType.name}</td>
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
        <Link to="/" className="btn btn-secondary me-2">
          一覧に戻る
        </Link>
        <button className="btn btn-warning" onClick={() => setIsEditMode(true)}>
          編集
        </button>
      </div>
    </div>
  );
}
