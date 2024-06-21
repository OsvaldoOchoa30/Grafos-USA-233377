import LinkedList from "./LinkendList.mjs";

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addNode(node) { 
        if (!this.#map.has(node)) { //Si el nodo ingresado no existe...
            this.#matrizAdyacencia.push(new LinkedList()); //se agrega una linkedList a la matriz de adyacencia 
            this.#map.set(node, this.#matrizAdyacencia.length - 1); //sirve para guardar el lemento el su respectiva posicion.
            return true;
        }
        return false; //si ya exite el nodo manda un return
    }


    addEdge(city1, city2, weight = 1) { //Si ambos nodos existe dentro del mapa, 
        if (this.#map.has(city1) && this.#map.has(city2)) { //Se busca atravez del indice de la matriz de adyacencia, si existen se agrega la arista city1.
            this.#matrizAdyacencia[this.#map.get(city1)].push(city2, weight); //se agrega la city2 y el peso en la lista enlazada de city1
            //con .push agrega la conexcion de city1 con city2
            return true;
        }
        return false;
    }

    getVertices() { //Obtiene los nodos
        return this.#map.keys();
    }
    
    
    numVertices() { //Obtiene el numero de nodos 
    return this.#map.size;
    }

    dfs(nodePrincipal, callback) { //Metodo por busqueda de profunidad
    if (!this.#map.has(nodePrincipal)) { //Si el nodo principal esta vacio, se cancela el metodo.
        return;
    }

    let stack = [];
    let visita = {};
    
    stack.push(nodePrincipal); //Se agrega el nodo principal a la Pila.

    while (stack.length > 0) {
        const nodoActual = stack.pop();
        if (!visita[nodoActual]) { //Si el nodo actual no ha sido visitado...
            callback(nodoActual); //Se ejecuta el callbacl
            visita[nodoActual] = true; //Se marca como visitado
            const vecinoLinked = this.#matrizAdyacencia[this.#map.get(nodoActual)];
            let actual = vecinoLinked.head;
            while (actual) {
                const neighborVertex = actual.value.node;
                if (!visita[neighborVertex]) {
                    stack.push(neighborVertex);
                }
                actual = actual.next;
            }
        }
    }
}


    bfs(nodePrincipal, callback) {  //Metodo de Busqueda por Anchura
    if (!this.#map.has(nodePrincipal)) {
        return;
    }

    let visita = {};
    let queue = [];
    queue.push(nodePrincipal);

    while (queue.length > 0) {
        const actualVertex = queue.shift();
        if (!visita[actualVertex]) {
            callback(actualVertex);
            visita[actualVertex] = true;
            const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(actualVertex)];
            let actual = neighborsLinkedList.head;
            while (actual !== null) {
                const neighborVertex = actual.value.node;
                if (!visita[neighborVertex]) {
                    queue.push(neighborVertex);
                }
                actual = actual.next;
            }
        }
    }
}

    dijkstra(initialNode, finalNode) {

        let nodeI = this.#map.get(initialNode);
        let nodeF = this.#map.get(finalNode);

        let infinity = Number.MAX_SAFE_INTEGER;
        let distances = new Array(this.numVertices()).fill(infinity);
        let visitas = new Array(this.numVertices()).fill(false);


        distances[nodeI] = 0;
    
        while (true) {
            let u = -1;
            let minDistance = infinity;
    
        
            for (let i = 0; i < this.numVertices(); i++) {
                if (!visitas[i] && distances[i] < minDistance) {
                    minDistance = distances[i];
                    u = i;
                }
            } 
            if (u === -1) {
                break;
            }
    
            visitas[u] = true;
    
        
            let vecinos = this.#matrizAdyacencia[u];
            let actual = vecinos.head;
    
            while (actual) {
                const vecinoIndex = this.#map.get(actual.value.node);
                const weight = actual.value.weight;
    
                if (distances[u] + weight < distances[vecinoIndex]) {
                    distances[vecinoIndex] = distances[u] + weight;
                }
                actual = actual.next;
            }
        }
    
        return distances[nodeF];
    }

}
