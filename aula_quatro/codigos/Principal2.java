public class Principal {
    public static void main(String[] args) {
      Time t1 = new Time("A");
      t1.adicionarJogador("Rodrigo",1990);
      t1.adicionarJogador("Ana",1992);

      System.out.println(t1);

      Time t2 = new Time("B");
      t2.adicionarJogador("Paulo",1991);
      t2.adicionarJogador("Andréia",1994);


      System.out.println(t2);
    }//main
}//class
