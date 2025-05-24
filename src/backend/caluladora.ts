import { evaluate } from "mathjs";

export function calcularModificador(valor: number, formula: string): number {
  try {
    // Substitui "x" pelo valor informado
    const expression = formula.replace(/x/g, valor.toString());

    // Usa mathjs para avaliar a expressão
    const resultado = evaluate(expression);
    return Math.floor(resultado); // arredonda para baixo
  } catch (error) {
    console.error("Erro na fórmula do modificador:", error);
    return 0;
  }
}