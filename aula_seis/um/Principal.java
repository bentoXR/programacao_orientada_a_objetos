public class Principal {
    public static void main(String[] args) {
        Contador c = new Contador("A",1990,40,50,50);
        System.out.println(c);
        System.out.printf("Idade: %d\n",c.obterIdade(2023));
        System.out.printf("salário: %.2f\n",c.calcularSalarioMensal());

        Gerente g = new Gerente("B",1980,40,30);
        System.out.println(g);
        System.out.printf("Idade: %d\n",g.obterIdade(2023));
        System.out.printf("salário: %.2f\n",g.calcularSalarioMensal());
    }
}
