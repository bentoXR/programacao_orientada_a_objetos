import java.io.File;

import java.io.FileWriter;

import java.io.IOException;

import java.io.PrintWriter;


public class EscritaTexto {

   public static void escrever(String caminho,String conteudo){

       File file = new File(caminho);

       try {

           FileWriter fileWriter = new FileWriter(file);

           PrintWriter pw = new PrintWriter(fileWriter);

           pw.println(conteudo);

           pw.close();

       } catch (IOException e) {

           e.printStackTrace();

       }


   }//

}//class
