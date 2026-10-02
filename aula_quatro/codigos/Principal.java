public class Principal {
    public static void main(String[] args) {
      Jogador j1 = new Jogador("Rodrigo",1990);
      Jogador j2 = new Jogador("Paula",1991);
      Time t1 = new Time("A");
      t1.adicionarJogador(j1,0);
      t1.adicionarJogador(j2,1);
      System.out.println(t1);

      Jogador j3 = new Jogador("Ana",1992);
      Time t2 = new Time("B");
      t2.adicionarJogador(j3,0);
      System.out.println(t2);
    }//main
}//class
