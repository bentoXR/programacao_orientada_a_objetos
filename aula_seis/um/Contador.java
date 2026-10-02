public class Contador extends Pessoa{
    private double adicional;

    public Contador(String nome, int anoNascimento, double valorHora, double qtdHora, double adicional) {
        super(nome, anoNascimento, valorHora, qtdHora);
        this.adicional = adicional;
    }

    public double getAdicional() {
        return adicional;
    }

    public void setAdicional(double adicional) {
        this.adicional = adicional;
    }

    public double calcularSalarioMensal(){
        return super.calcularSalarioMensal()+adicional;
    }
}
