export type NivelRiscoType = "BAIXO" | "ALTO";

export interface GraficoItem {
    nivelRisco: NivelRiscoType;
    quantidade: number;
}
export interface Topfatores {
    fator: string;
    total: number;
}
export interface Estatistica {
    total: number;
    taxaChurn: number;
}
export interface ChartData {
  fator: string;
  total: number;
}
export interface DistribuicaoRisco {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number;
}