export interface Dominio {
    id: number;
    value: string;
    label: string;
}
export type Inputs = {
    CreditScore: number;
    Geography: string;
    Gender: string;
    Age: number;
    Tenure: number;
    Balance: number;
    EstimatedSalary: number;
}