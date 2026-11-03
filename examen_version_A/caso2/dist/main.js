"use strict";
// Paso 0: La agroveterinaria necesita un catálogo de miles de productos con búsqueda instantánea por código,
// sin códigos repetidos, ventas que bajen el stock sin pasar de lo disponible, y al cierre la lista de
// proveedores sin repetir y los productos agotados. Uso un Map<código, Producto> (búsqueda directa sin
// recorrer) y un Set para los proveedores. Decisión: "se nos acabaron" = stock igual a 0; si una venta
// supera el stock se rechaza completa y el stock no cambia.
Object.defineProperty(exports, "__esModule", { value: true });
const catalogo = new Map();
function registrar(producto) {
    if (catalogo.has(producto.codigo)) {
        console.log(`Rechazado: el código ${producto.codigo} ya existe`);
    }
    else {
        catalogo.set(producto.codigo, producto);
    }
}
function vender(codigo, cantidad) {
    const producto = catalogo.get(codigo);
    if (!producto) {
        console.log(`El código ${codigo} no existe`);
    }
    else if (cantidad > producto.stock) {
        console.log(`No se puede vender ${cantidad} de ${producto.nombre}, solo hay ${producto.stock}`);
    }
    else {
        producto.stock -= cantidad;
        console.log(`Venta de ${cantidad} ${producto.nombre}, stock: ${producto.stock}`);
    }
}
function buscar(codigo) {
    const producto = catalogo.get(codigo);
    if (!producto) {
        console.log(`El código ${codigo} no existe`);
    }
    else {
        console.log(`${producto.codigo} ${producto.nombre} ${producto.proveedor} stock: ${producto.stock}`);
    }
}
registrar({ codigo: "AG-01", nombre: "Vacuna antiaftosa", proveedor: "Andino Vet", stock: 40 });
registrar({ codigo: "AG-02", nombre: "Antiparasitario", proveedor: "Pecuaria Sur", stock: 12 });
registrar({ codigo: "AG-03", nombre: "Sal mineral (bolsa)", proveedor: "Nutrimax", stock: 25 });
registrar({ codigo: "AG-04", nombre: "Vitamina ADE", proveedor: "Andino Vet", stock: 8 });
registrar({ codigo: "AG-05", nombre: "Alambre de púas (rollo)", proveedor: "Agrofer", stock: 15 });
registrar({ codigo: "AG-06", nombre: "Jeringa automática", proveedor: "Agrofer", stock: 6 });
console.log("Movimientos del día");
registrar({ codigo: "AG-04", nombre: "Vitamina ADE", proveedor: "Andino Vet", stock: 8 });
vender("AG-02", 12);
vender("AG-06", 10);
vender("AG-01", 5);
buscar("AG-03");
buscar("AG-11");
console.log("Proveedores");
const proveedores = new Set();
for (const [codigo, producto] of catalogo) {
    proveedores.add(producto.proveedor);
}
for (const p of proveedores) {
    console.log(p);
}
console.log("Productos agotados (pedido urgente)");
for (const [codigo, producto] of catalogo) {
    if (producto.stock === 0) {
        console.log(`${codigo} ${producto.nombre} (${producto.proveedor})`);
    }
}
