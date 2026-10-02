public class Principal {
    public static void main(String[] args) {
        Cachorro c = new Cachorro();
        c.idade = 10;
        c.peso = 20;
        c.raca = "poodle";
        c.nome = "totó";
        System.out.println(c);
        c.latir();
        c.comer("Ração X");
    }
}
