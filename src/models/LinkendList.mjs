import Node from "./Node.mjs";
//Clase LinkedList
export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null; //apunta al primer nodo de la lista
        this.#count = 0; //conteo de nodos
    }

    //Metodo Push: Agrega nodos al final de la lista enlazada
    push(node, weight = 1) { 
        const newNode = new Node({ node, weight }); //Se crea una nueva instancia de Node con un objeto que contiene node y weight.
        if (!this.#head) { //Si la lista esta vacia...
            this.#head = newNode; //Se crea un nodo y se deja como la cabeza.
        } else { //Si la lista no esta vacia...
            let current = this.#head; 
            while (current.next) { //Se recorre la lista desde la cabeza hasta el ultimo nodo
                current = current.next;
            }
            current.next = newNode; //Una vez encontrado el último nodo, se asigna el nuevo nodo como el siguiente nodo del último nodo de la lista
        }
        this.#count++; //contador de nodos
    }

    isEmpty() {
        return this.#head == null;
    }
    size(){
        return this.#count
    }


    indexAt(index){ //Metodo para devolver el nodo que se encuentra en una posicin en especifica.
        if(index >= 0 && index  < this.#count){
            let node = this.#head
            for (let i = 0;i< index && node !=null;i++){
                node = node.next
                return node
            }
            
        }
        return null
    }


    get head() {
        return this.#head;
    }
}