// Paso 0: La imprenta necesita calcular el costo de volantes, tarjetas y banners, el total facturado,
// los trabajos de más de 1000 Bs con su adelanto del 50% y cuánto deja cada tipo de trabajo.
// Uso una clase abstracta Trabajo con calcularCosto() y una subclase por tipo (polimorfismo), así las
// tazas y poleras se agregan como clases nuevas sin tocar lo existente. El constructor lanza error si la
// cantidad es <= 0 y registrar() lo captura para avisar y seguir. Decisión: el banner se cobra por m².

abstract class Trabajo {
    protected numero: string;
    protected cliente: string;
    protected cantidad: number;

    constructor(numero: string, cliente: string, cantidad: number) {
        if (cantidad <= 0) {
            throw new Error(`El trabajo ${numero} tiene cantidad inválida: ${cantidad}`);
        }
        this.numero = numero;
        this.cliente = cliente;
        this.cantidad = cantidad;
    }

    getNumero(): string {
        return this.numero;
    }

    getCliente(): string {
        return this.cliente;
    }

    abstract getTipo(): string;
    abstract calcularCosto(): number;
}

class TrabajoVolante extends Trabajo {
    getTipo(): string {
        return "Volantes";
    }

    calcularCosto(): number {
        return this.cantidad * 0.3;
    }
}

class TrabajoTarjeta extends Trabajo {
    getTipo(): string {
        return "Tarjetas";
    }

    calcularCosto(): number {
        const costo = this.cantidad * 0.5;
        return costo < 100 ? 100 : costo;
    }
}

class TrabajoBanner extends Trabajo {
    getTipo(): string {
        return "Banner";
    }

    calcularCosto(): number {
        return this.cantidad * 85 + 40;
    }
}

const trabajos: Trabajo[] = [];

// Recibe una función que crea el trabajo: así un tipo nuevo no obliga a modificar registrar.
function registrar(crearTrabajo: () => Trabajo): void {
    try {
        trabajos.push(crearTrabajo());
    } catch (error) {
        console.log("Error: " + (error as Error).message);
    }
}

registrar(() => new TrabajoVolante("TRB-01", "Pizzería Don Leo", 2000));
registrar(() => new TrabajoTarjeta("TRB-02", "Estudio Jurídico Paz", 150));
registrar(() => new TrabajoBanner("TRB-03", "Feria Expo Norte", 12));
registrar(() => new TrabajoVolante("TRB-04", "Clínica Dental Sonrisa", 5000));
registrar(() => new TrabajoTarjeta("TRB-05", "Inmobiliaria Horizonte", 800));
registrar(() => new TrabajoBanner("TRB-06", "Gimnasio Fuerza", 0));

console.log("Costo de cada trabajo");
let total = 0;
for (const t of trabajos) {
    console.log(`${t.getNumero()} ${t.getCliente()} (${t.getTipo()}): ${t.calcularCosto()} Bs`);
    total += t.calcularCosto();
}
console.log(`Total facturado: ${total} Bs`);

console.log("Trabajos de más de 1000 Bs (adelanto del 50%)");
for (const t of trabajos) {
    if (t.calcularCosto() > 1000) {
        console.log(`${t.getNumero()} ${t.getCliente()}: ${t.calcularCosto()} Bs, adelanto: ${t.calcularCosto() * 0.5} Bs`);
    }
}

console.log("Ingresos por tipo de trabajo");
const porTipo = new Map<string, number>();
for (const t of trabajos) {
    const actual = porTipo.get(t.getTipo());
    if (actual === undefined) {
        porTipo.set(t.getTipo(), t.calcularCosto());
    } else {
        porTipo.set(t.getTipo(), actual + t.calcularCosto());
    }
}
for (const [tipo, monto] of porTipo) {
    console.log(`${tipo}: ${monto} Bs`);
}
export {};
