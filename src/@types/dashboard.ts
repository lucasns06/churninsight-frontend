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