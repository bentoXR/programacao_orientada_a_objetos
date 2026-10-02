import java.io.*;


public class EscritaObjeto {

   public static void escrever(String caminho, Pessoa p){

       File file = new File(caminho);

       FileOutputStream fileOutputStream = null;

       try {

           fileOutputStream = new FileOutputStream(caminho);

           ObjectOutputStream objectOutputStream =

                   new ObjectOutputStream(fileOutputStream);

           objectOutputStream.writeObject(p);

           objectOutputStream.close();

           fileOutputStream.close();

       } catch (FileNotFoundException e) {

           e.printStackTrace();

       } catch (IOException e) {

           e.printStackTrace();

       }


   }

}
