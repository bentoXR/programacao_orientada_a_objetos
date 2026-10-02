public class Cavalo2 {
   String nome;
   float peso;
   int idade;

   public Cavalo(String nome, float peso, int idade) {   //versão 1
       this.nome = nome;
       this.peso = peso;
       this.idade = idade;
   }

   public Cavalo(String nome, int idade) {   //versão 2
       this.nome = nome;
       this.idade = idade;
   }

   public Cavalo(String nome) {   //versão 3
       this.nome = nome;
  }
}//class
