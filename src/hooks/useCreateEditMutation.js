import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVocab, updateVocab } from "../api/vocabApi";
import { useNavigate } from "react-router-dom";
/*
編集用ミューテーションの生成フック
引数: 単語ID
*/

export default function useCreateEditMutation(vocabId) {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: (vocab) => updateVocab(vocab),
    onSuccess: async () => {
      QueryClient.invalidateQueries({ queryKey: ["vocab", vocabId] });
      QueryClient.invalidateQueries({ queryKey: ["vocabs", 0] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteVocab(vocabId),
    onSuccess: async () => {
      await QueryClient.invalidateQueries({ queryKey: ["vocabs"] });
      navigate("/", { replace: true });
    }
  });
  return { updateMutation, deleteMutation };
}
