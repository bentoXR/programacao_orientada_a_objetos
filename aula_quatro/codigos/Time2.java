import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Time {
    private String nome;
    private List<Jogador> jog;

    public Time(String nome){
        this.nome = nome;
        jog = new ArrayList<>();
    }//construtor

    public void adicionarJogador(String nome, int ano){
        Jogador j = new Jogador(nome, ano);
        jog.add(j);

    }//

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Jogador> getJog() {
        return jog;
    }

    public void setJog(List<Jogador> jog) {
        this.jog = jog;
    }

    @Override
    public String toString() {
        return "Time{" +
                "nome='" + nome + '\'' +
                ", jog=" + jog +
                '}';
    }
}//class
