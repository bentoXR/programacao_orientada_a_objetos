public class Pessoa {
    double peso, altura;

    double calcular(){
        return peso/(altura*altura);
    }

    void obterDados(){
        Scanner sc = new Scanner(System.in);
        System.out.println("digite o peso");
        peso = sc.nextDouble();
        System.out.println("digite a altura");
        altura = sc.nextDouble();
    }
}
