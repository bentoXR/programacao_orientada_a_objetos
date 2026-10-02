public class Contador extends Pessoa{
    private double adicional;

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
