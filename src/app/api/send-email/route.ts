import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, salario, tipoRescisao, valorTotal } =
      await request.json();

    const { data, error } = await resend.emails.send({
      from: "Meu Cálculo Trabalhista <contato@meucalculo.app>",
      to: [email],
      subject: "Resultado da sua simulação de rescisão",
      html: `
        <h2>Resultado da sua simulação</h2>

        <p><strong>Salário:</strong> R$ ${salario}</p>
        <p><strong>Tipo de Rescisão:</strong> ${tipoRescisao}</p>
        <p><strong>Valor Estimado:</strong> R$ ${valorTotal}</p>

        <hr>

        <p>
          Obrigado por utilizar o Meu Cálculo Trabalhista.
        </p>
      `,
    });

    if (error) {
      return Response.json(error, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
