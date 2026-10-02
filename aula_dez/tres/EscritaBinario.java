import java.io.*;


public class EscritaBinario {

   public static void escrever(String caminho, String n, int i , double p){

       File file = new File(caminho);

       try {

           FileOutputStream fileOutputStream = new FileOutputStream(file);

           DataOutputStream dataOutputStream = new DataOutputStream(fileOutputStream);

           dataOutputStream.writeUTF(n);

           dataOutputStream.writeInt(i);

           dataOutputStream.writeDouble(p);

           dataOutputStream.close();

           fileOutputStream.close();

       } catch (FileNotFoundException e) {

           e.printStackTrace();

       } catch (IOException e) {

           e.printStackTrace();

       }

   }

}
