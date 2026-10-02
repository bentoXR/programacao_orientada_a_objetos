public class Pessoa {
    protected String nome;
    protected int anoNascimento;
    protected double valorHora,qtdHora;

    public int obterIdade(int anoAtual){
        return anoAtual-anoNascimento;
    }

    public double calcularSalarioMensal(){
        return valorHora*qtdHora*4;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getAnoNascimento() {
        return anoNascimento;
    }

    public void setAnoNascimento(int anoNascimento) {
        this.anoNascimento = anoNascimento;
    }

    public double getValorHora() {
        return valorHora;
    }

    public void setValorHora(double valorHora) {
        this.valorHora = valorHora;
    }

    public double getQtdHora() {
        return qtdHora;
    }

    public void setQtdHora(double qtdHora) {
        this.qtdHora = qtdHora;
    }

    @Override
    public String toString() {
        return "Pessoa{" +
                "nome='" + nome + '\'' +
                ", anoNascimento=" + anoNascimento +
                ", valorHora=" + valorHora +
                ", qtdHora=" + qtdHora +
                '}';
    }
}
