public class Principal {
    public static void main(String[] args) {
        Cachorro c = new Cachorro();
        c.idade = 10;
        c.peso = 20;
        c.raca = "poodle";
        c.nome = "totó";
        c.latir();
        c.comer("Ração X");
        System.out.println(c);
        System.out.println(c.nome);

        c.idade = 5;
        c.peso = 5;
        c.raca = "shih-tzu";
        c.nome = "mimi";
        c.latir();
        c.comer("Ração Y");
        System.out.println(c);
        System.out.println(c.nome);

        Cachorro c1 = new Cachorro();
        c1.idade = 7;
        c1.peso = 7;
        c1.raca = "pequinês";
        c1.nome = "nina";
        c1.latir();
        c1.comer("Ração Z");
        System.out.println(c1);
        System.out.println(c1.nome);
    }
}
