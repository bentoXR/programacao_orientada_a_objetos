import java.util.Scanner;

public class IMCEstruturado {
    static double calcular(double peso, double altura){
        double resultado = peso/altura*altura;
        return resultado;
    }

    static void obterDados(){
        Scanner sc = new Scanner(System.in);
        System.out.println("digite seu peso");
        double pesoEntrada = sc.nextDouble();
        System.out.println("digite sua altura");
        double alturaEntrada = sc.nextDouble();

        System.out.printf("IMC: %f\n",calcular(pesoEntrada,alturaEntrada));
    }

    public static void main(String[] args) {
        obterDados();
    }
}
