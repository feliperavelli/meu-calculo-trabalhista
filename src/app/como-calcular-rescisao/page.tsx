export default function ComoCalcularRescisaoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
     <h1 className="mb-8 text-4xl font-bold">
  Como calcular rescisão trabalhista
</h1>

<p className="mb-6">
  O cálculo da rescisão trabalhista varia conforme o tipo de desligamento,
  tempo de empresa, salário e direitos previstos pela CLT. Entender cada
  verba rescisória ajuda o trabalhador a conferir os valores pagos pela
  empresa e identificar possíveis diferenças.
</p>

<h2 className="mb-4 mt-10 text-2xl font-semibold">
  Quais verbas entram na rescisão?
</h2>

<ul className="list-disc pl-6 space-y-2">
  <li>Saldo de salário</li>
  <li>Férias vencidas</li>
  <li>Férias proporcionais + 1/3 constitucional</li>
  <li>13º salário proporcional</li>
  <li>FGTS</li>
  <li>Multa de 40% do FGTS</li>
  <li>Aviso prévio trabalhado ou indenizado</li>
</ul>

<h2 className="mb-4 mt-10 text-2xl font-semibold">
  Saldo de salário
</h2>

<p>
  Corresponde aos dias trabalhados no mês da demissão. O cálculo é feito
  dividindo o salário mensal por 30 e multiplicando pelos dias efetivamente
  trabalhados.
</p>

<h2 className="mb-4 mt-10 text-2xl font-semibold">
  Férias proporcionais e férias vencidas
</h2>

<p>
  As férias proporcionais são calculadas de acordo com os meses trabalhados
  desde o último período aquisitivo. Sobre esse valor também é pago o
  adicional constitucional de 1/3. Caso existam férias vencidas, elas devem
  ser pagas integralmente.
</p>

<h2 className="mb-4 mt-10 text-2xl font-semibold">
  13º salário proporcional
</h2>

<p>
  O décimo terceiro proporcional considera os meses trabalhados durante o ano
  da rescisão. Em geral, meses com pelo menos 15 dias trabalhados contam como
  um avo para o cálculo.
</p>

<h2 className="mb-4 mt-10 text-2xl font-semibold">
  Demissão sem justa causa
</h2>

<p>
  Na demissão sem justa causa o trabalhador normalmente tem direito ao saque
  integral do FGTS, multa de 40% sobre o saldo do FGTS, férias, 13º
  proporcional e aviso prévio.
</p>

<h2 className="mb-4 mt-10 text-2xl font-semibold">
  Pedido de demissão
</h2>

<p>
  No pedido de demissão não há multa de 40% do FGTS e normalmente não existe
  direito ao saque do saldo do fundo.
</p>

<h2 className="mb-4 mt-10 text-2xl font-semibold">
  Simule gratuitamente sua rescisão
</h2>

<p>
  Utilize a calculadora do Meu Cálculo Trabalhista para estimar valores de
  rescisão, férias, FGTS, multa rescisória e aviso prévio de forma rápida e
  gratuita.
</p>
    </main>
  );
}
