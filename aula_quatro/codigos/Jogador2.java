public class Jogador {
    private String nome;
    private int ano;

    public Jogador(String nome, int ano) {
        this.nome = nome;
        this.ano = ano;
    }//construtor

    //getters e setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    @Override
    public String toString() {
        return "Jogador{" +
                "nome='" + nome + '\'' +
                ", ano=" + ano +
                '}';
    }
}//class
