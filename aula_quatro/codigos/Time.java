import java.util.Arrays;

public class Time {
    private String nome;
    private Jogador[] j;

    public Time(String nome){
        this.nome = nome;
        j = new Jogador[3];
    }//construtor

    public void adicionarJogador(Jogador jog, int i){
        this.j[i] = jog;

    }//

    public void removerJogador(int i){
        j[i] = null;
    }//

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Jogador[] getJ() {
        return j;
    }

    public void setJ(Jogador[] j) {
        this.j = j;
    }

    @Override
    public String toString() {
        return "Time{" +
                "nome='" + nome + '\'' +
                ", j=" + Arrays.toString(j) +
                '}';
    }
}//class
