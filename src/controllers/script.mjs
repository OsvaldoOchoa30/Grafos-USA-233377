import Graph from "../models/Graph.mjs";

const graph = new Graph();

let buttomAddCity = document.getElementById("agregarCiudad");
let buttomAddConexion = document.getElementById("conectarCiudades");
let buttomAnchura = document.getElementById("Anchura");
let buttomProfundidad = document.getElementById("Profundidad");

let divAnchura = document.getElementById("verAnchura");
let divProfundidad = document.getElementById("verProfundidad");

let buttomSearch = document.getElementById("buscar");
let divSearch = document.getElementById("rutaCorta");

buttomAddCity.addEventListener("click", () => {
    let myCity = document.getElementById("ciudad").value;
    
    if (graph.addNode(myCity)) {
        Swal.fire(myCity, "Se registró con éxito.");
    } else {
        Swal.fire({
            icon: "error",
            text: myCity + "no se registro",
        });
    }
});

buttomAddConexion.addEventListener("click", () => {
    let origen = document.getElementById("origen").value;
    let destino = document.getElementById("destino").value;
    let peso = parseInt(document.getElementById("peso").value);

    if (graph.addEdge(origen, destino, peso)) {
        Swal.fire({
            icon: "success",
            text: "Se registro la ruta",
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Error al crear la ruta."
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    buttomAnchura.addEventListener("click", () => {
        divAnchura.innerHTML = '';
        
        const vertices = [...graph.getVertices()][0];
        graph.bfs(vertices, (vertex) => {
            divAnchura.innerHTML += `${vertex} `;
            console.log(vertex);
        });
    });

    buttomProfundidad.addEventListener("click", () => {
        divProfundidad.innerHTML = '';
        const vertices = [...graph.getVertices()][0];
        graph.dfs(vertices, (vertex) => {
            divProfundidad.innerHTML += `${vertex} `;
            console.log(vertex);
        });
    });
});

buttomSearch.addEventListener("click", () => {
    let origen = document.getElementById("rutaCortaOrigen").value.trim();
    let destino = document.getElementById("rutaCortaDestino").value.trim();
    
    const distance = graph.dijkstra(origen, destino);

    if (distance === 1000000  ) {
        Swal.fire({
            icon: "error",
            text: "No se reconocio alguna ruta",
        });
    } else {
        divSearch.innerHTML = "La ruta más corta entre " + origen + " y " + destino + " es: " + distance + " km";


    }
    
});
