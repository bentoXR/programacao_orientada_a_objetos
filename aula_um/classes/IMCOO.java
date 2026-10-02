public class IMCOO {
    public static void main(String[] args) {
        Pessoa p = new Pessoa();
        p.obterDados();
        System.out.println(p.peso);
        System.out.println(p.altura);
        System.out.printf("IMC: %.2f\n",p.calcular());

        Pessoa p2 = new Pessoa();
        p2.obterDados();
        System.out.println(p2.peso);
        System.out.println(p2.altura);
        System.out.printf("IMC: %.2f\n",p2.calcular());
    }
}
