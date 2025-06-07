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

export function calcularProficiencia(valor: number, formula:string): number {
  try {
    // Substitui "x" pelo valor informado
    const expression = formula.replace(/x/g, valor.toString());

    // Usa mathjs para avaliar a expressão
    const resultado = evaluate(expression);
    return resultado; // arredonda para baixo
  } catch (error) {
    console.error("Erro na fórmula de proficiência:", error);
    return 0;
  }
}

// por enquanto irei deixar os dois métodos separados por questão de legibilidade,
// mas depois posso criar um método genérico que recebe a fórmula e o valor