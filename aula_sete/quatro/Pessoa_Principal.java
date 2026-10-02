public class Pessoa {

   private String nome;

   private int idade;


   public Pessoa(String nome, int idade) {

       this.nome = nome;

       this.idade = idade;

   }


   //métodos getters e setters


   @Override

   public String toString() {

       return "Pessoa{" +

               "nome='" + nome + '\'' +

               ", idade=" + idade +

               '}';

   }

}


import java.util.ArrayList;

import java.util.Collections;

import java.util.List;


public class Principal {

   public static void main(String[] args) {

       List<Pessoa> dados = new ArrayList();

       dados.add(new Pessoa("Ana",20));

       dados.add(new Pessoa("Paulo",30));

       dados.add(new Pessoa("Rodrigo",25));

       System.out.println(dados);

       Collections.sort(dados);

       System.out.println(dados);

   }

}
