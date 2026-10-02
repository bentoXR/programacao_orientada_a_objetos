import java.util.ArrayList;
import java.util.List;

public class Medico {
    private String nome;
    private List<Consulta> consultas;

    public Medico(String nome) {
        this.nome = nome;
        consultas = new ArrayList<>();
    }//construtor

    public void adicionar(Consulta c){
        consultas.add(c);
    }//

    public void remover(Consulta c){
        consultas.remove(c);
    }//

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Consulta> getConsultas() {
        return consultas;
    }

    public void setConsultas(List<Consulta> consultas) {
        this.consultas = consultas;
    }

    @Override
    public String toString() {
        return "Medico{" +
                "nome='" + nome + '\'' +
                '}';
    }
}//class
