import { api } from "./index";
import {
  MostPickedChampionStatResponse,
  HighestWinRateChampionsByPositionData,
} from "@/types/statics";

// 가장 많이 픽된 챔피언 통계 조회
export const getMostPickedChampionStats = () =>
  api.get<MostPickedChampionStatResponse>("/statics/most-picked");

// 나머지 통계 조회
export const getOtherStats = () =>
  api.get<HighestWinRateChampionsByPositionData>("/statics/other");
