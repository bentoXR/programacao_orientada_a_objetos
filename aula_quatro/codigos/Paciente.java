import java.util.ArrayList;
import java.util.List;

public class Paciente {
    private String nome;
    private int anoNascimento;

    private List<Consulta> consultas;

    public Paciente(String nome, int anoNascimento) {
        this.nome = nome;
        this.anoNascimento = anoNascimento;
        consultas = new ArrayList<>();
    }//construtor

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

    public List<Consulta> getConsultas() {
        return consultas;
    }

    public void setConsultas(List<Consulta> consultas) {
        this.consultas = consultas;
    }

    public void adicionar(Consulta c){
        consultas.add(c);
    }//

    public void remover(Consulta c){
        consultas.remove(c);
    }//

    @Override
    public String toString() {
        return "Paciente{" +
                "nome='" + nome + '\'' +
                ", anoNascimento=" + anoNascimento +
                '}';
    }
}//class
