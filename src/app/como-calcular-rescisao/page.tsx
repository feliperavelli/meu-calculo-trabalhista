export default function ComoCalcularRescisaoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Como calcular rescisão trabalhista
      </h1>

      <p className="mb-6">
        O cálculo da rescisão trabalhista depende do tipo de desligamento,
        tempo de serviço, saldo de salário, férias, 13º salário, FGTS e aviso
        prévio.
      </p>

      <h2 className="mb-4 mt-10 text-2xl font-semibold">
        O que entra no cálculo da rescisão?
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Saldo de salário</li>
        <li>Férias vencidas</li>
        <li>Férias proporcionais + 1/3 constitucional</li>
        <li>13º salário proporcional</li>
        <li>FGTS</li>
        <li>Multa de 40% do FGTS</li>
        <li>Aviso prévio</li>
      </ul>

      <h2 className="mb-4 mt-10 text-2xl font-semibold">
        Demissão sem justa causa
      </h2>

      <p>
        Na demissão sem justa causa o trabalhador normalmente possui direito ao
        saque do FGTS, multa de 40% sobre o saldo do FGTS, férias, 13º
        proporcional e aviso prévio.
      </p>

      <h2 className="mb-4 mt-10 text-2xl font-semibold">
        Pedido de demissão
      </h2>

      <p>
        No pedido de demissão não existe multa de 40% do FGTS e normalmente não
        há direito ao saque do saldo do FGTS.
      </p>

      <h2 className="mb-4 mt-10 text-2xl font-semibold">
        Use nossa calculadora
      </h2>

      <p>
        Utilize a calculadora do Meu Cálculo Trabalhista para obter uma
        estimativa rápida e gratuita das verbas rescisórias.
      </p>
    </main>
  );
}
