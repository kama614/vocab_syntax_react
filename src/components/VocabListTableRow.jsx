import { Link } from "react-router-dom";

/*
単語リストテーブルの１行分を表すコンポーネント
プロップス：単語
*/

export default function VocabListTableRow({ vocab: { id, word, meaning } }) {
  return (
    <tr className="align-middle">
      <td>{word}</td>
      <td>{meaning}</td>
      <td>
        <Link className="btn btn-success" to={`/details/${id}`}>
          詳細
        </Link>
      </td>
    </tr>
  );
}
