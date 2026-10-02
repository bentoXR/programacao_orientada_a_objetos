public class Principal {
    public static void main(String[] args) {
        Contador c = new Contador();
        c.setNome("A");
        c.setAnoNascimento(1990);
        c.setQtdHora(40);
        c.setValorHora(50);
        ((Contador)c).setAdicional(50);
        System.out.println(c);
        System.out.printf("Idade: %d\n",c.obterIdade(2023));
        System.out.printf("salário: %.2f\n",c.calcularSalarioMensal());

        Gerente g = new Gerente();
        g.setNome("B");
        g.setAnoNascimento(1980);
        g.setQtdHora(40);
        g.setValorHora(30);
        System.out.println(g);
        System.out.printf("Idade: %d\n",g.obterIdade(2023));
        System.out.printf("salário: %.2f\n",g.calcularSalarioMensal());
    }
}
