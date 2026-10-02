import java.util.ArrayList;

import java.util.Collections;

import java.util.List;


public class Principal {

   public static void main(String[] args) {

       List<Integer> dados = new ArrayList();

       dados.add(40);

       dados.add(25);

       dados.add(30);

       System.out.println(dados);

       Collections.sort(dados);

       System.out.println(dados);

   }

}

