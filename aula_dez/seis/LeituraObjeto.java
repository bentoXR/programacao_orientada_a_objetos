import java.io.*;


public class LeituraObjeto {

   public static void ler(String caminho){

       File file = new File(caminho);

       try {

           FileInputStream fis = new FileInputStream(file);

           ObjectInputStream ois = new ObjectInputStream(fis);

           Pessoa p = (Pessoa)ois.readObject();

           ois.close();

           fis.close();

           System.out.println(p.toString());

       } catch (FileNotFoundException e) {

           e.printStackTrace();

       } catch (IOException e) {

           e.printStackTrace();

       } catch (ClassNotFoundException e) {

           e.printStackTrace();

       }


   }

}
