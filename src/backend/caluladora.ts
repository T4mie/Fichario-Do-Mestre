import { evaluate} from "mathjs";

export function calcularModificador(valor: number, formula: string): number {
  try {
    // Substitui "x" pelo valor informado
    const expression = formula.replace(/x/g, valor.toString());

    // Usa mathjs para avaliar a expressão
    const resultado = evaluate(expression);
    return resultado; // arredonda para baixo
  } catch (error) {
    console.error("Erro na fórmula do modificador:", error);
    return 0;
  }
}

export function calcularBonusTotal(modAtributo: number, valorBonus: number): number {
  return (modAtributo || 0) + (valorBonus || 0);
}