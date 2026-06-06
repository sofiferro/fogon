import { DonarExito } from "@/components/donacion/DonarExito";
import type { ExitoData } from "@/components/donacion/DonarExito";

// TODO: reemplazar con datos reales desde la sesión o query params
const MOCK: ExitoData = {
  tipo: "dinero",
  donante: "Josefina",
  campania: "Medicamentos para tratamientos de VIH",
  ong: "Fundación Huésped",
  ongId: "fundacion-huesped",
  monto: 2500,
  modalidad: "unica",
  fecha: "6 jun 2026, 14:32",
  impactoDesc:
    "Tu aporte cubre el 56% de un tratamiento mensual. Con $4.500 se completa un mes de medicación antirretroviral para una persona.",
};

// Para probar especie o voluntariado, reemplazar MOCK por:
//
// const MOCK: ExitoData = {
//   tipo: "especie",
//   donante: "Josefina",
//   campania: "Juguetes para niños hospitalizados",
//   ong: "Pequeños Pasos",
//   ongId: "pequenos-pasos",
//   items: ["Juegos de mesa", "Libros de cuentos"],
//   contacto: "josefina@mail.com",
//   fecha: "6 jun 2026, 14:32",
// };

export default function DonarExitoPage() {
  return <DonarExito data={MOCK} />;
}
