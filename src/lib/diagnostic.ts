import { clusters, Cluster } from "@/data/clusters";
import { DiagnosticAnswers, questions } from "@/data/questions";

export function calculateClusterMatch(answers: DiagnosticAnswers): {
  cluster: Cluster;
  score: number;
  breakdown: Record<string, number>;
} {
  const breakdown: Record<string, number> = {};

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer) {
      const selectedAnswer = question.answers.find((a) => a.value === answer);
      if (selectedAnswer) {
        breakdown[question.id] = selectedAnswer.weight;
      }
    }
  }

  const avgScore = Object.values(breakdown).length
    ? Object.values(breakdown).reduce((a, b) => a + b, 0) /
      Object.values(breakdown).length
    : 0;

  const clusterScores = clusters.map((cluster) => {
    const clusterAvg = Object.values(cluster.scores).reduce((a, b) => a + b, 0) /
      Object.values(cluster.scores).length;

    const distance = Math.abs(avgScore - clusterAvg);
    return { cluster, distance, clusterAvg };
  });

  clusterScores.sort((a, b) => a.distance - b.distance);
  const best = clusterScores[0];

  return {
    cluster: best.cluster,
    score: Math.round((avgScore / 9) * 100),
    breakdown,
  };
}

export function getClusterById(id: number): Cluster | undefined {
  return clusters.find((c) => c.id === id);
}

export function getAllClusters(): Cluster[] {
  return clusters;
}
