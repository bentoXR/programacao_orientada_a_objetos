import java.io.*;


public class LeituraBinario {

   public static void ler(String caminho){

       File file = new File(caminho);

       try {

           FileInputStream fis = new FileInputStream(file);

           DataInputStream dis = new DataInputStream(fis);

           String nome = dis.readUTF();

           int i =dis.readInt();

           double p = dis.readDouble();

           dis.close();

           fis.close();

           System.out.println(nome+" "+i+" "+p);

       } catch (FileNotFoundException e) {

           e.printStackTrace();

       } catch (IOException e) {

           e.printStackTrace();

       }

   }


}
