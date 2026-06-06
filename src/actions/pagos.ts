"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function crearPreferenciaPago(
  titulo: string,
  monto: number
): Promise<{ url: string } | { error: string }> {
  try {
    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: [{ id: "donacion", title: titulo, quantity: 1, unit_price: monto, currency_id: "ARS" }],
      },
    });
    const url = response.sandbox_init_point ?? response.init_point;
    if (!url) return { error: "No se pudo generar el link de pago." };
    return { url };
  } catch {
    return { error: "Error al conectar con Mercado Pago." };
  }
}
