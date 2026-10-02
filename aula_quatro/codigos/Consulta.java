public class Consulta {
    private int dia, hora;
    private double valor;
    private Medico m;
    private Paciente p;

    public Consulta(int dia, int hora, double valor, Medico m, Paciente p) {
        this.dia = dia;
        this.hora = hora;
        this.valor = valor;
        this.m = m;
        this.p = p;
    }

    public int getDia() {
        return dia;
    }

    public void setDia(int dia) {
        this.dia = dia;
    }

    public int getHora() {
        return hora;
    }

    public void setHora(int hora) {
        this.hora = hora;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Medico getM() {
        return m;
    }

    public void setM(Medico m) {
        this.m = m;
    }

    public Paciente getP() {
        return p;
    }

    public void setP(Paciente p) {
        this.p = p;
    }

    @Override
    public String toString() {
        return "Consulta{" +
                "dia=" + dia +
                ", hora=" + hora +
                ", valor=" + valor +
                ", m=" + m +
                ", p=" + p +
                '}';
    }
}//class
