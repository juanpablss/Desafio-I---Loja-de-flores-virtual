// ==========================================================
// Flora Encanto — Simulador de compras
// Este arquivo contém toda a lógica: prompts, conversões,
// cálculos, validações e alerts.
// ==========================================================

// Lista de produtos. Os preços aqui devem ser IGUAIS aos do index.html.
// "nomePlural" é usado apenas na pergunta do prompt.
const produtos = [
  { nome: "Buquê de Rosas",     nomePlural: "Buquês de Rosas",     preco: 59.90 },
  { nome: "Buquê de Girassóis", nomePlural: "Buquês de Girassóis", preco: 49.90 },
  { nome: "Buquê de Tulipas",   nomePlural: "Buquês de Tulipas",   preco: 69.90 }
];

// Transforma um número em texto de dinheiro. Exemplo: 119.8 -> "R$ 119,80"
function formatarReais(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Pergunta a quantidade de um produto usando prompt().
// - Retorna um número válido (0 ou mais, inteiro);
// - Retorna null se o usuário cancelar.
// Se a entrada for inválida, explica o problema e pergunta de novo.
function pedirQuantidade(produto) {
  while (true) {
    const resposta = prompt("Quantos " + produto.nomePlural + " deseja comprar?\n(Digite 0 se não quiser este produto)");

    // Etapa de cancelamento: prompt() devolve null quando o usuário clica em "Cancelar"
    if (resposta === null) {
      return null;
    }

    // Etapa 2 — Converter o texto digitado em número
    const quantidade = Number(resposta);

    // Validações
    if (resposta.trim() === "" || isNaN(quantidade)) {
      alert("Entrada inválida: digite apenas números. Exemplo: 2");
    } else if (quantidade < 0) {
      alert("Quantidade inválida: não é possível comprar uma quantidade negativa.");
    } else if (!Number.isInteger(quantidade)) {
      alert("Quantidade inválida: digite um número inteiro, sem casas decimais.");
    } else {
      return quantidade; // entrada válida
    }
  }
}

// Função chamada pelo botão "Simular compra" (onclick no index.html)
function simularCompra() {
  let total = 0;
  let resumo = "RESUMO DA COMPRA\n";
  let algumProdutoSelecionado = false;

  // Etapas 1, 3 e 4: percorre cada produto, pergunta a quantidade,
  // calcula o subtotal e soma no total
  for (const produto of produtos) {
    const quantidade = pedirQuantidade(produto);

    // Usuário cancelou: encerra sem fazer nenhum cálculo
    if (quantidade === null) {
      alert("Simulação cancelada. Nenhum cálculo foi realizado.");
      return;
    }

    // Etapa 3 — Valor do produto = preço unitário × quantidade
    const subtotal = produto.preco * quantidade;
    total = total + subtotal; // Etapa 4 — soma para o total

    if (quantidade > 0) {
      algumProdutoSelecionado = true;
    }

    // Monta o texto do resumo
    resumo += "\n" + produto.nome + ":\n";
    resumo += "Quantidade: " + quantidade + "\n";
    resumo += "Subtotal: " + formatarReais(subtotal) + "\n";
  }

  // Regra: todas as quantidades iguais a zero
  if (!algumProdutoSelecionado) {
    alert("Nenhum produto foi selecionado. Escolha pelo menos uma unidade para simular a compra.");
    return;
  }

  // Etapa 5 — Exibir o resultado
  resumo += "\nTOTAL: " + formatarReais(total);
  alert(resumo);
}